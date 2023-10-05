"use client"

import React, { useEffect, useState } from 'react';

export default function Mypage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        ConfirmPassword: '',
    })

    const [getData, setGetData] = useState({
        phoneNum: '',
    })

    const [message, setMessage] = useState("");

    useEffect (() => {
        const email = "jinddo@naver.com"

        fetch(`/member/member_info/${email}`, {
            method: "GET"
        }).then(res=>res.json()).then(res=>{
            setGetData(res[0]);
            console.log(1, res);
        });
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setGetData({ ...getData, [name]: value });
    };

    function passwordChange(e) {
        const email = "jinddo@naver.com"
        e.preventDefault();
        fetch(`/member/member_info/${email}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('서버 응답이 실패했습니다.' + response.status);
            } else {
                alert(`${email}님의 비밀번호가 성공적으로 변경되었습니다`);
            }
        }).catch((error) => {
            console.log('UPDATE 요청 실패!:', error)
        })
    }

    return (
        <div>
            <h2>마이페이지</h2>
            <div>
                <label>비밀번호</label>
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <label>비밀번호 확인</label>
                <input 
                    type="password"
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={handleInputChange}
                />                
                <button type = "button" onClick={passwordChange}>비밀번호 변경</button>
            </div>
            <div>
                <label>전화번호</label>
                <input 
                    type="text"
                    name="phoneNum"
                    value={getData.phoneNum}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}