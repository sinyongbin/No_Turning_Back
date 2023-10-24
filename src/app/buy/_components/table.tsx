"use client"

import { useEffect, useState } from "react"

export default function Table() {

    const [formData, setFormData] = useState({
        current_price : '', //낙찰가
        post_id : '', //포스트 id
        title: '', //제목
    })

    useEffect(()=>{
        const loggedEmail = sessionStorage.getItem('loggedEmail');

        try {
            fetch(`/api/buytable/${loggedEmail}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            }).then(res=>res.json()).then(res =>{
                setFormData(res);
                console.log(res);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    
    return (
        <>
            <div className="mx-48 p-3 ">

                <div className="mb-4">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                            <th className="border border-gray-300 p-2 w-7/12">제목</th>
                            <th className="border border-gray-300 p-2 w-2/12">판매자</th>
                            <th className="border border-gray-300 p-2 w-2/12">가격</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* {messages.map((message, index) => (
                            <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                <a href='../messageForm'>{message.title}</a>
                            </td>
                            <td className="border border-gray-300 p-2">{message.nickname}</td>
                            <td className="border border-gray-300 p-2">{message.date}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button className="bg-blue-500 text-white py-1 px-6 rounded-md hover:bg-blue-700">
                                삭제
                                </button>
                            </td>
                            </tr>
                        ))} */}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}