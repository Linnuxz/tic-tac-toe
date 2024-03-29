import React, { useRef, useState } from 'react';
import { boxes } from '../styles/index';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

const Game = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [takenBoxes, setTakenBoxes] = useState(Array(9).fill(false));
    const titleRef = useRef(null);
    const boxRefs = Array.from({ length: 9 }, () => useRef(null));

    const toggle = (e, num) => {
        if (lock || takenBoxes[num]) {
            return;
        }

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' style='margin:50px 50px;'>`;
            data[num] = 'x';
            const newTakenBoxes = [...takenBoxes];
            newTakenBoxes[num] = true;
            setTakenBoxes(newTakenBoxes);
            console.log(count);
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'style='margin:50px 50px;'>`;
            data[num] = 'o';
            const newTakenBoxes = [...takenBoxes];
            newTakenBoxes[num] = true;
            setTakenBoxes(newTakenBoxes);
            console.log(count);
        }
        checkWinner();
        setCount(count + 1);
    };

    const checkWinner = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== '') {
            won(data[2]);
        }
        if (data[3] === data[4] && data[4] === data[5] && data[5] !== '') {
            won(data[5]);
        }
        if (data[6] === data[7] && data[7] === data[8] && data[8] !== '') {
            won(data[8]);
        }
        if (data[0] === data[3] && data[3] === data[6] && data[6] !== '') {
            won(data[6]);
        }
        if (data[1] === data[4] && data[4] === data[7] && data[7] !== '') {
            won(data[7]);
        }
        if (data[2] === data[5] && data[5] === data[8] && data[8] !== '') {
            won(data[8]);
        }
        if (data[0] === data[4] && data[4] === data[8] && data[8] !== '') {
            won(data[8]);
        }
        if (data[2] === data[4] && data[4] === data[6] && data[6] !== '') {
            won(data[6]);
        }
        if (data.every((value) => value !== '')) {
            won('draw');
        }
    };
    const won = (winner) => {
        setLock(true);
        if (winner === 'x') {
            titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}' style='padding:20px; height:90px'> Wins`;
        } else if (winner === 'o') {
            titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}' style='padding:20px; height:90px'> Wins`;
        } else if (winner === 'draw') {
            titleRef.current.innerHTML = `It's a <span style='color:#26ffcb'>&nbsp;Draw</span>`;
        }
    };
    const reset = () => {
        setLock(false);
        data = ['', '', '', '', '', '', '', '', ''];
        setCount(0);
        setTakenBoxes(Array(9).fill(false));
        titleRef.current.innerHTML = `Tic Tac Toe Game in <span style='color:#26ffcb'>&nbsp;React</span>`;
        boxRefs.map((e) => {
            e.current.innerHTML = '';
        });
    };

    return (
        <div className="text-center">
            <h1
                className="pt-[40px] text-white text-[60px] flex justify-center align-center"
                ref={titleRef}
            >
                Tic Tac Toe Game in
                <span className="text-[#26ffcb]">&nbsp;React</span>
            </h1>

            <div className="h-[600px] w-[564px] flex m-auto">
                <div>
                    <div
                        className={boxes}
                        ref={boxRefs[0]}
                        onClick={(e) => {
                            toggle(e, 0);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[1]}
                        onClick={(e) => {
                            toggle(e, 1);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[2]}
                        onClick={(e) => {
                            toggle(e, 2);
                        }}
                    ></div>
                </div>
                <div>
                    <div
                        className={boxes}
                        ref={boxRefs[3]}
                        onClick={(e) => {
                            toggle(e, 3);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[4]}
                        onClick={(e) => {
                            toggle(e, 4);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[5]}
                        onClick={(e) => {
                            toggle(e, 5);
                        }}
                    ></div>
                </div>
                <div>
                    <div
                        className={boxes}
                        ref={boxRefs[6]}
                        onClick={(e) => {
                            toggle(e, 6);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[7]}
                        onClick={(e) => {
                            toggle(e, 7);
                        }}
                    ></div>
                    <div
                        className={boxes}
                        ref={boxRefs[8]}
                        onClick={(e) => {
                            toggle(e, 8);
                        }}
                    ></div>
                </div>
            </div>
            <button
                className="w-[250px] h-[100px] border-none outline-none cursor-pointer rounded-[50px] bg-[#1f3540] text-[26px] text-[#26ffcb] mt-[25px] mb-[50px]"
                onClick={() => {
                    reset();
                }}
            >
                Reset
            </button>
        </div>
    );
};

export default Game;
