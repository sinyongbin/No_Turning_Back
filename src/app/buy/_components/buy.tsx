"use client"

import React, { useState, useEffect } from 'react';

export default function Buy() {
    const [auctionResult, setAuctionResult] = useState({
        "buyeremail" : "String",
        "selleremail" : "String",
        "current_price": "String",
    }); 

    // // 경매 결과 데이터를 가져오는 함수 (예: API 호출)
    // useEffect(() => {
    //     // 경매 결과 데이터를 가져오는 비동기 함수를 호출하고, 데이터를 state에 설정
    //     async function fetchAuctionResult() {
    //         try {
    //             const response = await fetch(``);
    //             const data = await response.json();
    //             setAuctionResult(data);
    //         } catch (error) {
    //             console.error('경매 결과 데이터를 불러오는 중 오류가 발생했습니다.', error);
    //         }
    //     }

    //     fetchAuctionResult();
    // }, []);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold mb-4">결과</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                    <div>
                        <p className="text-lg font-bold">경매 결과:</p>
                        <p>{auctionResult.current_price}</p>
                        
                        <p className="mt-4 text-lg font-bold">구매자 정보:</p>
                        <p>이름: {}</p>
                        <p>이메일: {}</p>

                        <button type='button'
                        //onClick={Seller_Check}
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">구매자 확인</button>

                        <p className="mt-4 text-lg font-bold">판매자 정보:</p>
                        <p>이름: {}</p>
                        <p>이메일: {}</p>
                        
                        <button type='button'
                        //onClick={Seller_Check}
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">구매자 확인</button>
                    </div>
            </div>
        </div>
    );
}
