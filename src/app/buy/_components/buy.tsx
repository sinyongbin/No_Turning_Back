"use client"

import React, { useState, useEffect } from 'react';

export default function Buy() {
    const [products, setProducts] = useState([]);
    const [postData, setPostData] = useState<any>([]);
    const [formData, setFormData] = useState({
        postId : '', //post_id
        maxEmail : '', //구매자 이메일
        //"buyernickname" : '', //구매자 닉네임
        sellerEmail : '', //판매자 이메일
        //"sellernickname" : '', //판매자 닉네임
        currentPrice: '', //낙찰가
        title: '' //제목
    });

    useEffect(()=>{
        buyCheck()
    }, [])

    async function buyCheck() {
        const loggedEmail = sessionStorage.getItem('loggedEmail');
        
        // 현재 URL을 가져옵니다.
        const currentURL = window.location.href;

        // URL을 '/' 문자로 분할합니다.
        const parts = currentURL.split('/');

        // 마지막 부분을 postid로 추출합니다.
        const postid = parts[parts.length - 1];

        await fetch(`/api/buy/${loggedEmail}`,{
            method:"POST",
            body: JSON.stringify(postid),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((e) => e.json())
        .then((e) => {
            setProducts(e);
        })
        .catch((error) => console.error(error));
    }

    function Check() {
        const loggedEmail = sessionStorage.getItem('loggedEmail');

        // 현재 URL을 가져옵니다.
        const currentURL = window.location.href;

        // URL을 '/' 문자로 분할합니다.
        const parts = currentURL.split('/');

        // 마지막 부분을 postid로 추출합니다.
        const postid = parts[parts.length - 1];

        try{
            fetch(`/api/buy/${loggedEmail}`,{
                method:"PUT",
                body: JSON.stringify(postid),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res)=>res.json())
            .then((res)=>{
                if (res.status === true) {
                    alert("성공적으로 체크되었습니다");
                    return;
                } else if (res.status === false){
                    alert("이미 체크되어 있어요!");
                } else {
                    alert("잠시 후 다시 시도해주세요!");
                }
            }) 
        } catch (err) {
            console.log("오류:", err);
        }
    }
    
    function ListDetailPage(){
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {products.map((e: any, key: number) => (
                    <div key={key}>
                        <h2 className="text-2xl font-bold mb-4">
                            {e.title} 경매 결과 : {e.currentPrice} 원 낙찰
                        </h2>
                        <div className="bg-white p-4 rounded-lg shadow-md flex">
                            <div className="w-1/2 pr-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">구매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.maxEmail}</p>
                    
                                <button type="button" onClick={Check} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">구매자 확인</button>
                            </div>
                            </div>
                            <div className="w-1/2 pl-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">판매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.sellerEmail}</p>
                    
                                <button type="button" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">판매자 확인</button>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        
            );
    }

    return (
        <>
            {postData == undefined ? <div>test</div> : <ListDetailPage/>}
        </>
    )
}
