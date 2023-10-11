
import Image from 'next/image'
import prisma from '@/db'
import Login from '../components/header';
import Footer from '../components/footer';
import Upload from './_components/upload';
import { useEffect, useState } from 'react';




export default async function Sell() {

    return (
    <>
        <div>
            <Upload/>
        </div>

    </>
    );
}
