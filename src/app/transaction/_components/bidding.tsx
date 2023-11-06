'use client'
import { Dialog, Transition } from '@headlessui/react'
import {Fragment,useState,useEffect, useRef} from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { TransactionInfo2 } from '@/typeModules'

export default  function Bidding({closeModal, isOpen , postId } : TransactionInfo2)
{
    const [ amount , setAmount ] = useState<any>(false);
    const [ balance , setBalance ] = useState<any>(false);
    const [data , setData] = useState<any>([]);
    const ref = useRef<any>(null);
    useEffect(()=>{getData},[]) // 컴포넌트가 마운트될 때 데이터를 불러옴
    useEffect(()=>{},[data]) // data 상태 변수가 변경될 때마다 실행
    useEffect(()=>{  // 일정 시간마다 getData 함수를 호출하여 데이터 업데이트
      const interval = setInterval(() => {getData()}, 5000)
      return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 clearInterval을 통해 interval 정리
    },[])
    
    function updateValue(price: string) { // 가격을 업데이트하는 함수, 사용자가 입력한 가격(price)을 인수로 받음
      let parseNumber = parseInt(price);
      const getEmail = sessionStorage.getItem("loggedEmail");
      if (data.sellerEmail != sessionStorage.getItem("loggedEmail")) { // 판매자와 현재 사용자(세션)가 다를 때
        if (parseNumber === -1) {
          let cusVal = parseInt(ref.current?.value); // 현재 사용자의 입력값을 읽어온 후 cusVal 변수에 저장
          let min = (parseInt(data.currentPrice) * 1.01).toFixed(0); // 최소금액은 현재가격의 10%더한 값. .toFixed(0)는 소수점이하 0자리로 버린다. 즉, 반올림 안되고 정수만 뜸 
          if (cusVal >= parseInt(min)) { // cusVal이 최소 금액 이상이라면, 사용자의 잔액을 서버로부터 가져오는 요청보냄
            fetch(`http://localhost:8080/jinddoPay/create/${getEmail}`, {// 사용자의 잔액을 서버로부터 가져오는 부분
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((data) => {
                const balance = data.balance; 
                // console.log("두번째1: ", balance);
                // console.log("두번째2: ", data);
                setBalance(balance);
                if (balance >= cusVal) {
                  requestUpdate(cusVal);
                } else {
                  alert("잔액이 부족합니다.");
                }
              })
              .catch((error) => {
                console.error('잔액 확인 중 오류 발생:', error);
              });
          } else {
            alert("최소금액은: " + min);
          }
        } else if (data.maxEmail != sessionStorage.getItem("loggedEmail")) {// data 객체의 maxEmail 값과 현재 로그인한 사용자의 이메일 비교했는데 같지않다면
          fetch(`http://localhost:8080/jinddoPay/create/${getEmail}`, {// 이런경우 새로운 사용자(입찰자)의 잔액을 확인하고 처리
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const balance = data.balance;
              // console.log("첫번쨰1:", data);
              // console.log("첫번쨰2:", balance);
              if (balance >= parseNumber) {// "balance"는 서버로부터 받은 사용자의 잔액, "parseNumber"는 사용자로부터 받았던 입력 값
                requestUpdate(parseNumber);
              } else {
                alert("잔액이 부족합니다.");
              }
            })
            .catch((error) => {
              console.error('잔액 확인 중 오류 발생:', error);
            });
        }
      }
    }

    async function requestUpdate(price : number){// 입찰 정보를 업데이트하고 서버에 전송하는 역할
        let currentPrice = parseInt(data.currentPrice)
        let maxPrice = parseInt(data.maxPrice)
        if(data.maxEmail ==sessionStorage.getItem("loggedEmail") && maxPrice < price) // data.maxEmail이 현재 사용자의 이메일과 같으며, maxPrice보다 price가 큰 경우
        {
          console.log(data.maxEmail)
          data.maxPrice = price // 현재 사용자가 입찰 가격을 업데이트
        }
        else {
          if(maxPrice < price) {// maxPrice (현재 최고 입찰 가격)가 price (새로운 입찰 가격)보다 작은 경우: 다른 사용자가 현재 최고 입찰 가격을 업데이트하려고 한다.

            if(data.maxEmail != sessionStorage.getItem("loggedEmail")){ //  현재 최고 입찰자의 이메일과 현재 사용자의 이메일을 비교, 다르다면 새로운 사용자가 최고 입찰자로 갱신!

              data.maxEmail =sessionStorage.getItem("loggedEmail") // 최고 입찰자의 이메일을 현재 사용자 이메일로 업데이트.
            }
              data.maxPrice = price // data.maxPrice를 price로 설정하여 최고 입찰 가격을 업데이트
              let newcurr= maxPrice * 1.02; // 현재 최고 입찰 가격보다 2% 높은 새로운 현재 가격
              if(newcurr < price) 
                data.currentPrice = newcurr // newcurr가 price보다 작다면, data.currentPrice를 newcurr로 설정하여 현재 가격을 업데이트!
              else
                data.currentPrice = maxPrice // 그렇지 않으면 MaxPrice로 설정
          }
          else if(currentPrice <  price) // 직접적인 입찰부분( 위에 if가 자동입찰 부분 )
          {
            data.currentPrice = price;// 현재 가격이 새로운 가격보다 작다면 data.currentPrice가 새로운 가격으로 업데이트된다.
          }
        }
        await fetch(`/api/transaction/${postId}`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(e=>{
          return e.json()
        }).then(e=>{
          setData(e)
        })
    }

    async function getData() {//  서버에서 데이터를 가져오는 함수
      let temp = await fetch(`/api/transaction/${postId}`,{
          method : "GET",
          headers : {
            accept : "application/json"
          }
      }).then(e=>{
          return e.json()
        }
      )
      console.log(temp)
      setData(temp)
    }
    
    return(<>
      {data !== undefined ? // data가 정의되어 있을 경우 모달 창을 렌더링
          <Transition appear show={isOpen} as={Fragment}>
            {/* as={Fragment}는 자식 컴포넌트를 그룹화 하기위해 사용 */}
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            {/* Transition.Child 컴포넌트는 Transition 컴포넌트 내에서 애니메이션을 적용할 자식 컴포넌트를 나타낸다 */}
  
            <div className="fixed inset-40 overflow-y-auto">
              <div className="flex min-h-fu-ll items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className=" font-medium leading-6 text-gray-900">
                      <div className="titleSection text-left flex">
                        {/* <h1 className='text-xl'>입찰에 참가:</h1> */}
                        <div className="ml-auto right">
                            <button onClick={closeModal}>
                                <XCircleIcon style={
                                  {
                                    width:"30px"
                                  }
                                }/>
                              </button>
                        </div>
                      </div>
                      <div className="priceInfo mt-3"> 
                      {data.maxEmail == sessionStorage.getItem("loggedEmail") ? 
                          <div><b>KRW: {data.maxPrice}</b> + <span> shipping : 3000 KRW</span></div>:
                          <div><b>KRW: {data.currentPrice}</b> + <span> shipping : 3000 KRW</span></div>
                      }
                      </div>
                    </Dialog.Title>
                      {data.maxEmail == sessionStorage.getItem("loggedEmail") ? "":
                        <div id="description" className=''>
                            <div className="maxBiddingButton mt-10 grid-cols-3 gap-6 grid justify-center items-center">
                                    <div className="grid-rows-2">
                                      <div>
                                        <button 
                                        onClick = {()=>{updateValue((data.currentPrice * 1.01).toFixed(0))}}
                                        className="bg-cyan-400 w-[100%] h-8 rounded-full">{(data.currentPrice * 1.01).toFixed(0)} KRW</button>
                                
                                      </div>
                                    </div>
                                    <div className="grid-rows-2">
                                      <div>
                                        <button 
                                        onClick = {()=>{updateValue((data.currentPrice * 1.03).toFixed(0))}}
                                        className="bg-cyan-400 w-[100%] h-8  rounded-full">{(data.currentPrice * 1.03).toFixed(0)} KRW</button>
                                        
                                      </div>
                                    </div>
                                    <div className="grid-rows-2">
                                      <div>
                                        <button onClick = {()=>{updateValue((data.currentPrice * 1.05).toFixed(0))}} className="bg-cyan-400 w-[100%] h-8 rounded-full">{(data.currentPrice * 1.05).toFixed(0)} KRW</button>
                                        
                                      </div>
                                    </div>
                            </div>
                        </div>
                      }
                      {data.maxEmail == sessionStorage.getItem("loggedEmail") ? "":
                          <div className="mt-12 h-[1px] bg-black m-6 relative text-center">
                            <span className='text-black absolute mt-[-30px] ml-[-30px] bg-white px-4 py-4'>또는</span>
                          </div>
                      }
                      {data.maxEmail == sessionStorage.getItem("loggedEmail") ? 
                        <div className="grid gird-rows-3">
                              <div className='text-black font-bold text-lg'>최고 입찰자입니다!</div>
                              <div className='mt-2'>
                                <p className='font-bold '>KRW: {(data.maxPrice * 1.01).toFixed(0)} 보다 높은 가격을 입력해주세요</p>
                                <input ref={ref} name= "cusPrice" type='number' className='h-10 w-full border border-gray-400 rounded-lg' />
                              </div>
                              <div>
                                <button onClick = {()=>{updateValue("-1")}} className='bg-sky-400 h-9 text-center w-full mt-5 rounded-lg'>응찰하기</button>
                              </div>
                        </div>
                      :
                      <div className="grid gird-rows-3">
                            <div className='text-black font-bold text-lg'>내 최고 입찰가</div>
                            <div className='mt-2'>
                              <p className='font-bold '>KRW: {(data.currentPrice * 1.01).toFixed(0)} 보다 높은 가격을 입력해주세요</p>
                              <input ref={ref} name= "cusPrice" type='number' className='h-10 w-full border border-gray-400 rounded-lg' />
                            </div>
                            <div >
                                <button onClick = {()=>{updateValue("-1")}} className='bg-sky-400 h-9 text-center w-full mt-5 rounded-lg'>응찰하기</button>
                            </div>
                      </div>
                      }
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>:"undeinfed"}
      </>)
  }