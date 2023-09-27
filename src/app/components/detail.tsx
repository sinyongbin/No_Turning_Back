"use client"
import React, { useState } from 'react';
import Modal from './modal';
import TemperatureForm from './trust';


export default function Detail() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };

    const [comments, setComments] = useState([
        {
          id: 1,
          text: '이것은 첫 번째 댓글입니다.',
          date: '2023-09-21',
        },
        {
          id: 2,
          text: '두 번째 댓글입니다.',
          date: '2023-09-22',
        },
    ]);

    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (newComment.trim() !== '') {
          const newId = comments.length + 1;
          const currentDate = new Date().toISOString().slice(0, 10);
          const newCommentObj = {
            id: newId,
            text: newComment,
            date: currentDate,
          };
          setComments([...comments, newCommentObj]); // 기존 comments + 새로 추가된 comment 합쳐서 배열로 생성!
          setNewComment('');
        }
    };

    //   여기는 판매자 정보와 이미지를 보여주는 폼
    return (
      <>  
        <div className='detail-listing'>      
          {/* <div className='detail-list-title'>제품보기</div> */}
          <div className="detail-content">
            <div className="item">
              <div className="img-list-detail w-10 h-auto">
                <img src="https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664" alt="아이템 사진들" />
              </div>
              <div className="item-info">
                <h2 >아이폰</h2>
                <p>판매자:snowman</p>
                <p>날짜:2023/09/21</p>
                <p>가격:200억 원</p>
                <p>입찰건수:1건</p>
                <p>남은시간:4시간</p>  
                <div className="button-container">
                    <div>
                        <button
                            onClick={openModal}
                            className="text-xl bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 "
                        >입찰버튼</button>
                        <Modal isOpen={modalIsOpen} closeModal={closeModal} />
                    </div>
                    <button className="bookmark-button">관심 상품 등록</button>
                    <TemperatureForm />
                </div>
              </div>
            </div>
            <div className='item-list'>
          
        {/* 여기서부터 사진들이랑 내용폼 */}
        <h1 className='title-sub' >제품 DETAIL</h1>
        <div className='show-item-list-wrap'>
          <ul className='row-items'>
            <li className=''>
              <div className='item-img'>
                <img
                  src='https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664'
                  alt='이미지 제목' />
              </div>
              <div className='item-details'>
              <a href='test' className='item-title-link'>오리</a>
                <div className='item-price'>10000원</div>
              </div>
            </li>
            <li className='product-item'>
              <div className='item-img'>
              <img
                  src='https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664'
                  alt='이미지 제목' />
              </div>
              <div className='item-details'>
              <a href='test' className='item-title-link'>오리</a>
                <div className='item-price'>20000원</div>
              </div>
            </li>

            <li className='product-item'>
              <div className='item-img'>
                <img
                  src='https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664'
                  alt='이미지 제목' />
              </div>
              <div className='item-details'>
              <a href='test' className='item-title-link'>오리</a>
                <div className='item-price'>10000원</div>
              </div>
            </li>
            <li className='product-item'>
              <div className='item-img'>
                <img
                  src='https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664'
                  alt='이미지 제목'/>
              </div>
              <div className='item-details'>
              <a href='/product/1' className='item-title-link'>오리</a>
                <div className='item-price'>20000원</div>
              </div>
            </li>

            <li className='product-item'>
              <div className='item-img'>
                <img
                  src='https://humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_02_200x.gif?v=9731706237138033921672885664'
                  alt='이미지 제목' />
              </div>
              <div className='item-details'>
                <a href='/product/3' className='item-title-link'>상품 3</a>
                <div className='item-price'>30000원</div>
              </div>
            </li>
            <li className='product-item'>
              <div className='item-img'>
                <img
                  src='//humanmade.jp/cdn/shop/t/93/assets/fliyng_duck_04_200x.gif?v=156872175563178358321672885665'
                  alt='이미지 제목'/>
              </div>
              <div className='item-details'>
                <a href='/product/4' className='item-title-link'>상품 4</a>
                <div className='item-price'>40000원</div>
              </div>
            </li>

            <div className="comment-form">
            <textarea placeholder="댓글을 입력하세요..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={addComment} className="comment-button">댓글 추가</button>
            </div>
            <div className="all-comment">
                {/* 여기서부터 댓글 폼 */}
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <div className="id-date">
                        <span className="comment-id">ID: {comment.id}</span>
                        <span className="comment-date">날짜: {comment.date}</span>
                        </div>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                    </div>
                        ))}
            
                        </div>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
