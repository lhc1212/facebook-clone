import Head from "next/head"
import Image from "next/image";
import { Circle } from "better-react-spinkit";

function Loading() {
    return (
        <div className="grid place-items-center h-screen">
            <Head>
                <title>Loading...</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="grid place-items-center">
                <Image
                    className="object-contain"
                    src="/FacebookLogo.png"
                    height={150}
                    width={150}
                />

                <Circle className="mt-10" color="#166FE5" size={75} />
            </div>
        </div>
    )
}

export default Loading
