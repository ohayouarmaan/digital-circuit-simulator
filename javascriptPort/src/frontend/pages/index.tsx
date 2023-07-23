import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Editor from '../components/editor'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className='min-h-[100vh] min-w-[100%] bg-gray-800'>
        <Editor />
      </main>
    </>
  )
}
