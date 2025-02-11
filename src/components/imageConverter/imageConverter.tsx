import { handleUploadPhotoURL, storage } from "@/firebase/storage";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState } from "react";
import Compressor from "compressorjs";

const ImageToBase64 = ({ id, img, fullname, setImg }: { id: string, img: string, fullname: string, setImg: (aug0: string) => void;}) => {
  const [uploadStatus, setUploadStatus] = useState({ status: "preview", percent: 0 })
  const [image, setImage] = useState<File | Blob>()

  useEffect(() => {
    const compressImage = async () => {
      try {
        const compressedBlob: Blob | MediaSource = await new Promise((resolve, reject) => {
          if(image) { new Compressor(image, {
            quality: 0.8, // Adjust the desired image quality (0.0 - 1.0)
            maxWidth: 1000, // Adjust the maximum width of the compressed image
            maxHeight: 1000, // Adjust the maximum height of the compressed image
            mimeType: "image/webp", // Specify the output image format
            success(result) {
              resolve(result);
            },
            error(error) {
              reject(error);
            },
          })
        } 
        });

        setImg(URL.createObjectURL(compressedBlob));
      } catch (error) {
        console.error(error);
      }
    };

    compressImage();
  }, [image]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressImage = async () => {
        try {
          const compressedBlob: Blob = await new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.8, // Adjust the desired image quality (0.0 - 1.0)
              maxWidth: 1000, // Adjust the maximum width of the compressed image
              maxHeight: 1000, // Adjust the maximum height of the compressed image
              mimeType: "image/webp", // Specify the output image format
              success(result) {
                resolve(result);
              },
              error(error) {
                reject(error);
              },
            })
          });
  
          setUploadStatus({status: "preview", percent: 0 })
          setImg(URL.createObjectURL(compressedBlob));
          const newImg = new File([compressedBlob], fullname, {
            type: "image/webp",
            lastModified: new Date().getTime()
          })
          setImage(newImg)
          uploadImg(newImg)
        } catch (error) {
          console.error(error);
        }
      };
  
      compressImage();
    }
  };

  const uploadImg = (file: File | Blob) => {
    handleUploadPhotoURL(fullname)
    .then(result => {
        const uploadTask = uploadBytesResumable(result, file);
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setUploadStatus({status: "uploading", percent: percent});
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
                setUploadStatus({status: "finished", percent: 100});  
                setImg(url)       
                setUploadStatus({status: "uploaded", percent: 100})
            });
        })
    })
  } 

  const deleteImg = () => {
    const desertRef = ref(storage, `photoURL/${fullname}`);
    // Delete the file
    deleteObject(desertRef).then(() => {
        // setImg({ id, name: "", type: "", url: "" })
        setImg("")
        setUploadStatus({ status: "preview", percent: 0 })
    })
    .catch((error) => {
        console.log(error)
    });
  }

  return (
      <>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {
          image ?
          <div>
            { 
              uploadStatus.status === "preview" && img !== "" ?
              <>
                <button className="p-[2px] px-4 text-[10px] rounded border border-gray-500/[0.2]" onClick={(e) => {e.preventDefault(); uploadImg(image)}}>Upload</button>
              </>
              : 
              (uploadStatus.status === "uploaded" || uploadStatus.status === "finished") && img !== "" ?
                <button className="p-[2px] px-4 text-[10px] rounded border border-red-500/[0.6]"onClick={(e) => {e.preventDefault(); deleteImg(); }}>Delete</button>
              :
              uploadStatus.status === "uploading" ?
              <div className="absolute top-0 left-0 bg-black/[0.8] backdrop-blur-sm flex flex-col justify-center items-center bg-white/[0.8] dark:bg-black/[0.7] backdrop-blur-sm p-4 w-full h-full">
                  <p className="mb-2">{uploadStatus?.status} : {uploadStatus?.percent}%</p>
                  <div className="w-full min-h-[10px] rounded-lg bg-slate-200">
                      <p className={`min-h-[10px] rounded-lg bg-green`} style={{ width: `${uploadStatus?.percent}%` }}></p>
                  </div>
              </div>
              :
              ""
            }
          </div>
          :
          ""
        }
      </>
  );
};

export default ImageToBase64;
