import {storage} from "@/appwrite";

const getUrl = async (image: Image)  => {
   return  storage.getFilePreview(image.bucketId, image.fileId);
}

export default getUrl