import React, { useEffect, useState, useRef } from "react";
import { Modal, LaunchCard } from "../../components";
import localData from "../../localData";
import { useFetch } from "../../hooks/useFetch";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { globus } = localData.images;
    const { getPastLaunches, getUpcomingLaunches } = useFetch();

    const [isModalShown, setIsModalShown] = useState(false);

    const callback = () => setItems();

    const data = [
        {
            title: "past launches",
            className: "past-launches",
            launches: [],
        },
        {
            title: "launches",
            className: "present-launches",
            launches: [],
        },
        {
            title: "my launches",
            className: "book-launches",
            launches: [],
        },
    ];

    const [boards, setBoards] = useState(data);
    const dragItem = useRef();
    const dragNode = useRef();

    const [dragging, setDragging] = useState(false);
    const [currentBoardIndex, setCurrentBoardIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let boards = [
                {
                    title: "past launches",
                    className: "past-launches",
                    launches: [],
                },
                {
                    title: "launches",
                    className: "present-launches",
                    launches: [],
                },
                {
                    title: "my launches",
                    className: "book-launches",
                    launches: [],
                },
            ];
            try {
                boards[0].launches = await getPastLaunches();
                boards[1].launches = await getUpcomingLaunches();
            } catch (err) {
                console.log(err, "here");
            }
            setBoards(boards);
        };

        fetchData();
    }, []);

    const dragStart = (e, params) => {
        dragNode.current = e.target;
        dragItem.current = params;
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };

    const setItems = () => {
        let tempBoards = boards.map((board) => {
            return {
                title: board.title,
                className: board.className,
                launches: [...board.launches],
            };
        });
        tempBoards[currentBoardIndex].launches.splice(
            0,
            0,
            tempBoards[dragItem.current.boardIndex].launches.splice(dragItem.current.launchIndex, 1)[0]
        );
        setBoards(tempBoards);
        
        dragItem.current = null;
        dragNode.current = null;
     
    };

    const dragEnd = () => {
        if (currentBoardIndex === 1 && dragItem.current.boardIndex == 2) {
            setIsModalShown(true);
        } else {
            setItems();
            if(currentBoardIndex === 2){
                notify()
            }
        }
        setDragging(false);
    };

    const dragEnter = (e, boardIndex) => {
        e.stopPropagation()

        if (boardIndex == dragItem.current.boardIndex || boardIndex == 0) return;
        e.currentTarget.style.background = "rgba(0,0,0,0.1)";
        setCurrentBoardIndex(boardIndex);
    };

    const dragLeave = (e) => {
        e.currentTarget.style.background = "";
    };

    const getDraggingStyles = (params) => {
        if (dragItem.current.boardIndex === params.boardIndex && dragItem.current.launchIndex === params.launchIndex) {
            return "dragging";
        }
        return "";
    };

    const notify = () => toast("launch booked",{className:'custom-toast'});

    if (!boards) return "";
    return (
        <>
            <main className="home" onDragEnter={()=>setCurrentBoardIndex(dragItem.current.boardIndex)}>
                <div className="container-fluid">
                    <h1 className="home-title">
                        explore the space <img src={globus} alt="globus image" />
                    </h1>
                    <div className="home-center">
                        {boards.map((board, boardIndex) => (
                            <div
                                key={boardIndex}
                                className={`board ${board.className} `}
                                onDragEnter={(e) => dragEnter(e, boardIndex)}
                                onDragLeave={dragLeave}
                            >
                                <h3 className="board-title">{board.title}</h3>
                                <div className={`wrapper ${dragging ? "pe-none" : ""}`}>
                                    {board.launches.map((launch, launchIndex) => (
                                        <LaunchCard
                                            key={launchIndex}
                                            {...launch}
                                            {...{
                                                getDraggingStyles,
                                                dragging,
                                                dragStart,
                                                dragEnd,
                                                isDraggable: board.className !== "past-launches",
                                                params: { boardIndex, launchIndex },
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Modal
                isModalShown={isModalShown}
                setIsModalShown={setIsModalShown}
                // dialogClassName="modal-dialog-scrollable"
                dialogClassName="modal-dialog-centered"
                // dialogClassName="modal-lg"
                callback={callback}
            />
             <ToastContainer />
        </>
    );
}
