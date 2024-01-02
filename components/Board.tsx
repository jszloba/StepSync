'use client'

import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import React from "react";
import {useBoardStore} from "@/store/BoardStore";
import {Column} from "@/components/Column";
import {type} from "node:os";
import updateDb from "update-browserslist-db";


export const Board = () => {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB,

    ]);

    React.useEffect(() => {
        getBoard();
    }, [getBoard])


    const handleOnDragEnd = (result: DropResult) => {
        const {destination, source, type } = result;

        if (!destination) {
            return;
        }
        if (type === "column") {
             const entries = Array.from(board.columns.entries());
             const [removed] = entries.splice(source.index, 1)
             entries.splice(destination.index, 0, removed)
             const rearrangedColumns = new Map(entries)
            setBoardState({
                ...board,
                columns: rearrangedColumns
            })
        }

        if (type === "card") {
            const startColIndex = Array.from(board.columns.entries())[Number(source.droppableId)];
            const finishColIndex = Array.from(board.columns.entries())[Number(destination.droppableId)];

            const startCol: Column = {
                id: startColIndex[0],
                todos: startColIndex[1].todos
            }

            const finishCol: Column = {
                id: finishColIndex[0],
                todos: finishColIndex[1].todos
            }

            if (!startCol || !finishCol) return;
            if (source.index === destination.index && startCol === finishCol) return;

            const newTodos = Array.from(startCol.todos);

            const [todoMoved] = newTodos.splice(source.index, 1);

            if (startCol.id === finishCol.id) {
                // card task drag within the same column
                newTodos.splice(destination.index, 0, todoMoved)
                const newCol = {
                    id: startCol.id,
                    todos: newTodos
                }
                const newColumns = new Map(board.columns);
                newColumns.set(startCol.id, newCol)

                setBoardState({...board, columns: newColumns})
            } else {
                // card task drag to another column
                const finishTodos = Array.from(finishCol.todos);
                finishTodos.splice(destination.index, 0, todoMoved);

                const newColumns = new Map(board.columns);
                const newStartCol = {
                    id: startCol.id,
                    todos: newTodos,
                }

                newColumns.set(startCol.id, newStartCol);
                newColumns.set(finishCol.id, {
                    id: finishCol.id,
                    todos: finishTodos,
                });

                updateTodoInDB(todoMoved, finishCol.id)

                setBoardState({...board, columns: newColumns}
                )}
        }



    }

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