/* eslint-disable @next/next/no-img-element */
"use client"

import Image from 'next/image'
import prisma from '@/db'

import { useState,useEffect } from 'react'


export default function MainList() {

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  
  useEffect(() => {
    // API 엔드포인트를 호출하여 데이터 가져오기
    fetch(`/api/mainList`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setVisibleProducts(data.slice(0, 8)); // 초기에 표시할 상품 설정
      })
      .catch((error) => console.error(error));
  }, []);



    const loadMoreProducts = () => {
      // "더 보기" 버튼을 클릭했을 때 실행되는 함수입니다.
      const currentLength = visibleProducts.length;
      const nextProducts = products.slice(currentLength, currentLength + 4);
  
      if (nextProducts.length > 0) {
        setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
      }
    };

    
      return (
        
        <div className="bg-white">
         <div className='mt-52'>
          <HomeMain/>
        </div> 
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
                  <p className="mt-1 text-lg font-medium text-gray-900">{e.starting_price}</p>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            {visibleProducts.length < products.length && (
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
                <span className="relative inline-block animate-ping">
                  JINDDOBAY 
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              </p>
              <div id="download-buttons" className="flex space-x-4">
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              <a href="#">둘러보기</a>
            </button>
          </div>
        </div>
      </div>
      )
}