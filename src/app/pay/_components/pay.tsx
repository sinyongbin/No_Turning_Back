"use client"
import React, { useEffect, useState } from 'react';

export default function Pay() {

    const [formData, setFormData] = useState({
        email: '',
        balance: '5000',
    })
    
    //잔액 표시는 get 사용 

    useEffect (() => {
        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

        fetch(`/${loggedInfo.email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json()).then(res=>{

        })
    }, [])

    //입급 및 출금은 put 사용

    function Deposit () { //입급

    }

    function Withdraw () { //출금

    }

    return (
        <>
            <div className="flex justify-center ">
                <h2 className="text-2xl font-bold mb-4">페이</h2>
            </div>
            <div className="flex justify-between items-center p-10 mx-[500px] space-x-4 border-2 border-zinc-950 rounded-md my-20 ">
                <div className="w-1/3">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">입금</h2>
                        <button
                            type='button'
                            onClick={Deposit}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">입금하기</button>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">출금</h2>
                        <button
                            type='button'
                            onClick={Withdraw}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">출금하기</button>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">잔액</h2>
                        <input
                            type="text"
                            name="balance"
                            value={formData.balance}
                            className="border rounded border-neutral-600 py-2 px-3 w-full"
                        />
                    </div>
                </div>
            </div>
        </>

    );
}

