"use client";

import React, { useState, useEffect } from 'react';
import ImageViewer from '../_components/detailImg';
import DetailModal from '@/app/message/_components/modal';
import Bidding from '@/app/transaction/components/bidding';

export default function Detail({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState(''); // Comment 타입 사용
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState<any>({});
  const [nick, setNick] = useState<string>("");

  const id = params.id;

  useEffect(() => {
    getData(id);
  }, []);

  useEffect(() => {

  }, [postData]);

  async function getData(id: any) {
    const detailData = await fetch(`/api/finddetail/${id}`)
      .then((data) => data.json())
      .then((data) => {
        return data.result;
      })
      .catch((error) => {
        console.error('서버 요청 실패', error);
      });

    console.log(detailData);
    setNick(detailData[1].nickname);
    setPostData(detailData[0]);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {

    setIsOpen(false);
  };

  function Main() {
    return (
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto flex flex-col lg:flex-row lg:max-w-7xl lg:px-8">
          <ImageViewer id={id} />

          <div className="lg:w-1/2">
            <div className="lg:pl-4">
              <div className="lg:max-w-lg">
                <div key={postData.id} className="group">
                  <p className="text-base font-semibold leading-7 text-indigo-600">판매자: {nick}</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    제목: {postData.post.title}
                  </h1>

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
                        <strong className="font-semibold text-gray-900">
                          시작가: {postData.post.starting_price}원
                        </strong>
                      </span>
                    </li>
                  </ul>
                  <div>
                    <button className="bg-black w-[500px] border-2 text-white px-4 py-4 rounded-lg hover:bg-zinc-700" onClick={()=>setIsOpen(true)}>
                      입찰하기
                    </button>
                    <Bidding postId= {id} closeModal={closeModal} isOpen={isOpen}/>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg hover:bg-zinc-300"
                      onClick={openModal}
                    >
                      문의하기
                    </button>
                    {isModalOpen && <></>/*<DetailModal id={id} isOpen={} closeModal={} nickname={nick} />*/}   
                  </div>
                </div>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">입찰시 주의사항</h2>
                <p className="mt-6">약관의 동의하시오</p>
              </div>
            </div>
          </div>
        </div>
        <div className="product_detail_item_wrap detail_item flex justify-center items-center">
          <div className="detail_title_header_images">
            <div className="detail_header_logo_wrap">
              <p className="detail_header_logo_title"></p>
            </div>
            <div className="detail_img_wrap">
              <div className="detail_content_images open" style={{ maxHeight: '963px' }}>
                <div className="images">
                  <div className='content text-center mt-32 text-5xl'>
                    <p>{postData.post.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {postData.post == undefined ? <div></div> : <Main />}
    </>
  );
}