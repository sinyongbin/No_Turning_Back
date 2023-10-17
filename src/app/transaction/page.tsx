'use client'
import { useState } from "react"
<<<<<<< HEAD
import Bidding from "./components/Bidding";
=======
import Bidding from "./components/bidding";

>>>>>>> 67a3e76318dd5d5694a7b0080b8442be33a1da19

export default function ListView() {
    const [isOpen , setIsOpen] = useState(false);
    function closeModal()
    {   
        setIsOpen(false)
    }
    return (
        <div>
<<<<<<< HEAD
            <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>Testing bidding</button>
=======
            <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>입찰하기</button>
>>>>>>> 67a3e76318dd5d5694a7b0080b8442be33a1da19
            <Bidding postId= {'asdasd'} closeModal={closeModal} isOpen={isOpen}/>
        </div>
    )
}