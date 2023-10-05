"use client"

import React, { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '', // 변경: 주소 필드 이름 변경
    phoneNum: '',
  });

  const [message, setMessage] = useState("");

  const [code, setCode] = useState({
    verificationCode: '',
  })

  function onSubmit(e) {
    e.preventDefault();
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
      }
    })
      .catch((error) => {
        console.error('POST 요청 실패:', error);
      });
    console.log('회원가입 데이터:', formData);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function codeVerify() {
    // 이메일 주소 유효성 검사
    const email = formData.email;
    if (!email) {
      alert('이메일 주소를 입력하세요.');
      return;
    }
  
    // 서버로 이메일 주소를 보내서 인증 코드 발송 요청
    fetch("/mail/mail_send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // 폼 데이터로 보내도록 수정
      },
      body: `email=${encodeURIComponent(formData.email)}`, // 폼 데이터 형식으로 전송
    })    
      .then((response) => response.json())
      .then((json) => {
        if (json.SUCCESS_TEXT) {
          alert('이메일 인증 코드가 발송되었습니다.');
        } else {
          alert('이메일 인증 코드 발송 실패');
        }
      })
      .catch((error) => {
        console.error('POST 요청 실패:', error);
      });
  }
  

  function codeCheck() {
    // 인증코드 확인 로직 구현
    const verificationCode = code.verificationCode;
    if(!verificationCode) {
      alert('인증코드를 입력하세요!');
    }

    //보냈던 인증코드와 일치하는지 확인
  }

  function addressSearch() {
    // 주소검색 로직 구현
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
          <button type="button" onClick={codeVerify}>인증코드 발송</button>
        </div>
        <div>
          <label>인증코드 입력</label>
          <input
            type="text"
            name="verificationCode"
            value={code.verificationCode}
            onChange={handleInputChange}
          />
          <button type="button" onClick={codeCheck}>인증코드 확인</button>
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
            name="password"
            value={formData.password}
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
