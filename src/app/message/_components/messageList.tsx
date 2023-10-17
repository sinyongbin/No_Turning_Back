"use client"

import { log } from 'console';
import React, { FormEvent, useEffect, useState } from 'react';
import Modal from './modal';

export default function MessageList() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [postData, setPostData] = useState({});
    const [messages, setMessages] = useState([]);

    // 이후 쪽지 추가를 위한 함수
    const addMessage = (message) => {
      setMessages([...messages, message]);
    };
  

    const [formData, setFormData] = useState({
        email: '',
        phoneNum: '',
        address: '',
        nickname:'',
    })

    const [passwordData, setPasswordData] = useState({
        password: '',
        ConfirmPassword: '',
    })

    useEffect (() => {
        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');
    
        fetch(`/member/member_info/${loggedInfo.email}`, {
            method: "GET",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        }).then(res=>res.json()).then(res=>{
            setFormData(res);
            console.log(1, res);
        })
        try {
            fetch('http://localhost:3000/api/user',{
                method: 'GET',
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // }
            }).then(res=>res.json()).then(res =>{
                setFormData(res[0]);
                console.log(1, res);
            })
        } catch (error) {
            console.log(error);
        }


    }, []);

    function handleInputChange(e: any) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setPasswordData({ ...passwordData, [name]: value });
    };

    function passwordChange(e: any) {
        e.preventDefault();

        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

        try{
            fetch(`/member/member_info/${loggedInfo.email}`, {
                method: "PUT",
                body: JSON.stringify(formData || passwordData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (response.status !== 200) {
                    console.log(formData || passwordData);
                    throw new Error('서버 응답이 실패했습니다.' + response.status);
                } else {
                    
                    alert(`${loggedInfo.nickname}님의 비밀번호가 성공적으로 변경되었습니다`);
                    location.href='user'
                }
            })
        } catch(error) {
            console.log('UPDATE 요청 실패!:', error)
        }
    }

    async function nicknameChange(e: FormEvent<HTMLFormElement>) { 

        e.preventDefault();

        const loggedIn = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

        try{
            const f = new FormData(e.currentTarget)
            const send = await fetch('http://localhost:3000/api/user', {
                method: "PUT",
                body: f 
            }).then((response) => {
                if (response.status !== 200) {
                    console.log(formData);
                } else {

                    loggedIn.nickname = formData.nickname
                    sessionStorage.setItem('loggedInMember', JSON.stringify(loggedIn));

                    console.log(sessionStorage);

                    alert(`닉네임이 ${formData.nickname}으로 성공적으로 변경되었습니다`);
                    location.href='user'
                    
                }
            }).catch((e) => {throw e}).finally()
        } catch(error) {
            console.log('UPDATE 요청 실패!:', error)
        }


    }
    const openModal = () => {
        setModalOpen(true);
    };
    
      const closeModal = () => {
        setModalOpen(false);
    };
      

    return (
        <>
            <div className="mx-48 p-4 ">
                <div>
                    <button className="btn_action w-auto text-2xl font-bold mb-4 bg-orange-600 text-white px-4 py-4 rounded-lg hover:bg-red-300 " onClick={openModal}>
                        쪽지보내기(이건 입찰하기버튼 아래 넣을건데 여기에 일단 띄움)
                    </button>
                    {isModalOpen && < Modal isOpen={isModalOpen} closeModal={closeModal} />}
                </div>

                <div className="mb-4">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                            <th className="border border-gray-300 p-2 w-7/12">제목</th>
                            <th className="border border-gray-300 p-2 w-2/12">닉네임</th>
                            <th className="border border-gray-300 p-2 w-2/12">올린 날짜</th>
                            <th className="border border-gray-300 p-2 w-1/12 ">답장</th>
                            </tr>
                        </thead>
                        <tbody>
                        {messages.map((message, index) => (
                            <tr key={index}>
                            <td className="border border-gray-300 p-2">{message.title}</td>
                            <td className="border border-gray-300 p-2">{message.nickname}</td>
                            <td className="border border-gray-300 p-2">{message.date}</td>
                            <td className="border border-gray-300 p-2">
                                <button className="bg-blue-500 text-white py-1 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center" onClick={openModal}>
                                답장
                                </button>
                                {isModalOpen && < Modal isOpen={isModalOpen} closeModal={closeModal} />}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* 새 쪽지 추가 버튼 */}
                    <button onClick={() => addMessage({ title: 'ㅇ11', nickname: 'ㅇ11', date: '2023-10-15' })}>
                        새 쪽지 추가
                    </button>
                </div>
                
            </div>
        </>
    );
}