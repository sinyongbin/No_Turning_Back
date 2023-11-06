'use client'

import React, { Component, useState } from 'react';
import Detail from './detail';
import Nav from '../../components/nav';

type dataType =
{
    id: string
}
export default function Page({ id }: dataType  ) {
    console.log(id)
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
         
        </>
    );
}

