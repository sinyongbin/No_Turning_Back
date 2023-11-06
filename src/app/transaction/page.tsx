// 'use client'
// import { useEffect, useState } from "react"


// export default function ListView(id:any) {
//     const [isOpen , setIsOpen] = useState(false);
//     const [loggedInNickName,setIsLoggedInNickName] = useState('');
  
//     useEffect(() => { 
//       const loggedIn = sessionStorage.getItem('loggedInfo');
//       if (loggedIn !== null && typeof loggedIn === 'string' && loggedIn.length > 0) {
//         setIsLoggedInNickName(loggedIn);
//       }
//     }, []);

//     function closeModal()
//     {   
//         setIsOpen(false)
//     }
//     return (
//         <div>
//             <button className = "bg-blue-500" onClick={()=>setIsOpen(true)}>입찰하기</button>
//             {/* <Bidding postId= {loggedInNickName} closeModal={closeModal} isOpen={isOpen}/> */}
//         </div>
//     )
// }