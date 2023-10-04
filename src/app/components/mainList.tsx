"use client"

import Image from 'next/image'
import prisma from '@/db'
import Link from "next/link"
import Paging from './paging'
import { useState } from 'react'


export default function MainList() {

    const [isActive, setIsActive] = useState(false);
    
    const products = [
      {
        id: 1,
        name: 'Earthen Bottle',
        href: '/listdetail',
        price: '$1148',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      },
      {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
      {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 5,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 6,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
        id: 7,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: '/img/경매이미지.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
    ]

  
    
    
    
    const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 4));


    const loadMoreProducts = () => {
      // "더 보기" 버튼을 클릭했을 때 실행되는 함수입니다.
      const currentLength = visibleProducts.length;
      const nextProducts = products.slice(currentLength, currentLength + 4);
  
      if (nextProducts.length > 0) {
        setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
      }
    };

    
    
    
      return (
        
        <div className="bg-white ">
            <HomeMain/>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

              {/* <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <a key={product.id} href={product.href} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                        style={{ width: '280px', height: '280px' }} // 이미지 크기 조정
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                  </a>
                ))}
              </div> */}

              {/* 상품 목록을 매핑하여 화면에 표시합니다. */}
              <div className="product-grid">
                <div className="grid grid-cols-4 gap-4">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="product-item">
                      {/* 상품 정보를 표시하는 코드를 추가하세요. */}
                      <a key={product.id} href={product.href} className="group">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                          style={{ width: '280px', height: '280px' }}
                        />
                        <h3>{product.name}</h3>
                      </a>
                      <p>{product.price}</p>
                    </div>
                  ))}
                </div>
                {/* "더 보기" 버튼을 추가하고 클릭 이벤트를 연결합니다. */}
                <div className="text-center mt-4">
                  {visibleProducts.length < products.length && (
                    <button className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-2 rounded-lg" onClick={loadMoreProducts}>
                      더 보기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
      )
    }

function HomeMain(){
      return(
        <>
        {/* <div id="rebranded-home-main-section-top" className="bg-yellow-100">
          <div id="home-main-top" className="p-6 ">
            <div className="home-main-desc">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 leading-tight mb-2">당신 근처의<br />지역 생활 커뮤니티</h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
                동네라서 가능한 모든 것<br />당근에서 가까운 이웃과 함께해요.
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
            <div className="home-main-image-top mt-4">
              <img
                srcSet="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/rebranded-image-top-e765d561ee9df7f5ab897f622b8b5a35aaa70314f734e097ea70e6c83bdd73f1.webp"
                className="w-[400px] h-[auto]"
                alt="중고거래, 동네생활 질문글, 알바와 동네가게"
              />
            </div>
          </div>
        </div>
 */}
        <div className="relative overflow-hidden bg-yellow-400 h-[800px]">
          <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between sm:max-w-lg">

                <div className="home-main-desc">
                <span className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 leading-tight mb-2">당신 근처의<br />지역 생활 커뮤니티</span>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
                  경매 라서 가능한 모든 것<br />진또베이에서 가까운 이웃과 함께해요.
                </p>
                <div id="download-buttons" className="flex space-x-4">

                  <div className='inline-block border border-transparent text-center font-medium'>
                    <Link href='/sell'>
                      <button className='p-3 bg-purple-200 text-rose-950 rounded-md cursor-pointer'>
                        상품판매
                      </button>
                    </Link>
                  </div>

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
                {/* <div className="mb-8 sm:mb-0 sm:mr-6 lg:mr-0 sm:max-w-lg">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    <span className="relative inline-block animate-bounce">
                      JINDDOBAY
                    </span>
                  </h1>
                  <p className="mt-4 text-xl text-gray-500"></p>
                  <div className='inline-block border border-transparent text-center font-medium'>
                    <Link href='/sell'>
                      <button className='p-3 bg-amber-400 text-rose-950 rounded-md cursor-pointer'>
                        상품판매
                      </button>
                    </Link>
                  </div>
                </div> */}
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="img/경매이미지.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="img/경매이미지.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="img/경매이미지.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </>



        
      )
}