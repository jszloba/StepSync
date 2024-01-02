import {DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import React from "react";
import {XCircleIcon} from "@heroicons/react/16/solid";

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;

}

// eslint-disable-next-line react-hooks/rules-of-hooks

export const TodoCard: React.FC<Props> = ({
    todo,
    index,
    id,
    innerRef,
    dragHandleProps,
    draggableProps
}) => {


    return (
        <div
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >

            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button className="text-red-500 hover:text-red-600">
                    <XCircleIcon
                        className="ml-5 h-8 w-8"
                    />
                </button>
            </div>


        </div>
    );
};