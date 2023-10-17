"use client"

import React, { FormEvent, useEffect, useState } from 'react';

export default function MyPage() {

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
        const email = "sauos12345@gmail.com"
    
        fetch(`/member/member_info/${email}`, {
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
            fetch('http://localhost:3000/api/MyPage',{
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

        // const sessionData = sessionStorage.getItem('loggedInMember');
        // let email: string | null = null; // email 객체를 초기화합니다.
        // const nickname = formData.nickname

    
        // if (sessionData) {
        //     const loggedInData = JSON.parse(sessionData); // 세션 데이터 파싱
        //     email = loggedInData.email; // email 값을 추출합니다.
        //     console.log(email);
        // }

        const email = 'sauos12345@gmail.com'
        const nickname = formData.nickname

        try{
            fetch(`/member/member_info/${email}`, {
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
                    alert(`${nickname}님의 비밀번호가 성공적으로 변경되었습니다`);
                    location.href='MyPage'
                }
            })
        } catch(error) {
            console.log('UPDATE 요청 실패!:', error)
        }
    }

    async function nicknameChange(e: FormEvent<HTMLFormElement>) { 

        e.preventDefault();
        
        try{
            const f = new FormData(e.currentTarget)
            const send = await fetch('http://localhost:3000/api/MyPage', {
                method: "PUT",
                body: f 
            }).then((response) => {
                if (response.status !== 200) {
                    console.log(formData);
                } else {
                    alert(`닉네임이 ${formData.nickname}으로 성공적으로 변경되었습니다`);
                    location.href='MyPage'
                }
            }).catch((e) => {throw e}).finally()
        } catch(error) {
            console.log('UPDATE 요청 실패!:', error)
        }

    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">마이페이지</h2>
            <div className="mb-4">
                <label className="block mb-2">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handleInputChange}
                    className="border rounded py-2 px-3 w-full"
                />
                <label className="block mt-2 mb-2">비밀번호 확인</label>
                <input
                    type="password"
                    name="ConfirmPassword"
                    value={passwordData.ConfirmPassword}
                    onChange={handleInputChange}
                    className="border rounded py-2 px-3 w-full"
                />
                <button
                    type="button"
                    onClick={passwordChange}
                    className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    비밀번호 변경
                </button>
            </div>
            <form onSubmit={nicknameChange}>
                <div className="mb-4">
                    <label className="block mb-2">닉네임</label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        className="border rounded py-2 px-3 w-full"
                    />
                    <button
                        type="submit"
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        닉네임 변경
                    </button>
                </div>
            </form>
            <div className="mb-4">    
                <label className="block mb-2">전화번호</label>
                <input
                    type="text"
                    name="phoneNum"
                    value={formData.phoneNum}
                    onChange={handleInputChange}
                    className="border rounded py-2 px-3 w-full"
                />
                <label className="block mb-2">주소</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border rounded py-2 px-3 w-full"
                />
            </div>
        </div>
    );
}