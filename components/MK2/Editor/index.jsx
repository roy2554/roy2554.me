import 'react-quill/dist/quill.snow.css';

import axios from "axios";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from 'react';

// import ImageResize from 'quill-image-resize-module-react';
import StateNotice from '../StateNotice';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill');
  return function comp({ forwardedRef, ...props }) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false, loading: () => <div>Loading…</div> });

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
  const [errMsg, setErrMsg] = useState(null);

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
          // console.log(res);
          if (res.statusText === 'Created' || res.status === 201) {
            // console.log("image upload data:", res.data);
            // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
            const range = quillRef.current.getEditorSelection();
            quillRef.current.getEditor().insertEmbed(range.index, 'image', '/api' + res.data.accessUrl);
            // quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, `<img className="quilleditorimgtaggg" class="quilleditorimgtaggg" src="/api${res.data.accessUrl}" style="max-height: 500px; max-width: 100px;" alt="addsa" />`)
            quillRef.current.getEditor().setSelection(range.index + 1);
          }
        })
        .catch((err) => {
          //  console.log(err)
           setErrMsg(err.response.data.message);
        });
    };

    document.body.querySelector(':scope > input').remove()
    document.body.appendChild(input);
    document.body.removeChild(input);
  }

  const videoHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
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
          // console.log(res);
          if (res.statusText === 'Created' || res.status === 201) {
            // const Video = quillRef.current.getEditor().import('formats/video');

            // class CoustomVideo extends Video {
            //   static create(value) {
            //     const node = super.create(value);
                
            //     const video = document.createElement('video')
            //     video.setAttribute('controls', true);
            //     // video.setAttribute('type', "video/mp4");
            //     video.setAttribute('src', '/api' + res.data.accessUrl);
            //     node.appendChild(video);
            
            //     return node;
            //   }
            // };

            // CoustomVideo.blotName = 'video';
            // CoustomVideo.className = 'ql-video';
            // CoustomVideo.tagName = 'DIV';

            // 현재 커서 위치에 동영상을 삽입하고 커서 위치를 +1 하기
            const range = quillRef.current.getEditorSelection();
            quillRef.current.getEditor().insertEmbed(range.index, 'video', '/api' + res.data.accessUrl);
            // quillRef.current.getEditor().insertEmbed(range.index, 'video', CoustomVideo);
            // quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, `<video controls autoplay=false><source src="/api${res.data.accessUrl}" type="video/mp4"></video`)
            // quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, `<iframe src="/api${res.data.accessUrl}" frameborder="0" allowfullscreen></iframe>`)
            quillRef.current.getEditor().setSelection(range.index + 1);
          }
        })
        .catch((err) => {
            // console.log(err)
           setErrMsg(err.response.data.message);
        });
    };

    document.body.querySelector(':scope > input').remove()
    document.body.appendChild(input);
    document.body.removeChild(input);
  }

  // useMemo를 사용한 이유는 modules가 렌더링마다 변하면 에디터에서 입력이 끊기는 버그가 발생
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: { image: imageHandler, video: videoHandler }
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
    {/* {errMsg && <StateNotice color='danger'>{errMsg}</StateNotice>} */}
    <StateNotice color='danger' state={errMsg} setState={setErrMsg}>{errMsg}</StateNotice>
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