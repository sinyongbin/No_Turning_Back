"use client"

import React, { useState, useEffect } from 'react';
import MyModal from './Login/MyModal';
import { redirect } from 'next/dist/server/api-utils';
import Swal from 'sweetalert2';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInNickName,setIsLoggedInNickName] = useState('');
  const [isLoggedBalance, setIsLoggedBalance] = useState<string | null>('');


  useEffect(() => { 
    const loggedIn = sessionStorage.getItem('loggedInfo');
    const BalanceState = sessionStorage.getItem('loggedBalanceState');
    if (loggedIn !== null && typeof loggedIn === 'string' && loggedIn.length > 0) {
      setIsLoggedIn(true);
      setIsLoggedInNickName(loggedIn);
      setIsLoggedBalance(BalanceState); // BalanceState == '계좌있음' or '계좌없음'
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // 로그아웃 시, isLoggedIn 상태를 변경하고 localStorage에서 제거
    setIsLoggedIn(false);
  
    sessionStorage.removeItem('loggedInfo');
    sessionStorage.removeItem('loggedEmail');
    sessionStorage.removeItem('loggedBalanceState');
    alert("로그아웃 되었습니다.");
    // window.location.reload();
    window.location.href= '/';
  };

  const handleLoginAlert = () => {
    Swal.fire({
      title: '로그인후 이용해주세요.',
      width: 600,
      padding: '3em',
      color: '#716add',
      // background: '#fff url(/img/simpson.gif)',
      // backdrop: `
      //   rgba(0,0,123,0.4)
      //   url("/img/runningcat.webp")
      //   left top
      //   no-repeat
      // `
    })
  };

  const handleLoginBalance = () => {
    Swal.fire({
      title: '진또페이 등록 후 이용해주세요.',
      width: 600,
      padding: '3em',
      color: '#716add',
      // background: '#fff url(/img/simpson.gif)',
      // backdrop: `
      //   rgba(0,0,123,0.4)
      //   url("/img/runningcat.webp")
      //   left top
      //   no-repeat
      // `
    })
  };


  return (
    <>
  
  <div className="header_top">
      <div className="top_inner">
        <ul className="top_list">
          <li className="top_item">
          {isLoggedIn ? (
            isLoggedBalance == '계좌있음' ? (
              <a href="/sell" className="top_link">
                물품등록
              </a>
            ) : (
              <button onClick={handleLoginBalance} className="top_link">
                물품등록
              </button>
            )
          ) : (
            <button onClick={handleLoginAlert} className="top_link">
              물품등록
            </button>
          )}
          </li>
          <li className="top_item">
            {isLoggedIn ? (
              <a href="/report" className="top_link">
                신고
              </a>
            ) : (
              <button onClick={handleLoginAlert} className="top_link">
                신고
              </button>
            )}
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

