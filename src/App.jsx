import { Post } from './components/Posts'
import { Header } from './components/Header.JSX'
import { Sidebar } from './components/Sidebar'

import style from './App.module.css'

import './global.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/skyrons.png',
      name: 'Hugo Souza',
      role: 'Front-End Developer', 
    },
    content: [
        { type: 'paragraph', content:'Fala galeraa' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
        { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-07-19 13:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/lucasdmmc.png',
      name: 'Lucas Carvalho',
      role: 'Web Developer' 
    },
    content: [
        { type: 'paragraph', content:'Finalmente finalizei meu novo site/portfólio' },
        { type: 'paragraph', content: 'Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻' },
    ],
    publishedAt: new Date('2023-07-10 15:35:42'),
  },
];

function App() {

  return (
    <div>
      <Header />

      <div className={style.wrapper}>
          <Sidebar />

        <main>
          {posts.map(post => {
            return (
                <Post  
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
