import { Header } from './components/Header';
import { Post, PostType } from './components/Post';
import { Sidebar } from './components/Sidebar';

import './global.css';
import styles from "./App.module.css";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/dwernerortiz.png',
      name: 'Daniel Werner',
      role: 'Senior Software Engineer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2023-03-05 20:00:00  ')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2023-03-10 20:05:00')
  }
];

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
          <main>
            {posts.map(post => {
              return (
                <Post 
                  key={post.id}
                  post={post}
                />
              )
            })}
          </main>
      </div>
  </>
  )
}

export default App 
