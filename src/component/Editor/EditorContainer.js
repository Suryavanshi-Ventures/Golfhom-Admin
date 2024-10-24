import React, {
  useRef,
  useMemo,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
// import { cn } from "@nextui-org/react";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);
const EditorContainer = ({ onChange, value, readOnly = false, editorContainerClassName = "", setIsEditorLoading }) => {
  const editorRef = useRef(null);


  const insertToEditor = useCallback(
    (url) => {
      setIsEditorLoading(false);
      editorRef.current.getEditor().insertEmbed(null, "image", url);
    },
    [setIsEditorLoading]
  );

  const saveToServer = useCallback(
    (file) => {
      setIsEditorLoading(true);
      const fd = new FormData();
      fd.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL}/media-upload/upload-single-file`,
        true
      );
      xhr.onload = () => {
        if (xhr.status === 201) {
          const url = JSON.parse(xhr.responseText).data.file_url;
          insertToEditor(url);
        }
      };
      xhr.send(fd);
    },
    [setIsEditorLoading, insertToEditor]
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          // [{ script: "sub" }, { script: "super" }],
          // ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          // ["link"],
          ["image"],
          ["clean"],
        ],

        handlers: {
          image: async () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = () => {
              const file = input.files[0];
              // file type is only image.
              if (/^image\//.test(file.type)) {
                saveToServer(file);
              } else {
                console.warn("You could only upload images.");
              }
            };
          },
        },
      },
    }),
    [saveToServer]
  );


  return (
    <div className="text-editor h-full">
      <ReactQuill
        modules={modules}
        readOnly={readOnly}
        theme="snow"
        value={value}
        onChange={onChange}
        className={
          editorContainerClassName
        }
        forwardedRef={editorRef}
      />
    </div>
  );
};

export default EditorContainer;
