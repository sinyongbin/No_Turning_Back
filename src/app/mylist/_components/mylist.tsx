"use client"

import { useState,useEffect } from "react";

export default function MyList() {
  const [products, setProducts] = useState([
    {
      "starting_price": "string",
      "id": "string",
      "email": "string",
      "title": "string",
      "content": "string",
      "category": "$Enums.Category",
      "categoryname": "string",
      "create_date": "Date",
      "update_date": "Date",
    }
  ]);
  const [visibleProducts, setVisibleProducts] = useState([
    {
      "starting_price": "string",
      "id": "string",
      "email": "string",
      "title": "string",
      "content": "string",
      "category": "$Enums.Category",
      "categoryname": "string",
      "create_date": "Date",
      "update_date": "Date",
    }
  ]);
  
  // useEffect(() => {
  //   // API 엔드포인트를 호출하여 데이터 가져오기
  //   fetch(`http://localhost:3000/api/mylist`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setVisibleProducts(data.slice(0, 8)); // 초기에 표시할 상품 설정
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  
      const loadMoreProducts = () => {
          // "더 보기" 버튼을 클릭했을 때 실행되는 함수입니다.
          const currentLength = visibleProducts.length;
          const nextProducts = products.slice(currentLength, currentLength + 8);
      
          if (nextProducts.length > 0) {
            setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
          }
        };

          return (
            
            <div className="bg-white ">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  {/* 상품 목록을 매핑하여 화면에 표시합니다. */}
                  <div className="product-grid">
                    <div className="grid grid-cols-4 gap-4">
                      {visibleProducts.map((products:any) => (
                        <div key={products.id} className="product-item">
                          {/* 상품 정보를 표시하는 코드를 추가하세요. */}
                          <a key={products.id} href={products.href} className="group">
                            <img
                              src={products.imageSrc}
                              alt={products.imageAlt}
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                              style={{ width: '280px', height: '280px' }}
                            />
                            <h3>{products.title}</h3>
                          </a>
                          <p>{products.starting_price}원</p>
                        </div>
                      ))}
                    </div>
                    {/* "더 보기" 버튼을 추가하고 클릭 이벤트를 연결합니다. */}
                    <div className="text-center mt-4">
                      {visibleProducts.length < products.length && (
                        <button className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-2 rounded-lg animate-bounce" onClick={loadMoreProducts}>
                          더 보기
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          )
        }
        