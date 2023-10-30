'use clinet'
import React, { FormEvent, FocusEvent, useState, useEffect, useRef, ChangeEvent} from 'react'

export default function PayJoin() {

  const [loggedEmail, setloggedEmail] = useState("");

  useEffect(()=>{
    const loggedInfo = sessionStorage.getItem('loggedEmail')||'{}';
    console.log('loggedInfo',loggedInfo);
    
    setloggedEmail(loggedInfo||"");
  },[])

  async function onSubmit(e:any) {
    
    try {
      const jsonData =[{
        email:loggedEmail
      }]
        console.log(jsonData);
        
        await fetch(`http://localhost:8080/jinddoPay/create`, 
        {
          method: "POST",
          body: JSON.stringify(jsonData[0]),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res)=>{
          console.log('res: ', res.status)
            if(res.status===200){
                alert(`마음껏 입금, 출금을 해주세요!`);
                location.href = '/';
            } else {
                alert(`다시 시도해주세요!`)
            }
        });
    } catch (error) {
        alert(`다시 시도해주세요222!`)
    }
  }

  function Home(){
    location.href='/user'
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='grid grid-flow-row auto-rows-5'>
          
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