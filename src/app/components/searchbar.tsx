"use client"
import { useState,useEffect } from "react";

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  
  
  
  const searchToggle = () => {
    setIsActive(!isActive);
    setSearchText('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      fetch(`/api/search?query=${encodeURIComponent(searchText)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('서버 응답:', data);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
        });
    } else {
      console.log('검색어가 비어 있습니다.');
    }
    alert(searchText);
  };
    return (
      <>
      
        {/* 검색바 */}
        <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
          <div className="input-holder">
            {/* isActive가 true일 때만 검색 입력창을 렌더링 */}
            {isActive && ( 
              <input
                type="text"
                className="search-input placeholder:text-cyan-50"
                placeholder="Search..."
                value={searchText}
                onChange={handleInputChange}/> )}
            <button className="search-icon" onClick={searchToggle}>
              <div className="center-icon"> {/* 아이콘을 중앙에 배치하기 위한 래퍼 요소 */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </button>
          </div>
          <span className="close" onClick={searchToggle}></span>
        </div>
      
      </>
    );
  }