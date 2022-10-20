import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    interface draggableProps {
        x: number;
        y: number;
    }
    const [draggableTexts, setDraggableTexts] = useState<draggableProps[]>([]);
    const [draggableTextContent, setDraggableTextContent] = useState<String>('roy2554.me');

    const trackRoyTextPos = (number: number, data: DraggableData) => {
        const before = draggableTexts.slice(0, number);
        const after = draggableTexts.slice(number + 1);
        const newDraggableTexts = [...before, { x: data.x, y: data.y }, ...after];
        setDraggableTexts(newDraggableTexts);
    };

    const { ctext } = router.query;

    useEffect(() => {
        const asyncFunc = async () => {
            const date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            if (month === 1 && day === 1) {
                setDraggableTextContent("new year's day");
            } else if (month === 4 && day === 1) {
                setDraggableTextContent('fools day');
            } else if (month === 12 && day === 25) {
                setDraggableTextContent('christmas day');
            }

            if (ctext) {
                setDraggableTextContent(ctext.toString());
            }

            draggableTextContent.split('').forEach((char, index) => {
                setDraggableTexts((prevState) => [...prevState, { x: 0, y: 0 }]);
            });
        };
        asyncFunc();
    }, [ctext, draggableTextContent]);

    return (
        <div>
            <div className="h-screen flex items-center justify-center text-dark-text">
                {draggableTextContent.split('').map((char, index) => {
                    return (
                        <Draggable key={index} onDrag={(e, data) => trackRoyTextPos(index + 1, data)}>
                            <div className="font-bold text-5xl cursor-pointer">
                                <a>{char != ' ' ? char : <>&nbsp;</>}</a>
                            </div>
                        </Draggable>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
