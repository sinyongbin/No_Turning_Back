"use client"
import { MyModal } from "../components/Login/MyModal";
import {useState} from'react'
export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal()
  {
      setIsOpen(false)
  }
  return (
    <div>
        <button onClick={()=>setIsOpen(true)}> testing </button>
        <MyModal closeModal={closeModal} isOpen={isOpen}/>      
    </div>
  )
}
