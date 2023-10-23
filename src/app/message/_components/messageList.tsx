"use client"

import { log } from 'console';
import React, { FormEvent, useEffect, useState } from 'react';
import Modal from './sendmodal';


type Update = {
    title: string;
    nickname: string;
    date: string;
  }[];

export default function MessageList() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Update>([]);

    // "새 쪽지 추가" 버튼을 클릭했을 때 호출되는 함수()
    const addMessage = () => {
        const newMessage = { title: '새 쪽지 제목', nickname: '새로운 보낸 사람', date: '날짜' };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
    };
    
    useEffect(() => {
        loadInitialMessages();
      }, []);
    
    // useEffect(() => {
    //     console.log(messages);
    // }, [messages]);

    async function loadInitialMessages() {
        const messageData = await fetch(`/api/message`, {method: "GET"})
        .then(e => e.json)
        .then((e) => {
            // setMessages(data);
            setIsLoading(false);
        })
        setTimeout(() => {
            // 예시 데이터를 추가합니다.
            const initialData = [
              { title: '쪽지 1', nickname: '발신자 1', date: '2023-10-15' },
            ];
            setMessages(initialData);
            setIsLoading(false);
          }, 1000);
        console.log(messageData)

    }

    // function handleInputChange(e: any) {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //     setPasswordData({ ...passwordData, [name]: value });
    // };

    // function passwordChange(e: any) {
    //     e.preventDefault();

    //     const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

    //     try{
    //         fetch(`/member/member_info/${loggedInfo.email}`, {
    //             method: "PUT",
    //             body: JSON.stringify(formData || passwordData),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }).then((response) => {
    //             if (response.status !== 200) {
    //                 console.log(formData || passwordData);
    //                 throw new Error('서버 응답이 실패했습니다.' + response.status);
    //             } else {
                    
    //                 alert(`${loggedInfo.nickname}님의 비밀번호가 성공적으로 변경되었습니다`);
    //                 location.href='user'
    //             }
    //         })
    //     } catch(error) {
    //         console.log('UPDATE 요청 실패!:', error)
    //     }
    // }

    // async function nicknameChange(e: FormEvent<HTMLFormElement>) { 

    //     e.preventDefault();

    //     const loggedIn = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

    //     try{
    //         const f = new FormData(e.currentTarget)
    //         const send = await fetch('http://localhost:3000/api/user', {
    //             method: "PUT",
    //             body: f 
    //         }).then((response) => {
    //             if (response.status !== 200) {
    //                 console.log(formData);
    //             } else {

    //                 loggedIn.nickname = formData.nickname
    //                 sessionStorage.setItem('loggedInMember', JSON.stringify(loggedIn));

    //                 console.log(sessionStorage);

    //                 alert(`닉네임이 ${formData.nickname}으로 성공적으로 변경되었습니다`);
    //                 location.href='user'
                    
    //             }
    //         }).catch((e) => {throw e}).finally()
    //     } catch(error) {
    //         console.log('UPDATE 요청 실패!:', error)
    //     }


    // }
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
                            <th className="border border-gray-300 p-2 w-1/12 ">삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                        {messages.map((message, index) => (
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
                        ))}
                        </tbody>
                    </table>
                    {/* 새 쪽지 추가 버튼 */}
                    <button onClick={addMessage}>
                        새 쪽지 추가
                    </button>
                </div>
                
            </div>
        </>
    );
}