'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Dropdown from "../../components/dropdown";

const backGroundStyle = {
  // backgroundImage: "url('/img/경매이미지.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat", // 이미지 반복 없음
};

export default function SellProduct() {
  const [category, setCategory] = useState('');
  const [categoryTag, setCategoryTag] = useState(''); // 카테고리 태그 상태
  const [sessionNickname, setSessionNickname] = useState('');
// 컴포넌트가 처음 로드될 때 실행
  useEffect(() => {
    // localStorage에서 nickname 가져오기
    const nickName = sessionStorage.getItem('loggedInMember'); // localStorage의 키 이름을 "nickName"으로 수정
    console.log(nickName);
    if (nickName) {
      // localStorage에 nickname이 있는 경우, 상태(State)에 설정하여 화면에 표시
      setSessionNickname(nickName);
    }
  }, []);

  // // 로그인 후 세션 스토리지에 이메일과 닉네임 저장
  // const handleLogin = () => {
  //   sessionStorage.setItem('email', email);
  //   sessionStorage.setItem('nickname', nickname);
  // };
  // const [email, setEmail] = useState('');

  useEffect(() => {
    // 서버로부터 닉네임 데이터를 가져오는 API 요청
    fetch('/api/signup') // 서버의 API 엔드포인트에 따라 수정 필요
      .then((response) => response.json())
      .then((data) => {
        // API 응답에서 가져온 닉네임을 상태에 설정
        setSessionNickname(data.nickname);
      })
      .catch((error) => {
        console.error('Error nickname:', error);
      });
  
    // const nickname = "신용빈";
    // window.sessionStorage.setItem("nickname", nickname);
    // const sessionNickname = sessionStorage.getItem("nickname");
    // if (sessionNickname) {
    //   setSessionNickname(sessionNickname || '');
    // }
  }, []);
  

  // 클라이언트에서 카테고리 선택 시 category 상태 업데이트
  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  
  // 입력 필드의 값이 변경될 때 호출되는 함수
  function handleCategoryTagChange(e:ChangeEvent<HTMLInputElement>){
    setCategoryTag(e.target.value);
  }

 

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();


    try {
      const f = new FormData(event.currentTarget)
      const send = await fetch('http://localhost:3000/api/sell',{
        method: 'POST',
        body : f
      }).then((res) =>{
        //성공시 처리 
          if(res.status == 200)
            window.location.href= '/' //Home 으로 이동 
            //alert("Message : " +200)
            console.log(res);
      }).catch((e) => {throw e}).finally()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <div style={backGroundStyle}>
        <div className="mx-[10%]">
          <div className="tab-bar">
            <div className="tab">
              <span className="tab_hi">경매 올리기</span>
            </div>
          </div>
          <div className='mx-[10%]'>
            <div className="border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    닉네임
                  </label>
                  <div className="mt-2 w-[448px]">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                    <input
                      type="text"
                      name="email" 
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      // onChange={handleEmailChange} // 입력 필드 값이 변경될 때 호출되는 함수
                      // defaultValue={sessionNickname}
                      defaultValue={sessionNickname}// 입력 필드의 값은 상태(State)에서 가져온다.
                      readOnly
                    />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    제목
                  </label>
                  <div className="mt-2 w-[448px]">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="제목"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
              </div>

              <div className="border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                  <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                      <option value="beauty">패션/뷰티</option>
                      <option value="hobby">취미/키덜트</option>
                      <option value="digital">디지털/가구/가전</option>
                      <option value="sport">스포츠</option>
                      <option value="car">자동차</option>
                      <option value="etc">기타</option>
                  </select>
                </div>
              </div>

                <div className="mt-4">
                  <label htmlFor="categoryTag" className="block text-sm font-medium leading-6 text-gray-900">
                    카테고리 태그 입력:
                  </label>
                  <input
                    type="text"
                    id="categoryTag"
                    name="categoryname"
                    value={categoryTag}
                    onChange={handleCategoryTagChange}
                    placeholder="카테고리 태그를 입력하세요"
                    className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                  <div className="sm:col-span-3">
                    <label htmlFor="start-price" className="block text-lg font-medium leading-6 text-gray-900">
                      시작 가격
                    </label>
                    <input
                      type="text"
                      id="start-price"
                      name="price"
                      placeholder="가격을 입력해 주세요"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    상품 설명
                  </label>
                  <textarea
                    id="description"
                    name="content"
                    rows={3}
                    placeholder="내용을 입력해 주세요"
                    className="block w-full rounded-md border-0 py-1.5 h-[80px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    defaultValue={''}
                  />
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {/* <button
                    type="submit"
                    className="rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    작성 완료
                  </button> */}
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}