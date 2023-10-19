"use client"

import React, { useState, useEffect } from 'react';
import ImageViewer from '../_components/detailImg';

import BottomList from '../_components/bottomlist';
import Modal from '@/app/message/_components/modal';

export default function Detail( query:{params:any}  ) {
  
  const [newComment, setNewComment] = useState(''); // Comment 타입 사용
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen , setIsOpen] = useState(false);
  const [postData, setPostData] = useState<any>({});
  const [nick,setNick] = useState<string>("")

  let id = query.params.id;

  // console.log("id값:",id);  //두번씩찍힘
  
  useEffect(() => { // id값만 넘어온다
    getData(id);
  }, []);
  useEffect(() => {
      console.log(postData)
  }, [postData]);

  // 왜 두번씩실행되고 첫번째 실행된 데이터는 없고 두번쨰실행됬을때만 데이터가 담겨있음
  
  
  async function getData(id: any) // 서버로 id값을 가지고 요청하는 로직
  {
    const detailData=await fetch(`/api/finddetail/${id}`)
    .then((data) => data.json())
    .then((data) => {
      return data.result;
    })
    .catch((error) => {
      console.error('서버 요청실패', error);
    });
    console.log(detailData);
    setNick(detailData[1].nickname)
    setPostData(detailData[0]);
  }
  

  const openModal = () => {
    
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  function Main() {
    return (
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* 그리드 레이아웃 */}
      <div className="mx-auto flex flex-col lg:flex-row lg:max-w-7xl lg:px-8">

        {/* 이미지 */}
        <ImageViewer id={id}/> {/* props를 ImageViewer로 넘겨줌 */}

        {/* <div className="lg:w-1/2">
          <div className="p-12 lg:sticky lg:top-4 lg:overflow-hidden">
            <img src='back.png'></img>
    
          </div>
        </div>  */}
    
        {/* 오른쪽 컨텐츠 */}
        <div className="lg:w-1/2">
          <div className="lg:pl-4">
            <div className="lg:max-w-lg">
            {/* 섹션 제목 */} 

            <div key={postData.id} className="group">     
              <p className="text-base font-semibold leading-7 text-indigo-600">판매자:{nick}</p>
              {/* 메인 제목 */}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> 제목: {postData.post.title} </h1>
              {/* 본문 텍스트 */}
              {/* <p className="mt-6 text-xl leading-8 text-gray-700">시작가: {postData.starting_price} 원</p>
              <p>여기에 뭘 넣으면 좋을까</p> */}
              {/* 목록 */}
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">입찰건수: Bid Count</strong> 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">남은시간: Time Remaining</strong> 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">시작가: {postData.post.starting_price}원</strong> 
                  </span>
                </li>
              </ul>
              <div className="flex justify-center mt-4">
                <button className="btn_action w-[500px] bg-zinc-950 text-white px-4 py-4 rounded-lg hover:bg-zinc-800" onClick={openModal}>
                  입찰하기
                  {/* <Modal></Modal> */}
                </button>
                {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} />}
                {/* isOpen, closeModal는 <Modal> 컴포넌트의 prop(속성) 중 하나이다. 이 prop은 모달 창이 열려 있는지 닫혀 있는지를 나타내는 값을 받는다. */}
                {/* 여기서는 isModalOpen 변수의 값을 전달하여 모달을 열거나 닫는다 */}
              </div>
              <div className="flex justify-center mt-4">
                <button className="w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg hover:bg-zinc-300">
                  찜하기
                </button>
                <div>
            <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>입찰하기</button>
            {/* <Bidding postId= {'asdasd'} closeModal={closeModal} isOpen={isOpen}/> */}
            </div>
          </div>
        </div>
              {/* 추가 섹션 제목 */}
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">입찰시 주의사항</h2>  
              <p className="mt-6">약관의 동의하시오</p>
            </div>
          </div>
        </div>
       {/* 추가 섹션 본문 */}
      </div>
      <div className="product_detail_item_wrap detail_item flex justify-center items-center">
        <div className="detail_title_header_images">
          <div className="detail_header_logo_wrap">
            <p className="detail_header_logo_title"></p>
          </div>
          <div className="detail_img_wrap">
            <div className="detail_content_images open" style={{ maxHeight: '963px' }}>
              <div className="images">
              <div className='content text-center mt-32'>
                  <p>{postData.post.content}</p>
                </div>
                {/* <img
                  src={postData.post.imgFile}
                  loading="lazy"
                  alt="Product Image"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

    return(<>
      {postData == undefined? <div></div>:<Main/> }
      
    </>)
  }
  

