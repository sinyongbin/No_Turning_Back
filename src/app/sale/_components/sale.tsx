"use client"

import React, { useState, useEffect } from 'react';

export default function Buy() {
    const [products, setProducts] = useState([]);
    const [postData, setPostData] = useState<any>([]);
    const [Checked1, setChecked1] = useState(false);
    const [Checked2, setChecked2] = useState(false);
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
        saleCheck()
    }, [])

    async function saleCheck() {
        const loggedEmail = sessionStorage.getItem('loggedEmail');
        
        // 현재 URL을 가져옵니다.
        const currentURL = window.location.href;

        // URL을 '/' 문자로 분할합니다.
        const parts = currentURL.split('/');

        // 마지막 부분을 postid로 추출합니다.
        const postid = parts[parts.length - 1];

        await fetch(`/api/sale/${loggedEmail}`,{
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postid),
        })
        .then((e) => e.json())
        .then((e) => {
            setProducts(e);
            if(e[0].buyerCheck === true && e[0].sellerCheck === true) {
                setChecked1(true);
                setChecked2(true);
            } else if (e[0].buyerCheck === true) {
                setChecked1(true);
            }
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
            fetch(`/api/sale/${loggedEmail}`,{
                method:"PUT",
                body: JSON.stringify(postid),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res)=>res.json())
            .then((res)=>{
                if (res.status === true) {
                    alert("거래가 완료되었습니다!");
                    setChecked2(true);
                } else if (res.status === false){
                    alert("구매자가 체크하기를 기다리세요!");
                } else {
                    alert("잠시 후 다시 시도해주세요!");
                }
            }) 
        } catch (err) {
            console.log("오류:", err);
        }
    }

    function CheckOk() {
        alert("완료된 거래입니다!");
        return;
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
                        {Checked1? (
                            <div className="w-1/2 pr-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">구매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.maxEmail}</p>
                    
                                <button type="button" className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-blue-600">확인 완료</button>
                            </div>
                            </div>
                        ) : (
                            <div className="w-1/2 pr-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">구매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.maxEmail}</p>
                    
                                <button type="button" className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">구매자 확인</button>
                            </div>
                            </div>
                        )}
                        {Checked2? (
                            <div className="w-1/2 pl-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">판매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.sellerEmail}</p>
                    
                                <button type="button" onClick={CheckOk} className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-blue-600">거래 완료</button>
                            </div>
                            </div>                           
                        ):(
                            <div className="w-1/2 pl-4">
                            <div>
                                <p className="mt-4 text-lg font-bold">판매자 정보</p>
                                <p>닉네임: {}</p>
                                <p>이메일: {e.sellerEmail}</p>
                    
                                <button type="button" onClick={Check} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">판매자 확인</button>
                            </div>
                            </div>   
                        )}
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
