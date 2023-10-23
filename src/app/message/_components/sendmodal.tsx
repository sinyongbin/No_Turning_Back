/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState,FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#__next'); // 웹 접근성을 지원하는 기능을 사용할 때 필요한 설정

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        border: 'none',
        padding: '20px',
        width: '30%', // 모달 창의 너비 조정
        maxWidth: '1000px', // 모달 창의 최대 너비 조정
        height: '60%',
    },
};


interface ModalProps {
    isModal2Open: boolean;
    id: string;
    nickname:string;
    closeModal2: () => void;
}


export default function SendModal({ isModal2Open, closeModal2, id, nickname }: ModalProps) {
    const [bidAmount, setBidAmount] = useState('');
    const [postData, setPostData] = useState<any>({});
    const [nick, setNick] = useState<string>("");

    const [formData, setFormData] = useState({
        email: '',
        title:'',
        content:'',
        nickName:'',
    
      });
      const [message, setMessage] = useState("");
    
      
      async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);

            const send = await fetch(`api/message`, {
                method: 'POST',
                body: data,
            });

            if (send.status === 200) {
                console.log('Message 보내기 성공');
               
            } else {
                console.log('Message 보내기 실패 ㅠ');
            }
        } catch (error) {
            console.log('서버요청 실패 :', error);
        }
    }

    function handleChangeChange(e : ChangeEvent<HTMLInputElement>) {
       closeModal2();
    }
    function handleAreaChange(e : ChangeEvent<HTMLTextAreaElement>) {
  
    }   
    return (
        <>
            <Modal
            isOpen={isModal2Open}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="문의하기"
            >
          <form onSubmit={onSubmit}>
            <div className="text-center">
                <h2 className=" font-semibold mb-4 mt-10"> 문의 </h2>
                <div className="grid-cols-1 gap-2">
                    <div className="flex flex-col mt-4">
                        <div className="flex items-center w-[480px]">
                            <div key={id=id}></div>
                            <h3 className="text-lg font-semibold whitespace-nowrap mr-5 ">판매자</h3>
                            <div
                                className="text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none">{nickname}
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col mt-4">
                        <div className="flex items-center">
                            <h3 className="text-lg font-semibold whitespace-nowrap mr-5">본인 닉네임</h3>
                            <span className="text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">50,000 원</span>
                        </div>
                    </div> */}
                    <div className="flex flex-col mt-4">
                        <div className="flex items-center ml-4">
                            <h3 className="text-lg font-semibold whitespace-nowrap mr-5">제목</h3>
                            <input type='text' className='text-xl w-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-300 text-center' placeholder='제목을 입력해주세요' ></input>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-2 mt-4">
                        <div className="flex items-center ml-4">
                        <h3 className="text-lg font-semibold whitespace-nowrap mr-5">내용</h3>
                        {/* <form onSubmit={handleSubmit}> */}
                            <textarea
                            rows={5}
                            // value={message}
                            // onChange={(e) => setBidAmount(e.target.value)}
                            className="w-[400px] px-3 py-2 text-3xl font-bold border border-gray-300 rounded-md focus:outline-none focus:border-gray-300 text-center"
                            placeholder='내용입력안하면 안됌'
                            />
                        {/* </form> */}
                    </div>
                    </div>
                    {/* <form onSubmit={handleSubmit}> */}
                        <div className="flex col-1 mt-12 ml-28 ">
                            <button
                            type="submit"
                            className="bg-black text-white rounded-md py-2 px-4 hover:bg-zinc-700 w-[150px] h-[50px]">
                            쪽지 보내기
                            </button>
                            <button
                            type="submit"
                            className="bg-black text-white rounded-md py-2 px-4 hover:bg-zinc w-[150px] h-[50px]" onClick={closeModal2}>
                            취소
                            </button>
                        </div>
                </div>
            </div>
            </form>
        </Modal>
        </> 
    )
}