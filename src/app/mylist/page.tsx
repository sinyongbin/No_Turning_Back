'use client'

import React from 'react'; // React를 import 해야 합니다.
import MyList from './_components/mylist';

export default function mypage() {
  return (
    <>
      <div className=''>
        <h2 className="text-2xl font-bold mb-4">회원정보</h2>
          <ul>
            <li>
              <a href="/user">회원정보</a>
            </li>
            <li>
              <a href='/mylist'>내가 쓴 글</a>
            </li>
            <li>
              <a href='/pay'>페이</a>
            </li>
          </ul>
      </div>
      {/* User 컴포넌트를 삽입합니다. */}
      <MyList />
    </>
  );
}