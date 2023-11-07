"use client"

import React, { FormEvent, useState ,ChangeEvent} from 'react';
import DaumPostcode from 'react-daum-postcode';
import { usePathname, useRouter } from 'next/navigation'; //13버전부터는 navigation을 사용해야함

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '', 
    phoneNum: '',
    confirmPassword: '',
    detailAddress: '',
    nickName:'',
    bio:'',
  });

  const [message, setMessage] = useState("");

  const router = useRouter();

  async function onSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const address = formData.address;
    const phoneNum = formData.phoneNum;
    const nickName = formData.nickName;
    const bio = formData.bio;

    const phoneNumValue = parseFloat(formData.phoneNum); // 숫자 유효성 검사

    formData.address = formData.address + ' ' + formData.detailAddress;

    if (isNaN(phoneNumValue)) {
      alert("숫자 형태로 입력해주세요!");
      return;
    }

    if (formData.phoneNum.startsWith("-")) {
      alert("음수 값은 입력할 수 없습니다.");
      return;
    }

    if (formData.phoneNum.length !== 11) {  
      alert("핸드폰 번호가 제대로 입력되지 않았습니다!")
      return;
    }

    if(formData.phoneNum.substring(0, 3) !== '010') {
      alert("앞에 3자리는 010으로 시작해주세요!")
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 8) {
      alert("비밀번호는 최소 8자 입력해주세요!")
      return;
    }
    
    // MongoDB로 가는 부분
    if(email && password && address && phoneNum && nickName && bio){
      try {
        //const f = new FormData(e.currentTarget);
        // f.append('bio',bio);
        // f.append('nickName',nickName);
        await fetch("/api/signup", {
          method: "POST",
          body: new FormData(e.currentTarget),
        })
        .then((response) => { 
          if (response.status === 200) {
            alert(`회원가입을 축하합니다! ${nickName} 님`);
            location.href='./';
          } else if (response.status === 404){
            alert(`이미 존재하는 아이디입니다.`);
            return;
          } else {
            alert(`새로고침한 다음에 다시 시도해주세요!`);
            return;
          }
        })
          .catch((error) => {
            console.error('POST 요청 실패:', error);                                                                                                     
          }).finally();
      } catch (error) {
        console.log(error)
      } 
    }
  }
  function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function bioInputChange(e : ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function addressSearch() {
    // Daum 우편번호 검색 API를 동적으로 불러오기
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = function () {
      // API가 로드된 후에 팝업 창 열기
      if (window.daum && window.daum.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data: any) {
            // 주소 선택 후 처리
            const selectedAddress = data.roadAddress || data.jibunAddress;
            setFormData({
              ...formData,
              address: selectedAddress,
              detailAddress: '', // 상세주소 초기화
            });
          },
        }).open();
      } else {
        console.error("Daum 우편번호 검색 API가 로드되지 않았습니다.");
      }
    };
  
    // 스크립트를 <head> 요소에 추가하여 API를 불러옵니다.
    document.head.appendChild(script);
  }

  return (
    <div className="max-w-xl mx-auto p-4 border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <hr className="my-4 border-t border-gray-300" />
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block mb-2">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder='이메일을 입력해주세요'
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="mb-4">
          <label className="block mb-2">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        {/* <div>
          <button type="button" onClick={addressSearch} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                주소검색
          </button>
        </div> */}
        <hr className="my-4 border-t border-gray-300" />
        <div className="mb-4">
          <div className='justify-between'>
            <label className="block mb-2">
              주소
              <button type="button" onClick={addressSearch} className="ml-[410px] mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                  주소검색
              </button>
            </label>
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            className="border rounded py-2 px-3 w-full"
            readOnly
          />
          <label className="block mt-2 mb-2">상세주소</label>
          <input
            type="text"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
          
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="mb-4">
          <label className="block mb-2">전화번호</label>
          <input
            type="text"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleInputChange}
            placeholder='숫자를 입력해주세요'
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="mb-4">
          <label className="block mb-2">닉네임</label>
          <input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="relative mb-14">
          <div>
            <label className="block mb-2">성별 선택</label>
            <select 
              name="bio" // 정보의 이름을 지정
              value={formData.bio} // 선택된 값은 formData의 bio 속성에 저장
              onChange={bioInputChange} // 선택이 변경되면 이벤트핸들러 호출
              className="block w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
              <option value="선택하기">선택하기</option>
              <option value="FEMALE">FEMALE</option>
              <option value="MALE">MALE</option> 
              <option value="TRANS">TRANS</option>
            </select>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className='flex justify-between'> 
          <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 ">
            가입하기
          </button>
        </div>
      </form>
      <div className="mt-4">{message}</div>
    </div>
  );
}
