"use client"
import { useState } from "react";
import { MyModal } from "./Login/MyModal";

export default function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추가

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        // 모달 창이 닫힐 때 로그인 상태를 체크하고 필요한 작업을 수행
        checkLoginStatus();
    };

    // 로그아웃 버튼을 클릭했을 때 호출되는 함수
    const handleLogout = () => {
        // 로그아웃 처리를 수행하는 코드 작성
        // 서버에 로그아웃 요청을 보낼 수도 있고, 클라이언트에서 세션 정보를 삭제할 수도 있습니다.
        // 로그아웃 처리 후, setIsLoggedIn(false)를 호출하여 로그아웃 상태로 변경
        setIsLoggedIn(false);
    };

    // 모달 창이 닫힐 때 호출되어 로그인 상태를 체크하고 필요한 작업을 수행하는 함수
    const checkLoginStatus = () => {
        // 서버에서 로그인 상태를 확인하거나 클라이언트 쿠키/세션을 확인하여
        // 로그인 상태를 갱신하는 작업을 수행합니다.
        // 예를 들어, 서버 API를 호출하여 로그인 상태를 확인하거나, 쿠키/세션을 삭제할 수 있습니다.
        // 로그인 상태에 따라 setIsLoggedIn을 호출하여 로그인 상태를 업데이트합니다.
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
                        <li className="top_item">
                            <button className="top_link" onClick={openModal}>
                                로그인
                            </button>
                            {isModalOpen && <MyModal isOpen={isModalOpen} closeModal={closeModal} />} {/* MyModal 컴포넌트를 열려면 isOpen 상태를 사용합니다. */}
                            {/* <a href="" className="top_link">로그인</a> */}
                        </li>
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

