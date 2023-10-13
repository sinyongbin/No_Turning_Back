'use client'
import { useEffect ,useState} from "react"
export default function Timer()
{
    const [hour,setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] =useState(0)
    useEffect(()=>{

        
    },[hour,minute,second])
    function timer()
    {
        const rightNow = new Date(Date.now())
        const endDate = new Date(1697164567725 + 86400000)
        const endAt =  (endDate.getTime()-rightNow.getTime())
        let secondcal = Math.floor(endAt/1000)
        let minutecal = Math.floor(secondcal/60)
        let hourcal = Math.floor(minutecal/60)
        secondcal = secondcal %60
        minutecal = minutecal % 60
        setHour(hourcal)
        setMinute(minutecal)
        setSecond(secondcal)
    }
    setInterval(timer,1000)
    return(
        <div>
            <div>시간 {`${hour}h:${minute}m:${second}s`}</div>
            <button onClick={()=>console.log()}> Test Date</button>
        </div>
    )
}