
import {ID, storage} from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "65942a4e41bf131031b6",
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;

