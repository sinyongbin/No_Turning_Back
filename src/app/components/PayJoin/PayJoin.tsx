'use clinet'
import React, { FormEvent, FocusEvent, useState, useEffect, useRef, ChangeEvent} from 'react'

export default function PayJoin() {

  async function onSubmit(e:any) {
    const loggedInfo = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');

    try {
        fetch(`/${loggedInfo.email}`, 
        {method: 'GET'})
        .then((res)=>{
            if(res.status===200){
                alert(`진또페이의 세계에 오신걸 환영합니다`);
                location.href = '/';
            } else {
                alert(`다시 시도해주세요!`)
            }
        });
    } catch (error) {
        alert(`다시 시도해주세요!`)
    }
  }

  function Home(){
    location.href='/'
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='grid grid-flow-row auto-rows-5'>
          <div className="text-center">
            진또페이 사용할래요?
          </div>
          <div className="text-center">
            <button type="submit" 
            className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg w-full ">사용하기</button>
          </div>
          <div className="text-center">
            <button 
                type="button"
                onClick={Home}
                className="bg-blue-400 mt-2 text-white font-bold py-2 px-4 w-full rounded-lg ">다음에 사용할래요!</button>
          </div>
        </div>
      </form>
    </div>
  )
}
