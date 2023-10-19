"use client"

import React, { useState, useEffect } from 'react';
import MyModal from './Login/MyModal';
import { redirect } from 'next/dist/server/api-utils';



export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInNickName,setIsLoggedInNickName] = useState('');
  
  useEffect(() => { // 
    const loggedIn = sessionStorage.getItem('loggedInfo');
    if (loggedIn !== null && typeof loggedIn === 'string' && loggedIn.length > 0) {
      setIsLoggedIn(true);
      setIsLoggedInNickName(loggedIn);
    }
  }, []);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    // 로그인 성공 시, isLoggedIn 상태를 변경하고 localStorage에 저장
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 시, isLoggedIn 상태를 변경하고 localStorage에서 제거
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    sessionStorage.removeItem('loggedInfo');
    location.href='./';
  };

  return (
    <>
      <div className="header_top">
        <div className="top_inner">
          <ul className="top_list">
            <li className="top_item">
              <a href="/sell" className="top_link">
                물품등록
              </a>
            </li>
            <li className="top_item">
              <a href="/notice" className="top_link">
                신고
              </a>
            </li>
            {isLoggedIn ? (
              <li className="top_item">
                <a href="/user" className="top_link">
                  {loggedInNickName+'님'}    
                </a>   
              </li>
            ) : (  
              <li className="top_item">
                <a href='/signup' className="top_link">
                회원가입
                </a>
              </li>
            )}  
            {isLoggedIn ? (
              <li className="top_item">
                <button onClick={handleLogout} className="top_link">
                  로그아웃
                </button>
              </li>
            ) : (  
              <li className="top_item">
                <button onClick={openModal} className="top_link">
                  로그인
                </button>
              </li>
            )}  

          </ul>
        </div>
      </div>
      <div className="text-6xl text-center h-50 w-50 flex items-center justify-center">
        <a href="/">
          <img src="/img/3.png" className="mx-auto my-auto" alt="" />
        </a>
      </div>

      <MyModal isOpen={isModalOpen} closeModal={closeModal}>
      </MyModal>
    </>
  );
}

