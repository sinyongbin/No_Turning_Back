'use client'
import { useEffect } from "react"
export default function Home() {
  useEffect(() => {
    sessionStorage.setItem("loginEmail","jinddo0@naver.com")
    sessionStorage.setItem("buyer1","jinddo1@naver.com")
    sessionStorage.setItem("buyer2","jinddo3@naver.com")
    
  }, [])
  

  return (
    <div>
      {sessionStorage.getItem("buyer1")}
    </div>
  )
}
