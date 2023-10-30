"use client"
import { useEffect, useState } from 'react';
import ReceiveModal from '../_components/receivemodal';

export default function MessageForm({ params }: { params: { id: string } }) {
  const [receiveMessage, setReceiveMessage] = useState<any>(undefined);
  const [isModalOpen, setModalOpen] = useState(false);
  const [nick, setNick] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [postTitle, setPostTitle] = useState<any>([]); // 여기도 문제인듯

  const id = params.id;

  useEffect(() => {
    async function messageId(id: any) {
      const messageDetail = await fetch(`/api/messageList/${id}`, {
        method: "GET",
      })
        .then(data => data.json())
        .catch((error) => {
          console.error('서버 요청 실패', error);
        });
      setReceiveMessage(messageDetail[0]);
      setNick(messageDetail[0].sendernickname);
      setSender(messageDetail[0].message.sender);
    }
    messageId(id);
  }, []);


  // post에 요청해서 postTitle 가져오고 싶어서 만들어본 useEffect
  useEffect(() => {
    async function postId(id: any) {
      const postTitle = await fetch(`/api/finddetail/${id}`, {
        method: "GET",
        // body : JSON.stringify(jsonData),
        // headers:{
        //   // accepts : "application/json",
        //   'Content-Type': 'application/json',
        // }
      })
      .then(data => data.json())
      .then((data) => {
        console.log("data: ", data.result); // 배열의 0번째 인덱스인 post가 null로 찍힘
        return data.result;
      })
      .catch((error) => {
        console.error('서버 요청 실패', error);
      });
      setPostTitle(postTitle[0].post); 
      console.log("postTitle: ", postTitle);// 현재 안찍히는중
    }
    postId(id);
  }, []);
  


  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {receiveMessage == undefined ? (
        <div className="text-center text-5xl"> 데이터 로딩중입니다</div>
      ) : (
        <div className="bg-stone-200 px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          ></div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> 쪽지 내용 </h2>
            {/* {postTitle} */}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mx-[500px]">
            <div>
              <a href="/message">
                <div className="top-12 mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    ></path>
                  </svg>
                </div>
              </a>
              {/* <div className="sm:col-span-2">  
                
              </div> */}
            </div>
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  보낸 사람 이메일
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="sender"
                    value={receiveMessage.sendernickname}
                    className="block w-full rounded-md border-0 px-3.5 py-2 mb-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    readOnly
                  />
                </div>
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                  제목
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="title"
                    value={receiveMessage.message.title}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    readOnly
                  />
                </div>
              </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="content"
                  value={receiveMessage.message.content}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="mt-10 mx-[500px]">
            <button
              type="submit"
              className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={openModal}
            >
              답변하기
            </button>
            {isModalOpen && (
              <ReceiveModal isModalOpen={isModalOpen} closeModal={closeModal} id={id} nickname={nick} sender={sender} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
