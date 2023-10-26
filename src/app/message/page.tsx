"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';


type Update = {
    postid: string;
    sender: string;
    receiver: string;
    title: string;
    content: string;
    nickname: string;
    // date: string;
    create_date: Date;
}[];

export default function MessageList({params}: {params: {id: string}}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageList, setMessageList] = useState<any[]>([]);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    
    const id = params.id;


    useEffect(() => {
        const userEmail = (sessionStorage.getItem('loggedEmail')||""); 
        loadMessages(userEmail);
    }, []);

    async function loadMessages(userEmail: any) {
        const result= await fetch(`/api/message/${userEmail}`, {method: "GET"})
        .then(e => e.json())
        .catch((error) => {
            console.error('서버 요청 실패', error);
        });
        setMessageList(result)
        // console.log("메시지 결과: ", result );
    }
    
    // useEffect(() => {
    //     async function messageDelete(id: any){
    //         const messageDelete = await fetch(`/api/messageList/${id}`, {
    //         method: "DELETE",
    //         })
    //         .then(data => data.json())
    //         .catch((error) => {
    //         console.error('서버 요청 실패', error);
    //         });
    //         setDeleteMessage(messageDelete)
    //     }
    //     console.log("messageDelete: ", messageDelete);
    //     messageDelete(id);
    //     // messageDelete(id); // 호출
    //     }, []); 

        // async function messageDelete(id: any){
        //     const messageDelete = await fetch(`/api/messageList/${id}`, {
        //     method: "DELETE",
        //     })
        //     .then(data => data.json())
        //     .catch((error) => {
        //     console.error('서버 요청 실패', error);
        //     });
        //     setDeleteMessage(messageDelete)
        // }

    function handleDeleteClick(id: string) {
        fetch(`/api/messageList/${id}`, {
            method: "DELETE",
        })
        // .then(e => e.json())
        .then(response => {
            if (response.status === 200) {
                console.log("메시지 삭제 대성공");
                // loadMessages(id); 
                window.location.reload();
                // location.href = '/';
            } else {
                // 삭제가 실패한 경우 에러 처리
                console.error('메시지 삭제 실패');
            }
        })
        .catch((error) => {
            console.error('서버 요청 실패', error);
        });
    }


    function MessageListPage(){ 

        // 날짜 형식을 변환하는 함수
        function formatDateTime(isoDateString: any) {
            const date = new Date(isoDateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
        }

        return (
            <>
                <div className="mx-48 p-4 ">
                    {/* <div>
                        <button className="btn_action w-auto text-2xl font-bold mb-4 bg-orange-600 text-white px-4 py-4 rounded-lg hover:bg-red-300 " onClick={openModal}>
                            쪽지보내기(이건 입찰하기버튼 아래 넣을건데 여기에 일단 띄움)
                        </button>
                        {isModalOpen && < ReceiveModal isOpen={isModalOpen} closeModal={closeModal} />}
                    </div> */}
                    <h2 className='text-3xl font-bold text-center mb-20 text-gray-800'>쪽지 내역</h2>
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
                            {messageList.map((messageData: any, index: number) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">
                                        <a href= {`/message/${messageData.message.id}`} >
                                            
                                            {messageData.message.title}
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 p-2">{messageData.sendernickname}</td>
                                    <td className="border border-gray-300 p-2">{formatDateTime(messageData.message.create_date)}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button className=" text-white rounded-md " onClick={() => handleDeleteClick(messageData.message.id)}>
                                            <TrashIcon className='h-12 text-gray-400 hover:text-gray-600  '/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* 새 쪽지 추가 버튼 */}
                        {/* <button onClick={addMessage}>
                            새 쪽지 추가
                        </button> */}
                    </div>
                    
                </div>
            </>
        );
    }
    return (
        <> 
            {messageList == undefined ? <div className="text-center text-5xl"> 데이터 로딩중입니다</div>:<MessageListPage/>}
        </>
    )
}