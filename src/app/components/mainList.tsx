/* eslint-disable @next/next/no-img-element */
"use client"
import React, { Fragment, useState, useEffect } from 'react';

export default function MainList() {
  const [isActive, setIsActive] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  

  const searchToggle = () => {
    setIsActive(!isActive);
    setSearchText('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };


  const allData = () => {
    fetch('/api/serach')
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setVisibleProducts(data.slice(0, 8)); // 초기에 표시할 상품
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };
  
  useEffect(() => {
    allData();
  }, []); 


  // useEffect(() => {
  //   // API 엔드포인트를 호출하여 데이터 가져오기
  //   fetch('/api/serach')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // setProducts(data);
  //       setSearchResults(data);
  //       setVisibleProducts(data.slice(0, 8)); // 초기에 표시할 상품
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const handleSearch = () => {
    if (searchText.trim() !== '') {
        fetch(`/api/serach/${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    alert('그런 물품은 없어요 ㅠㅠ');
                } else {
                    setSearchResults(data);
                    setVisibleProducts(data.slice(0, 8)); 
                }
            })
            .catch((error) => {
                console.error('에러 발생:', error);
            });
    } else {
        alert('검색어를 입력하세요');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  const loadMoreProducts = () => {
    // "더 보기" 버튼을 클릭했을 때 실행되는 함수
    const currentLength = visibleProducts.length;
    const nextProducts = searchResults.slice(currentLength, currentLength + 4);
    if (nextProducts.length > 0) {
      setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    }
  };

  return (
      <div className="bg-white">
        <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
          <div className="input-holder">
              {isActive && (
                  <input
                      type="text"
                      className="search-input placeholder:text-cyan-50"
                      placeholder="제목,닉네임,카테고리이름까지 가능"
                      value={searchText}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                  />
              )}
              <button className="search-icon" onClick={searchToggle}>
                  <div className="center-icon">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 text-current"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                  </div>
              </button>
          </div>
          <span className="close" onClick={searchToggle}></span>
          {/* <div className="ml-10">
            <button className="search-submit-button" onClick={allData}>
              전체보기 버튼
            </button>
          </div> */}
            <button className="ml-10 px-4 py-2 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-indigo-300" onClick={allData}>
              전체보기 버튼 
            </button>
        </div>
        <div className='mt-10'>
          <div>
            {/* <HomeMain/> */}
          </div> 
        </div> 
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {searchResults.length > 0 && (
            <div className="bg-white">
                <div>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {visibleProducts.map((e: any, key: number) => (
                                <div key={key} className="product-item">
                                    <a href={`/listdetail/${e.id}`} className="group">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={e.images[0]}
                                                alt={e.imageAlt}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                style={{ width: '280px', height: '280px' }}
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{e.title}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {e.starting_price}
                                        </p>
                                    </a>
                                </div>
                            ))}
                            
                        </div>
                        <div className="text-center mt-4">
                          {visibleProducts.length < searchResults.length && (
                            <button
                              className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-2 rounded-lg animate-bounce"
                              onClick={loadMoreProducts}
                            >
                              더 보기
                            </button>
                          )}
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
    
  );
}
  

function HomeMain(){
      return(
        <div className="relative overflow-hidden bg-slate-300 h-[800px]">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                <img src='img/진또로고.png'></img>
                <div className='justify-center text-center items-center'>
                  <span className="relative inline-block ">
                    JINDDOBAY 
                  </span>
                </div>
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              </p>
              <div id="download-buttons" className="flex space-x-4 justify-center">
                <a
                  target="_blank"
                  className="flex items-center bg-blue-500 text-white text-sm md:text-base lg:text-lg px-3 py-2 rounded-full"
                  id="header-download-button-android"
                  href="https://play.google.com/store/apps/details?id=com.towneers.www"
                >
                  <img
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-2"
                    alt="Google Play"
                    src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/google-play-white-0531cab5dbe15262e226cfb4acebeb316708ae0034d50b86ad4d809a03b6f5f0.svg"
                  />
                  <span className="hidden md:inline">Google Play</span>
                </a>
                <a
                  target="_blank"
                  className="flex items-center bg-blue-500 text-white text-sm md:text-base lg:text-lg px-3 py-2 rounded-full"
                  id="header-download-button-ios"
                  href="https://apps.apple.com/app/id1018769995"
                >
                  <img
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-2"
                    alt="App Store"
                    src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/apple-store-white-9ebb10b431c549dd19f032f70e6762df307939b5add030265d9c2dea888b2d03.svg"
                  />
                  <span className="hidden md:inline">App Store</span>
                </a>
              </div>
            </div>
            <div>      
              <div className="absolute  sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-[400px] w-[600px] overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 ">
                      <img
                        src="img/back.png"
                        alt=""
                        className="h-full w-full object-cover object-center skew-y-3"
                      />
                    </div>
                    <img
                        src="img/back.png"
                        alt=""
                        className="h-full w-full object-cover object-center skew-x-6"
                      />
                  </div>
                  <img
                        src="img/back.png"
                        alt=""
                        className="h-full w-full object-cover object-center rotate-45"
                      />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}