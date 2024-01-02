'use client'

import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import React from "react";
import {useBoardStore} from "@/store/BoardStore";
import {Column} from "@/components/Column";


export const Board = () => {
    const [board, getBoard] = useBoardStore((state) => [
        state.board,
        state.getBoard,
    ]);


    React.useEffect(() => {
        getBoard();
    }, [getBoard])



    const handleOnDragEnd = (result: DropResult) => {}

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            Array.from(board.columns.entries()).map(([id, column], index) => (
                                <Column key={id} id={id} todos={column.todos} index={index}/>
                            ))
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};