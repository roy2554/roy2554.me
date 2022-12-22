import 'react-quill/dist/quill.snow.css';

import axios from "axios";
import dynamic from "next/dynamic";
import { useMemo, useRef } from 'react';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill');
  return function comp({ forwardedRef, ...props }) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false });

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function ReactQuillContainer({ description, setDescription }) {
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);
    
    input.click();
  
    input.onchange = async () => {
      const [file] = input.files;
      
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
      }
      const formData = new FormData();
      formData.append('file', file);
      axios
        .post('/api/media', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res);
          if (res.statusText === 'Created') {
            // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
            const range = quillRef.current.getEditorSelection();
            quillRef.current.getEditor().insertEmbed(range.index, 'image', '/api' + res.data.accessUrl)
            quillRef.current.getEditor().setSelection(range.index + 1);
            document.body.querySelector(':scope > input').remove()
          }
        })
    };
  }

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: { image: imageHandler }
    }
  }), []);

  return (
    <>
    <style jsx global>{`
                .ql-toolbar .ql-stroke {
                    fill: none;
                    stroke: #fff;
                }

                .ql-toolbar .ql-fill {
                    fill: #fff;
                    stroke: none;
                }

                .ql-toolbar .ql-picker {
                    color: #fff;
                }

                .ql-toolbar .ql-picker-options {
                    background-color: #fff;
                    color: #000;
                }

                .ql-toolbar.ql-snow {
                    border: none;
                }

                .ql-container.ql-snow {
                    border: none;
                }

                .quill > .ql-container > .ql-editor.ql-blank::before {
                    color: gray;
                }
            `}</style>
    <ReactQuill
      forwardedRef={quillRef}
      placeholder="write something…"
      modules={modules}
      formats={formats}
      value={description}
      onChange={setDescription}
    /></>
  );
}

export default ReactQuillContainer;