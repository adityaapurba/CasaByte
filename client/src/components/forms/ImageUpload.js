import Resizer from "react-image-file-resizer";
// import axios from "axios";
import { app } from "../../firebase";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { nanoid } from "nanoid";
import {Avatar} from "antd";

export default function ImageUpload({ ad, setAd }) {

    const handleUpload = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if (files?.length) {
                // console.log(files);
                setAd({ ...ad, uploading: true });
                files.map(async file => {

                    //firebase
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
                                    console.log("file successfully uploaded");
                                    setAd((prev) => ({
                                        ...prev,
                                        photos: [{url:downloadURL, key:tempName}, ...prev.photos],
                                        uploading: false,
                                    }));
                                } catch (err) {
                                    console.log(err);
                                    setAd({ ...ad, uploading: false })
                                }
                            },
                            "file"
                        );
                    });
                });
            }

        } catch (err) {
            console.log(err);
            setAd({ ...ad, uploading: false });
        }
    };
    const handleDelete = async (file) => {
        const answer = window.confirm("Delete image");
        if(!answer)return;
        try {
            setAd({ ...ad, uploading: true });
            const storage = getStorage(app);
            const desertRef = ref(storage, file.key);
            deleteObject(desertRef).then(() => {
                setAd((prev) => ({...prev, 
                    photos: prev.photos.filter((p)=> p.key !== file.key),
                    uploading: false}));
            });
        } catch (err) {
            console.log(err);
            setAd({ ...ad, uploading: false });
        }
    };

    return (
        <>
            <label className={`btn btn-secondary mt-3  ${ad.uploading ? "disabled" : ""}`}>
                {ad.uploading ? "Processing..." : "upload Photos"}
                <input
                    className={`${ad.uploading ? "disabled" : ""}`}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleUpload}
                />
            </label>
            {ad.photos?.map((file, index) => (
                <Avatar 
                key={index}
                src={file.url} 
                shape="square" 
                size="large"
                className="ml-2"
                onClick={() => handleDelete(file)}
                />) )}
            
        </>
    )
}