
import React, { ChangeEvent, useEffect, useState } from 'react';
import MyModal from '@/app/components/PayJoin/MyModal';

export default function Pay() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        balance: '1000',
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

    //페이 index 버튼
    
    //잔액 표시는 get 사용 //실제 연결 전까지 404 뜨니까 상관 x

    //가입 여부 확인은 balance 확인 
    
    //null && undefinde && ''이면 진또페이 값이 없다고 판단하여 접근 x 및 Modal 창을 통해서 가입 유도

    useEffect(() => {
        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');
        
        if (formData.balance !== null && formData.balance !== undefined && formData.balance !== '') {
            try {
                fetch(`/${loggedInfo.email}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(res => {
                    // 데이터를 가져온 후의 로직 (추가 로직을 여기에 추가하세요)
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("진또페이를 사용해주세요!");
            openModal();
        }
    }, []);
    

    //입급 및 출금은 put 사용

    function Deposit () { //입급
        //e.preventDefault();

        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

        const depositValue = parseFloat(formData.deposit); // 입력 값을 숫자로 변환

        if (isNaN(depositValue)) {
            alert("숫자 형태로 입력해주세요!");
            location.href = '/pay';
            return;
        }

        if (confirm("정말로 입급하실래요?")) {
            fetch(`/${loggedInfo.email}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.status == 200) {
                    alert(`${formData.deposit}원이 입급되었습니다, 현재 잔액은 ${formData.deposit + formData.balance}원 입니다`)
                    location.href='/pay'
                } else {
                    //alert('입급에 실패하였습니다. 다시 시도해주세요!')
                    alert(`${formData.deposit}원이 입급되었습니다, 현재 잔액은 ${parseInt(formData.deposit) + parseInt(formData.balance)}원 입니다`)
                    //테스트용 잔액 조절
                    
                }
            }).catch((error) => {
                alert('잠시 후 다시 시도해주세요');
            })
        }
    }
    
    function Withdraw () { //출금
        //e.preventDefault();

        const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

        const WithdrawValue = parseFloat(formData.Withdraw); // 입력 값을 숫자로 변환

        if (isNaN(WithdrawValue)) {
            alert("숫자 형태로 입력해주세요!");
            location.href = '/pay';
            return;
        }
        fetch(`/${loggedInfo.email}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status == 200) {
                //alert(`${formData.Withdraw}원이 출금되었습니다 현재 잔액은 ${parseInt(formData.deposit) - parseInt(formData.balance)}원 입니다`)
                location.href='/pay'
            } else {
                //alert('출금에 실패하였습니다. 다시 시도해주세요!')
                alert(`${formData.Withdraw}원이 출금되었습니다 현재 잔액은 ${parseInt(formData.balance) - parseInt(formData.Withdraw)}원 입니다`)
            }
        }).catch((error) => {
            alert('잠시 후 다시 시도해주세요');
        })
    }

    function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="flex justify-between items-center p-4 space-x-4">
            <div className="w-1/3">
                <div className="bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-2">입금</h2>
                    <input
                        type='text'
                        name='deposit'
                        value={formData.deposit}
                        onChange={handleInputChange}
                        className='border rounded py-2 px-3 w-full'
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
                        value={formData.Withdraw}
                        onChange={handleInputChange}
                        className='border rounded py-2 px-3 w-full'
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
                        value={formData.balance}
                        className="border rounded py-2 px-3 w-full"
                    />
                </div> 
            </div>

            <MyModal isOpen={isModalOpen} closeModal={closeModal}>
            </MyModal>
        </div>
    );
}

