import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import dynamic from 'next/dynamic';

const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'];

export default function Editor({ ...props }) {
    props.className = props.className + ' text-black dark:text-white';
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
            <QuillWrapper {...props} modules={modules} formats={formats} theme="snow" defaultValue={props.defaultValue as string} onChange={props.onChange} />
        </>
    );
}
