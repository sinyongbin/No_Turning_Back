"use client"

import React, { FormEvent, useEffect, useState } from 'react';

export default function User() {

    const [formData, setFormData] = useState({
        phoneNum: '',
        address: '',
        nickname:'',
    })

    const [passwordData, setPasswordData] = useState({
        password: '',
        ConfirmPassword: '',
    })

    useEffect (() => {
        const loggedEmail = sessionStorage.getItem('loggedEmail');

        try {
            fetch(`api/user/${loggedEmail}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            }).then(res=>res.json()).then(res =>{
                setFormData(res);
                console.log(res);
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

        if (passwordData.password !== passwordData.ConfirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

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

        const loggedEmail = sessionStorage.getItem('loggedEmail');
        let loggedInfo = sessionStorage.getItem('loggedInfo');

        try{
            const f = new FormData(e.currentTarget)
            const send = await fetch(`api/user/${loggedEmail}`, {
                method: "PUT",
                body: f,
            }).then((response) => {
                if (response.status !== 200) {
                    console.log(formData);
                } else {

                    loggedInfo = formData.nickname
                    sessionStorage.setItem('loggedInfo', loggedInfo);

                    alert(`닉네임이 ${formData.nickname}으로 성공적으로 변경되었습니다`);
                    location.href='user'
                    
                }
            }).catch((e) => {throw e}).finally()
        } catch(error) {
            console.log('UPDATE 요청 실패!:', error)
        }

    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">회원정보</h2>
            
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
                <div className='mb-4'>
                    <label className="block mb-2">전화번호</label>
                    <input
                        type="text"
                        name="phoneNum"
                        value={formData.phoneNum}
                        onChange={handleInputChange}
                        className="border rounded py-2 px-3 w-full"
                    />
                </div>
                <div className='mb-4'>
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
        </div>
    );
}