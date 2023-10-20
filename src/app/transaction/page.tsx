'use client'
<<<<<<< HEAD
import { useEffect, useState } from "react"
import Bidding from "./components/bidding";

=======
import { useState } from "react"
import Bidding from "./components/Bidding";
>>>>>>> 652ab3b5db24abc4ea97b2e4c1f3b84d7bb534f0

export default function ListView(id:any) {
    const [isOpen , setIsOpen] = useState(false);
    const [loggedInNickName,setIsLoggedInNickName] = useState('');
  
    useEffect(() => { // 
      const loggedIn = sessionStorage.getItem('loggedInfo');
      if (loggedIn !== null && typeof loggedIn === 'string' && loggedIn.length > 0) {
        setIsLoggedInNickName(loggedIn);
        console.log("useEffect:안",loggedIn);
      }
    }, []);
    console.log("useEffect:밖",loggedInNickName);
    
    function closeModal()
    {   
        setIsOpen(false)
    }
    return (
        <div>
            <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>입찰하기</button>
            <Bidding postId= {loggedInNickName} closeModal={closeModal} isOpen={isOpen}/>
        </div>
    )
}