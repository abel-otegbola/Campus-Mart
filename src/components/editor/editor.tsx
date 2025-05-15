'use client'
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface content {
    text: string;
    setText: (html: string) => void;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor = ({ text, setText }: content) => {
    const modules = {
        toolbar: [
          [{ 'header': '1'}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image',
      ]
      

    return (
        <ReactQuill
            theme={"snow"}
            value={text}
            modules={modules}
            formats={formats}
            placeholder={"Add descriptions"}
            className="w-full"
            onChange={setText}
        />
    )
}

export default TextEditor;