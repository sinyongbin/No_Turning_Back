
import Image from 'next/image'
import prisma from '@/db'
import Login from '../components/login';
import Footer from '../components/footer';
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
