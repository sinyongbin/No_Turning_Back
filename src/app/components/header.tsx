"use client"

import Link from "next/link"

import { useState } from "react";
// import { MyModal } from "./Login/MyModal";



export default function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleLogin = () => {
        // 로그인 로직을 처리한 후에 로그인 상태를 설정합니다.
        // 실제 로그인이 성공하면 isLoggedIn을 true로 설정하세요.
        setIsLoggedIn(true);
        closeModal(); // 모달을 닫습니다.
    };
    
    const handleLogout = () => {
        // 로그아웃 로직을 처리한 후에 로그아웃 상태를 설정합니다.
        // isLoggedIn을 false로 설정하거나 필요에 따라 세션 등을 지우세요.
        setIsLoggedIn(false);
    };
    
    return (
        <>  
            <div className="header_top">
                
                <div className="top_inner">
                    <ul className="top_list">
                        <li className="top_item">
                            <a href="/sell" className="top_link">물품등록</a>
                        </li>
                        <li className="top_item">
                            <a href="/notice" className="top_link">신고</a>
                        </li>
                        {/* <li className="top_item">
                            {isLoggedIn ? (
                                <button className="top_link" onClick={handleLogout}>
                                로그아웃
                                </button>
                            ) : (
                                <button className="top_link" onClick={openModal}>
                                로그인
                                </button>
                            )}
                            {isModalOpen && (
                                <MyModal isOpen={isModalOpen} closeModal={closeModal} onLogin={handleLogin} />
                            )}
                        </li> */}
                        {/* <li className="top_item">
                            <button className="top_link" onClick={openModal}>
                                로그인
                            </button>
                            {isModalOpen && <MyModal isOpen={isModalOpen} closeModal={closeModal} />} {/* MyModal 컴포넌트를 열려면 isOpen 상태를 사용합니다. */}
                            {/* <a href="" className="top_link">로그인</a> */}
                        {/* </li> */}
                        <li className="top_item">
                            <a href="/saved" className="top_link">회원가입</a>
                        </li>
                        <li className="top_item">
                            <a href="#notifications" className="top_link">마이페이지</a>
                        </li>
                    </ul>   
                </div>
            </div>
            <div className='text-6xl text-center h-50 w-50 flex items-center justify-center'>
                <a href="/">
                    <img src="img/3.png" className="mx-auto my-auto" alt="" />
                </a>
            </div>

        </>
    );
}


