import React, { ChangeEvent } from "react";

const ImageToBase64 = ({ id, setImg }: { id: string, setImg: (aug0: string) => void;}) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImg(reader.result); // Save the base64 string
        }
      };

      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
  );
};

export default ImageToBase64;
