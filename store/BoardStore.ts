import { create } from 'zustand'
import {getTodosGroupedByColumn} from "@/lib/getTodosGroupedByColumn";
import {databases} from "@/appwrite";
import uploadImage from "@/lib/uploadImage";
import {ID} from "appwrite";

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    newTaskInput: string;
    setNewTaskInput: (input: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void;
    image: File | null;
    setImage: (image: File | null) => void;
    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;

}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async() => {
        const board = await getTodosGroupedByColumn();
        set({board})
    },
    setBoardState: (board) => set({board}),
    updateTodoInDB: async(todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId,

            }

        )
    },
    searchString: "",
    newTaskInput: "",
    setSearchString: (searchString) => set({searchString}),
    setNewTaskInput: (input) => set({newTaskInput: input}),
    newTaskType: "todo",
    setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),
    setImage: (image: File | null) => set({image}),
    image: null,
    addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
        let file: Image | undefined;

        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                }
            }
        }

       const {$id, } =  await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) })
            }
        );

        set({newTaskInput: ""})


    }


}))