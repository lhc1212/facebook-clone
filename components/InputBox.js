import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import firebase from "firebase"

function InputBox() {
    const [user] = useAuthState(auth);
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage = () => {
        setImageToPost(null);
    }

    const sendPost = (e) => {
        e.preventDefault();

        if (!inputRef.current.value) return;

        db.collection("posts").add({
            message: inputRef.current.value,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((doc) => {
                if (imageToPost) {
                    const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, "data_url");

                    removeImage();

                    uploadTask.on(
                        "state_change",
                        null,
                        (error) => console.log(error),
                        () => {
                            storage.ref(`posts`).child(doc.id).getDownloadURL()
                                .then((url) => {
                                    db.collection("posts").doc(doc.id).set(
                                        {
                                            postImage: url,
                                        },
                                        { merge: true },
                                    )
                                })
                        }
                    );
                }
            })

        inputRef.current.value = "";
    }

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">

            {/* Top */}
            <div className="flex items-center space-x-6 p-4">
                <img
                    className="sticky rounded-full"
                    src={user.photoURL}
                    height={40}
                    width={40}
                    alt=""
                />

                <form className="flex flex-1">
                    <input
                        ref={inputRef}
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        placeholder={`What's on your mind, ${user.displayName}?`}
                    />
                    <button
                        type="submit"
                        onClick={sendPost}
                        hidden
                    >
                        Submit
                    </button>
                </form>

                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                        <img
                            className="h-10 object-contain"
                            src={imageToPost}
                        />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
            </div>

            {/* Bottom */}
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>

                <div onClick={() => filepickerRef.current.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input ref={filepickerRef} onChange={addImageToPost} type="file" hidden />
                </div>

                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
