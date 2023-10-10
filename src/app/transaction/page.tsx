'use client'
import { useState } from "react"
import Bidding from "./components/Bidding";

export default function ListView() {
    const [isOpen , setIsOpen] = useState(false);
    function closeModal()
    {   
        setIsOpen(false)
    }
    return (
        <div>
            <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>Testing bidding</button>
            <Bidding postId= {'asdasd'} closeModal={closeModal} isOpen={isOpen}/>
        </div>
    )
}