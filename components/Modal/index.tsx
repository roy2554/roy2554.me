import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Post } from '../../types/database';

import Button from '../Button';

const YesOrNoMode = ({ setIsActive, actionOnYes, actionOnNo }: { setIsActive: Dispatch<SetStateAction<boolean>>; actionOnYes?: () => void; actionOnNo?: () => void }) => {
    return (
        <div className="flex space-x-2 float-right">
            <Button
                title="yes"
                onClick={() => {
                    if (actionOnYes) actionOnYes();
                    setIsActive(false);
                }}
                color="success"
            />
            <Button
                title="no"
                onClick={() => {
                    if (actionOnNo) actionOnNo();
                    setIsActive(false);
                }}
                color="danger"
            />
        </div>
    );
};

const MediaUploadMode = ({
    setIsActive,
    setMedia,
    actionOnDone,
}: {
    setIsActive: Dispatch<SetStateAction<boolean>>;
    setMedia?: Dispatch<SetStateAction<string[]>>;
    actionOnDone?: () => void;
}) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [fileQty, setFileQty] = useState<number>(0);
    const [uploadedFilesQty, setUploadedFilesQty] = useState<number>(0);

    const [ereMsg, setErrMsg] = useState<string>('');

    if (setMedia)
        return (
            <div>
                <input
                    type={'file'}
                    // multiple
                    onChange={(e) => {
                        setIsUploading(true);
                        // console.log(e.target.files);
                        const itemsLen = e.target.files?.length;
                        setFileQty(itemsLen || 0);
                        if (itemsLen && e.target.files) {
                            for (let i = 0; i < itemsLen; i++) {
                                const file = e.target.files[i];

                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    // console.log(reader.result);
                                };
                                const formDate = new FormData();
                                formDate.append('file', file);
                                axios
                                    .post('/api/media', formDate, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    })
                                    .then((res) => {
                                        // console.log(res);
                                        setMedia((prev) => [...prev, res.data.accessUrl]);
                                        setUploadedFilesQty((prev) => {
                                            if (prev + 1 === itemsLen) {
                                                setIsUploading(false);
                                                setIsActive(false);
                                                if (actionOnDone) actionOnDone();
                                            }
                                            return prev + 1;
                                        });
                                    })
                                    .catch((err) => {
                                        setErrMsg(err.response.data.message);
                                        setFileQty((prev) => prev - 1);
                                    });
                            }
                        }
                    }}
                />
                {ereMsg && <p>Error: {ereMsg}</p>}
                {isUploading && <p>{`Uploading... (${uploadedFilesQty} out of ${fileQty})`}</p>}
                {ereMsg && (
                    <div className="float-right">
                        <Button
                            title="close"
                            color="danger"
                            onClick={() => {
                                setIsActive(false);
                            }}
                        />
                    </div>
                )}
            </div>
        );
};

interface Props {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    title: string;
    content?: string;
    mode?: 'yesOrNo' | 'mediaUpload';
    canBreakOut?: boolean;
    actionOnYes?: () => void;
    actionOnNo?: () => void;
    setMedia?: Dispatch<SetStateAction<string[]>>;
    actionOnDone?: () => void;
}

const ModalComponent = ({ isActive, setIsActive, title, content, mode = 'yesOrNo', canBreakOut = true, actionOnYes, actionOnNo, setMedia, actionOnDone }: Props) => {
    // const [isActive, setIsActive] = useState<boolean>(true);
    const modalClass = `${isActive ? '' : 'hidden'} absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50`;
    return (
        <div
            onClick={(e) => {
                if (canBreakOut) {
                    // if user click outside of modal, close modal
                    if (e.target === e.currentTarget) {
                        if (actionOnNo) actionOnNo();
                        setIsActive(false);
                    }
                }
            }}
            className={modalClass}
        >
            <div className="bg-dark-bg-secondary rounded-lg p-4">
                <p className="text-xl font-bold">{title}</p>
                <p>{content}</p>
                {mode === 'yesOrNo' ? YesOrNoMode({ setIsActive, actionOnYes, actionOnNo }) : null}
                {mode === 'mediaUpload' ? MediaUploadMode({ setIsActive, setMedia }) : null}
            </div>
        </div>
    );
};

export default ModalComponent;
