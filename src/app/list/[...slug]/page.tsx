/* eslint-disable @next/next/no-img-element */
"use client"

import ImageViewer from "@/app/listdetail/_components/detailImg";
import { log } from "console";
import { useState,useEffect } from "react";


export default function Page(query:{params : any}) {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isOpen , setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postData, setPostData] = useState<any>([]);

    let category = query.params.slug[0];
    
    useEffect(()=>{
        getData();
    },[])

    async function getData() {
        await fetch(`/api/getlist/${category}`,{
            method:"GET"
        })
        .then((e) => e.json())
        .then((e) => {
          setProducts(e);
          setVisibleProducts(e.slice(0, 8)); // 초기에 표시할 상품 설정
        })
        .catch((error) => console.error(error));
    }

    const loadMoreProducts = () => {
        //  "더 보기" 버튼을 클릭했을 때 실행되는 함수입니다.
        const currentLength = visibleProducts.length;
        const nextProducts = products.slice(currentLength, currentLength + 8);
    
        if (nextProducts.length > 0) {
          setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
        }
      };

      const openModal = () => {
    
        setModalOpen(true);
      };
      
      const closeModal = () => {
        setModalOpen(false);
      };
    
    

      return (
            
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="product-grid">
                <div className="grid grid-cols-4 gap-4">
                  {visibleProducts.map((e:any, key: number) => (
                    <div key={key} className="product-item">
                      <a href={`/listdetail/${e.id}`} className="group">
                        <img
                          src={e.images[0]}
                          alt={e.imageAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                          style={{ width: '280px', height: '280px' }}
                        />
                        <h3>{e.title}</h3>
                      </a>
                      <p>{e.starting_price}원</p>
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
  
