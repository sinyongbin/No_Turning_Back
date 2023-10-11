"use client"
import Image from 'next/image'
import prisma from '@/db'
import Upload from './_components/upload';



export default function Sell() {
    
    return (
    <>
        <div>
            <Upload/>
        </div>

    </>
    );
}
