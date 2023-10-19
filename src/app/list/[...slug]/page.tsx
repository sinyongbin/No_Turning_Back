"use client"

import ImageViewer from "@/app/listdetail/_components/detailImg";
import { log } from "console";
import { useState, useEffect } from "react";
import { clearScreenDown } from "readline";


export default function Page(query:{params : any}) {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isOpen , setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postData, setPostData] = useState<any>([]);

    let category = query.params.slug[0]
    
    useEffect(()=>{
        getData();
    },[])

    async function getData() {
        await fetch(`http://localhost:3000/api/getlist/${category}`,{
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
              {/* 상품 목록을 매핑하여 화면에 표시합니다. */}
              <div className="product-grid">
                <div className="grid grid-cols-4 gap-4">
                  {visibleProducts.map((products:any) => (
                    <div key={products.id} className="product-item">
                      {/* 상품 정보를 표시하는 코드를 추가하세요. */}
                      <a key={products.id} href={`/list/beauty/listdetail/${products.id}`} className="group">
                        <img
                          src={products.images}
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
      // return(   
      //   <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      //     {/* 그리드 레이아웃 */}
      //     <div className="mx-auto flex flex-col lg:flex-row lg:max-w-7xl lg:px-8">
      //       {/* 이미지 */}
      //       <ImageViewer/>
      //       {/* 오른쪽 컨텐츠 */}
      //       <div className="lg:w-1/2">
      //         <div className="lg:pl-4">
      //           <div className="lg:max-w-lg">
      //           {/* 섹션 제목 */}
      //           <div key={postData.id} className="group">
      //             <p className="text-base font-semibold leading-7 text-indigo-600">판매자:{postData.nickname}</p>
      //             {/* 메인 제목 */}
      //             <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> 제목: {postData.title} </h1>
      //             {/* 본문 텍스트 */}
      //             <p className="mt-6 text-xl leading-8 text-gray-700">시작가: {postData.starting_price} 원</p>
      //             <p>여기에 뭘 넣으면 좋을까</p>
      //             {/* 목록 */}
      //             <ul role="list" className="mt-8 space-y-8 text-gray-600">
      //               <li className="flex gap-x-3">
      //                 <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
      //                 <span>
      //                   <strong className="font-semibold text-gray-900">입찰건수: Bid Count</strong> 
      //                 </span>
      //               </li>
      //               <li className="flex gap-x-3">
      //                 <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
      //                 <span>
      //                   <strong className="font-semibold text-gray-900">남은시간: Time Remaining</strong> 
      //                 </span>
      //               </li>
      //               <li className="flex gap-x-3">
      //                 <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
      //                 <span>
      //                   <strong className="font-semibold text-gray-900">시작가: Starting price</strong> 
      //                 </span>
      //               </li>
      //             </ul>
      //             <div className="flex justify-center mt-4">
      //               <button className="btn_action w-[500px] bg-zinc-950 text-white px-4 py-4 rounded-lg hover:bg-zinc-800" onClick={openModal}>
      //                 입찰하기
      //                 {/* <Modal></Modal> */}
      //               </button>
      //               {/* isOpen, closeModal는 <Modal> 컴포넌트의 prop(속성) 중 하나이다. 이 prop은 모달 창이 열려 있는지 닫혀 있는지를 나타내는 값을 받는다. */}
      //               {/* 여기서는 isModalOpen 변수의 값을 전달하여 모달을 열거나 닫는다 */}
      //             </div>
      //             <div className="flex justify-center mt-4">
      //               <button className="w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg hover:bg-zinc-300">
      //                 찜하기
      //               </button>
      //               <div>
      //           <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>입찰하기</button>
      //           {/* <Bidding postId= {'asdasd'} closeModal={closeModal} isOpen={isOpen}/> */}
      //           </div>
      //         </div>
      //       </div>
      //             {/* 추가 섹션 제목 */}
      //             <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">입찰시 주의사항</h2>
        
      //             {/* 추가 섹션 본문 */}
      //             <p className="mt-6">약관의 동의하시오</p>
      //           </div>
      //         </div>
      //       </div>
      //       </div>
      //       <ProductDetail/>
      //     </div>
      //   )
}

function ProductDetail() {
  return (
    <div className="product_detail_item_wrap detail_item flex justify-center items-center">
      <div className="detail_title_header_images">
        <div className="detail_header_logo_wrap">
          <p className="detail_header_logo_title"></p>
        </div>
        <div className="detail_img_wrap">
          <div className="detail_content_images open" style={{ maxHeight: '963px' }}>
            <div className="images">
            <div className='content text-center mt-32'>
                <p>p:내용</p>
              </div>
              <img
                src="img/경매이미지.png"
                loading="lazy"
                alt="Product Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

