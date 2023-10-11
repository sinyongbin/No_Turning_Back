'use clinet'
import React, { FormEvent, FocusEvent, useState, useEffect, useRef, ChangeEvent} from 'react'
import { Switch } from '@headlessui/react'

export default function Login() {

  const myref = useRef<any>(null)
  const [show, setShow] = useState<boolean>(true)
  const [switchOn, setSwitch] = useState(false)
  const [email,setEmail] = useState<any>("")
 
  useEffect(()=>{
    const emailS =window.localStorage.getItem("email")
    const toggle : boolean = window.localStorage.getItem("switch") === "TRUE" ? true : false
    if(toggle && emailS != "")
    {  
      setSwitch(true);
      setEmail(emailS)
      //document.getElementById("email").value =emailS
      myref.current.value = emailS
    }
  },[])
  function onChange(e : ChangeEvent<HTMLInputElement>)
  {
    setEmail(e.currentTarget.value)
  }
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 기본 제출 동작을 막습니다.
  
    // 이메일과 비밀번호 값을 가져옵니다.
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // 데이터를 서버로 전송합니다.
    try {
      const response = await fetch(`http://127.0.0.1:8080/member/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // JSON 형태로 변환하여 전송
      });
      const result = await response.json();
      const status = result.status;
      if (status === "success") {
        alert('로그인성공~!');
        window.location.href = '/';
      } else {
        window.alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  }
  
   function newJeansCookie(e: boolean)
  {
    setSwitch(e)
    if(e && (email !== "" || email !== undefined || email !== null))
    { 
      window.localStorage.setItem("email", email)
      window.localStorage.setItem("switch", "TRUE");
      console.log("TRUE")
    }
    else
    {
      window.localStorage.setItem("email", "")
      window.localStorage.setItem("switch", "FALSE");
    }
  }
  //email 확인 
  async function onBlur(e: FocusEvent<HTMLInputElement>) {
    const send = e.currentTarget.value
    const message = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email: send })
    }).then(res => {
      return res.json()
    }).then(data => {
      setShow(true)
      const msg = data.message
      if(msg > 0 ){
        setEmail(send)
      }

      if (msg == 0 && send != "")
        setShow(false)
    })
  }
  
  const error = 
    show ? <></> : <p className="text-red-500 text-xs italic">이메일이 존재하지 않습니다 이메일을 다시 확인부탁 드립니다.</p>
  return (
    <form onSubmit={onSubmit}>
      <div className='grid grid-flow-row auto-rows-5'>
        <div className="mb-4">
          <input  
            onChange={onChange}
            onFocus={() => setShow(true)} onBlur={onBlur} type="email" id="email" name="email"
            ref = {myref} 
            placeholder='이메일 또는 아이디'
            className="w-full text-gray-700 border focus:outline-gray-400 p-2"
            />
            {error}
        </div>
        <div className="mb-4">
          <input type="password" id="password" name="password"
             placeholder='비밀번호'
            className="w-full text-gray-700 border p-2 focus:outline-gray-400" />
        </div>
        <div className='mb-2'>
        <Switch
              checked={switchOn}
              defaultChecked={switchOn}
              onChange={newJeansCookie}
              className={`${
                switchOn ? 'bg-blue-400' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  switchOn ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
              
            </Switch><span className='ml-3 text-sm text-gray-400'>아이디 저장</span>
        </div>
        <div className="text-center">
          <button type="submit" 
          className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg w-full ">로그인</button>
        </div>
        <div className="text-center">
          <button type="submit" 
          className="bg-blue-400 mt-2 text-white font-bold py-2 px-4 w-full rounded-lg ">회원가입</button>

        </div>
      </div>
    </form>
  )
}