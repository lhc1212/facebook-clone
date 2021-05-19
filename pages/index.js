import Head from 'next/head'
import Header from '../components/Header'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from './login';
import Loading from './loading';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

export async function getServerSideProps(context) {
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }))

  return {
    props: {
      posts: docs,
    }
  }
}

export default function Home({ posts }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user ? (
        <Login />
      ) : (
        <>
          <Header />

          <main className="flex">
            <Sidebar />
            <Feed posts={posts} />
            <Widgets />
          </main>
        </>
      )}
    </div>
  )
}
