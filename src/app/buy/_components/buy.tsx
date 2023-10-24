"use client"

import React, { useState, useEffect } from 'react';

export default function Buy() {
    const loggedEmail = sessionStorage.getItem('loggedEmail');

    const [formData, setFormData] = useState({
        "post_id" : '', //post_id
        "maxEmail" : '', //구매자 이메일
        "buyernickname" : '', //구매자 닉네임
        "sellerEmail" : '', //판매자 이메일
        "sellernickname" : '', //판매자 닉네임
        "currentPrice": '', //낙찰가
        "title": '' //제목
    });

    //구매한 글 불러오기(useEffect)
    useEffect(()=>{
        buying()
    }, [])

    function buying() {
        
    }
    

    return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold mb-4">
        {} 경매 결과 : {} 원 낙찰
    </h2>
    <div className="bg-white p-4 rounded-lg shadow-md flex">
        <div className="w-1/2 pr-4">
        <div>
            <p className="mt-4 text-lg font-bold">구매자 정보:</p>
            <p>닉네임: {}</p>
            <p>이메일: {}</p>

            <button type="button" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">구매자 확인</button>
        </div>
        </div>
        <div className="w-1/2 pl-4">
        <div>
            <p className="mt-4 text-lg font-bold">판매자 정보:</p>
            <p>닉네임: {}</p>
            <p>이메일: {}</p>

            <button type="button" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">판매자 확인</button>
        </div>
        </div>
    </div>
    </div>

    );
}
