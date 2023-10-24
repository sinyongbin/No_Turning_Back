'use client'
import Image from 'next/image'
import prisma from '@/db'


import Nav from './components/nav'
import MainList from './components/mainList'



export default function Home() {
  return (
    <>
    <div>
      <Nav/>
    </div>
    <div>
      <MainList/>
    </div>

    </>
  );
}