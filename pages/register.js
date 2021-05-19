import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { auth } from "../firebase";

function Register() {
    const router = useRouter();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        )
            .then((user) => {
                user.user.updateProfile({
                    displayName: username,
                    photoURL: photoUrl,
                })
            })
            .catch((error) => alert(error.message));

        router.replace("/");
    }

    return (
        <div className="grid place-items-center bg-[#F0F2F5] h-screen">
            <Head>
                <title>Facebook - Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col">
                <Image
                    className="object-contain"
                    src="/FacebookLogo.png"
                    height={150}
                    width={150}
                />

                <div className="grid place-items-center w-80 bg-white p-5 mt-5 rounded-lg">
                    <div className="grid place-items-center w-full border-b border-whitesmoke pb-2 mb-2">
                        <input required value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" />
                        <input required ref={emailRef} className="input" placeholder="Email Address" />
                        <input required ref={passwordRef} className="input" type="password" placeholder="Password" />
                        <input required value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input" placeholder="Profile Picture URL" />

                        <button
                            onClick={register}
                            className="bg-blue-500 text-white font-bold w-full p-3 my-2 rounded-md"
                        >
                            Register
                         </button>
                    </div>

                    <button onClick={() => router.push("/")} className="mt-2 py-3 px-16 bg-[#35A421] text-white font-bold rounded-md">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;
