import Resizer from "react-image-file-resizer";
import axios from "axios";
import { app } from "../../firebase";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { nanoid } from "nanoid";
import {Avatar} from "antd";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProfileImageUpload({ photo, setPhoto, uploading, setUploading }) {

    const [auth, setAuth] = useAuth();

    const handelUpload = async (e) => {
        try {
            let file = e.target.files[0];
            if(file){
            setUploading(true);
            new Promise(() => {
                Resizer.imageFileResizer(
                    file,
                    1080,
                    720,
                    "JPEG",
                    100,
                    0,
                    async (uri) => {
                        try {
                            const tempName = nanoid(6);
                            const storage = getStorage(app);
                            const storageRef = ref(storage, `${tempName}`);
                            //upload file in bucket 
                            const snapshot = await uploadBytesResumable(storageRef, uri, "image");

                            //grab public url
                            const downloadURL = await getDownloadURL(snapshot.ref);
                            console.log(downloadURL);
                            setPhoto(
                                {url:downloadURL, key:tempName},
                            );
                                setUploading(false);
                                toast.success("Profile updated");
                        } catch (err) {
                            console.log(err);
                            setUploading(false);
                        }
                    },
                    "file"
                );
            });
        }

        } catch (err) {
            console.log(err);
            setUploading(false);
        }
    };
    const handleDelete = async (file) => {
        const answer = window.confirm("Delete image");
        if(!answer)return;
        try {
            setUploading(true);
            const storage = getStorage(app);
            const desertRef = ref(storage, file.key);
            deleteObject(desertRef).then(() => {
                setPhoto(null);
            });
        } catch (err) {
            console.log(err);
            setUploading(false);
        }
    };

    return (
        <>
            <label className="btn btn-secondary mt-4">
                {uploading ? "Processing..." : "Update Profile Image"}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handelUpload}
                />
            </label>
            {photo?.url ?
            <Avatar 
                src={photo.url} 
                shape="square" 
                size="large"
                className="ml-2"
                onClick={() => handleDelete(photo)}
            /> : ""}
            
        </>
    )
}