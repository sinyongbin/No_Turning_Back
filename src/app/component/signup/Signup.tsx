"use client"

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './Signup.css'; // 스타일 파일 추가

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '', // 변경: 주소 필드 이름 변경
    phoneNum: '',
    verificationCode: '', 
    confirmPassword: '',
    detailAddress: '',
  });

  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const address = formData.address;
    const phoneNum = formData.phoneNum;

    formData.address = address + ' ' + formData.detailAddress;

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (email && password && address && phoneNum) {
      fetch("/member/member_join", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => { 
        if (response.status !== 200) {
          throw new Error('서버 응답이 실패했습니다. 상태 코드: ' + response.status);
        } else {
          alert(`회원가입을 축하합니다! ${email} 님`);
        }
      })
        .catch((error) => {
          console.error('POST 요청 실패:', error);                                                                                                     
        });
      console.log('회원가입 데이터:', formData);
    } else {
      alert('입력칸을 전부 입력해주세요!');
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function codeCheck() {
    // 사용자가 입력한 인증 코드
    const userVerificationCode = formData.verificationCode;
    
    // 서버에서 받은 인증 코드 (예: 서버에서 저장한 코드를 변수에 할당)
    const serverVerificationCode = '여기에_서버에서_받은_인증_코드_입력';
  
    if (!userVerificationCode) {
      alert('인증코드를 입력하세요!');
      return;
    }
  
    // 사용자가 입력한 인증 코드와 서버에서 받은 인증 코드를 비교
    if (userVerificationCode === serverVerificationCode) {
      alert('인증코드가 일치합니다. 회원가입을 완료하세요!');
    } else {
      alert('인증코드가 일치하지 않습니다. 다시 확인하세요.');
    }
  }

  function addressSearch() {
    // Daum 우편번호 검색 API를 동적으로 불러오기
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = function () {
      // API가 로드된 후에 팝업 창 열기
      if (window.daum && window.daum.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data) {
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
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>이메일</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label>상세주소</label>
          <input
            type="text"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleInputChange}
          />
          <button type="button" onClick={addressSearch}>주소검색</button>
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="tel"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
      <div>{message}</div>
    </div>
  );
}
