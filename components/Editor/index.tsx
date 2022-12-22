// import './styles.scss';

import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

// Extensions
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// load all highlight.js languages
import { lowlight } from 'lowlight';

import CodeBlockComponent from './CodeBlockComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faStrikethrough,
    faHeading,
    faListUl,
    faListOl,
    faCode,
    faQuoteLeft,
    faLink,
    faImage,
    faTable,
    faUndo,
    faRedo,
    faParagraph,
} from '@fortawesome/free-solid-svg-icons';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ModalComponent from '../Modal';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const MenuBar = ({
    editor,
    media,
    setMedia,
    mediaUploadModal,
    setMediaUploadModal,
}: {
    editor: any;
    media: string[];
    setMedia: React.Dispatch<React.SetStateAction<string[]>>;
    mediaUploadModal: boolean;
    setMediaUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    // const [mediaUploadModal, setMediaUploadModal] = useState(false);
    // const [media, setMedia] = useState<string[]>([]);

    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const attachMedia = useCallback(() => {
        if (media) {
            for (const addr of media) {
                console.log(`addr: ${addr}`);
                editor
                    .chain()
                    .focus()
                    .setImage({ src: `/api${addr}` })
                    .run();
            }
            setMedia([]);
        }
    }, [editor, media]);

    const setLink = useCallback(() => {
        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
        }

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();

            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                {/* bold */}
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                {/* italic */}
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                {/* strike */}
                <FontAwesomeIcon icon={faStrikethrough} />
            </button>
            <button onClick={setLink} disabled={!editor.can().chain().focus().toggleLink().run()} className={editor.isActive('link') ? 'is-active' : ''}>
                {/* bold */}
                <FontAwesomeIcon icon={faLink} />
            </button>
            {/* <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                code
            </button> */}
            {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button> */}
            {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button> */}
            {/* <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
                {/* paragraph 
                <FontAwesomeIcon icon={faParagraph} />
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
                h1
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
                h2
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
                h3
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
                h4
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>
                h5
            </button> */}
            {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>
                h6
            </button> */}
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
                {/* bullet list */}
                <FontAwesomeIcon icon={faListUl} />
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
                {/* ordered list */}
                <FontAwesomeIcon icon={faListOl} />
            </button>
            {/* <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
                {/* code block 
                <FontAwesomeIcon icon={faCode} />
            </button> */}
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
                {/* blockquote */}
                <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</button>
            {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button> */}
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                {/* undo */}
                <FontAwesomeIcon icon={faUndo} />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                {/* redo */}
                <FontAwesomeIcon icon={faRedo} />
            </button>
            <button
                onClick={() => {
                    console.log('setImage');
                    setMediaUploadModal(true);
                    attachMedia();
                }}
            >
                setImage
            </button>
        </>
    );
};

export default ({ setContent }: { setContent?: Dispatch<SetStateAction<string>> }) => {
    const [mediaUploadModal, setMediaUploadModal] = useState(false);
    const [media, setMedia] = useState<string[]>([]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something…',
            }),
            Highlight,
            Typography,
            Link.configure({
                autolink: false,
                openOnClick: false,
            }),
            Image,
            // Syntax-highlighting: Unstable on mobile
            // CodeBlockLowlight.extend({
            //     addNodeView() {
            //         return ReactNodeViewRenderer(CodeBlockComponent);
            //     },
            // }).configure({ lowlight }),
        ],
        content: null,
        onUpdate: ({ editor }) => {
            if (setContent) {
                // setContent(JSON.stringify(editor.getJSON()));
                setContent(editor.getHTML());
            }
        },
    });

    useEffect(() => {
        if (media && editor) {
            console.log('ATTACHING IMAGE');
            for (const addr of media) {
                console.log(`addr: ${addr}`);
                editor
                    .chain()
                    .focus()
                    .setImage({ src: `/api${addr}` })
                    .run();
            }
            setMedia([]);
        }
    }, []);

    return (
        <div className="TEXT-EDITOR px-2 text-white w-full flex flex-col items-center">
            <div className="flex flex-wrap">
                <MenuBar editor={editor} media={media} setMedia={setMedia} mediaUploadModal={mediaUploadModal} setMediaUploadModal={setMediaUploadModal} />
            </div>
            <div className="w-full">
                <EditorContent className="outline-none" editor={editor} />
            </div>

            <div className={`${mediaUploadModal ? '' : 'hidden'}`}>
                <ModalComponent
                    isActive={mediaUploadModal}
                    setIsActive={setMediaUploadModal}
                    title="Media Uploading"
                    content="upload media files"
                    mode="mediaUpload"
                    setMedia={setMedia}
                    actionOnDone={() => {}}
                />
            </div>
            {media}
        </div>
    );
};

// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

// const Tiptap = () => {
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: '<p>Hello World! 🌎️</p>',
//     });

//     return <EditorContent editor={editor} />;
// };

// export default Tiptap;
