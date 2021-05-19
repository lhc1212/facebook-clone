import Image from "next/image"
import Head from 'next/head'
import { auth } from "../firebase";
import { useRef } from "react";
import { useRouter } from "next/router";

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const router = useRouter();

    const signIn = () => {
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        )
            .then((user) => console.log(user))
            .catch((error) => alert(error.message));
    }

    return (
        <div className="grid place-items-center bg-[#F0F2F5] h-screen">
            <Head>
                <title>Facebook - Login or Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col">
                <Image
                    className="object-contain"
                    src="/FacebookLogo.png"
                    height={150}
                    width={150}
                />

                {/* Input */}
                <div className="grid place-items-center w-80 bg-white p-5 mt-5 rounded-lg">
                    <div className="grid place-items-center w-full border-b border-whitesmoke pb-2 mb-2">
                        <input ref={emailRef} className="input" placeholder="Email" />
                        <input ref={passwordRef} className="input" type="password" placeholder="Password" />
                        <button
                            onClick={signIn}
                            className="bg-blue-500 text-white font-bold w-full p-3 my-2 rounded-md"
                        >
                            Log In
                        </button>
                    </div>

                    <button onClick={() => router.push("/register")} className="mt-2 p-3 bg-[#35A421] text-white font-bold rounded-md">Create New Account</button>
                </div>
            </div>
        </div >
    )
}

export default Login;
