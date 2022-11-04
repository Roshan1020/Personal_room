import React, { useState, useEffect } from 'react'

const Counter = () => {
  // const {initialMinute = 0,initialSeconds = 0} = props;
  const [number, setNumber] = useState(0)
  const [decimal, setDecimal] = useState(0)
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (decimal < 999999) {
        setDecimal(decimal + 1)
      }
      if (decimal === 999999) {
        setDecimal(0)
        setNumber(number + 1)
      }
    }, 1)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <div>
      <h1>
        EMG earnings {number}.{('000000' + decimal).slice(-6)}
      </h1>
    </div>
  )
}

export default Counter
