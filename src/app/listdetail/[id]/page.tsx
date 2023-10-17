'use client'

import Nav from '@/app/components/nav';
import React, { Component, useState } from 'react';
import Detail from '../_components/detail';


export default function Buy() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };
// ==========================================================================================


    return (
        <>
            <div>
                <Nav/>
                <Detail/>
            </div>
            {/* <div>
                <button
                    onClick={openModal}
                    className="text-xl bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 "
                >입찰버튼</button>
                <Modal isOpen={modalIsOpen} closeModal={closeModal} />
            </div> */}
        </>
    );
}

