import {ImgProps} from "next/dist/shared/lib/get-img-props";

interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypedColumn,
    todos: Todo[]
}

interface Todo  {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn;
    image?: Image;
}

interface Image {
    bucketId: string;
    fileId: string;
}
