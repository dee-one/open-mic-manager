
import React from "react"
import { useState } from "react"

export default (props) => {

    const [seconds, setSeconds] = useState(0)

    setInterval(() => {

        setSeconds(seconds + 1)


    }
        , 1000)


 return (



     <div className='seconds'>{seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</div>

 )





}