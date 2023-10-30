"use client"

import React, { ChangeEvent, useEffect, useState } from 'react';
import MyModal from '@/app/components/PayJoin/MyModal';
import { stringify } from 'querystring';

export default function Pay() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        balance: '',
        deposit: '',
        Withdraw: '',
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        location.href = '/' //모달창 바깥 눌렀을 때 쓰는 용도
    }

    useEffect(() => {
        const loggedInfo = sessionStorage.getItem('loggedEmail');
        
        try {
            fetch(`http://localhost:8080/jinddoPay/create/${loggedInfo}`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                }
            }).then(res => {

                if (res.status === 204) {
                    console.log("서버로부터 받은 데이터는 null입니다.");
                    // 데이터가 null인 경우에 대한 처리를 추가
                    return null;
                } else if(res.status==500) {
                    console.log("서버로부터 받은 데이터는 오라클 오류입니다.");
                }else {
                    return res.json(); // JSON 응답을 파싱
                }
            })
            .then(data => {
                console.log('백에서 가져온 값:', data);
                if(data==null){
                    alert("진또페이를 사용해주세요!");
                    openModal();
                }else{
                    console.log('백에서 받아오는 잔액:', data.balance);
                    setFormData({...formData,balance:data.balance});
                    return;
                }
            });
        } catch (error) {
            alert("진또페이를 사용해주세요!");
            openModal();
        }
        
        // if (formData.balance == null && formData.balance == undefined && formData.balance == '') {
            
        // } 
    }, []);
    

    //입급 및 출금은 put 사용

    function Deposit () { //입급
        //e.preventDefault();

        const email = sessionStorage.getItem('loggedEmail');

        const depositValue = parseFloat(formData.deposit); // 입력 값을 숫자로 변환

        if (isNaN(depositValue)) {
            alert("숫자 형태로 입력해주세요!");
            location.href = '/pay';
            return;
        }

        if (confirm("정말로 입금하실래요?")) {
            const updatedFormData = {
                ...formData, // 기존 formData 내용을 그대로 유지
                email: email // email 필드 추가
            };
            console.log(updatedFormData);
            fetch(`http://localhost:8080/jinddoPay/charge/${depositValue}`, {
                method: "PUT",
                body: JSON.stringify(updatedFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    alert(`${formData.deposit}원이 입급되었습니다, 현재 잔액은 ${parseInt(formData.deposit) + parseInt(formData.balance)}원 입니다`);
                    location.href='/pay';
                    return;
                } else {
                    alert('입급에 실패하였습니다. 다시 시도해주세요!');
                    location.href='/pay';
                    return;
                }
            }).catch((error) => {
                alert('잠시 후 다시 시도해주세요');
            })
        }
    }

    function Withdraw () { //출금
        //e.preventDefault();

        const email = sessionStorage.getItem('loggedEmail');

        const WithdrawValue = -parseFloat(formData.Withdraw); // 입력 값을 숫자로 변환

        if (isNaN(WithdrawValue)) { // 주어진 값이 숫자가 아닌경우 true
            alert("숫자 형태로 입력해주세요!");
            location.href = '/pay';
            return;
        }

        const valueCheck = parseInt(formData.balance) - parseInt(formData.Withdraw) //잔고 체크 용도

        if (valueCheck < 0) {
            alert("잔고가 부족합니다. 잔고를 확인해주세요!");
            location.href = '/pay';
            return;
        }
        if(confirm("정말로 출금하실래요?")) {
            const updatedFormData = {
                ...formData,
                email: email // email 필드 추가
            };
            fetch(`http://localhost:8080/jinddoPay/charge/${WithdrawValue}`, {
                
                method: "PUT",
                body: JSON.stringify(updatedFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    alert(`${formData.Withdraw}원이 출금되었습니다 현재 잔액은 ${valueCheck}원 입니다`)
                    location.href='/pay'
                    return
                } else {
                    alert('출금에 실패하였습니다. 다시 시도해주세요!')
                    location.href='/pay'
                    return
                }
            }).catch((error) => {
                alert('잠시 후 다시 시도해주세요');
            })
        }

    }

    function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="flex flex-col justify-between items-center p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">진도페이</h2>
            <div className="w-1/3">
                <div className="bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-2">입금</h2>
                    <input
                        type='text'
                        name='deposit'
                        defaultValue={formData.deposit}
                        onChange={handleInputChange}
                        className='border rounded py-2 px-3 w-full mb-3'
                    />
                    <button
                        type='button'
                        onClick={Deposit}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">입금하기</button>
                </div>
            </div>
            <div className="w-1/3">
                <div className="bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-2">출금</h2>
                    <input
                        type='text'
                        name='Withdraw'
                        defaultValue={formData.Withdraw}
                        onChange={handleInputChange}
                        className='border rounded py-2 px-3 w-full mb-3'
                    />
                    <button
                        type='button'
                        onClick={Withdraw}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">출금하기</button>
                </div>
            </div>
            <div className="w-1/3">
                <div className="bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-2">잔액</h2>
                    <input
                        type="text" 
                        name="balance"
                        defaultValue={formData.balance} readOnly
                        className="border rounded py-2 px-3 w-full"
                    />
                </div> 
            </div>

            <MyModal isOpen={isModalOpen} closeModal={closeModal}>
            </MyModal>
        </div>
    );
}




