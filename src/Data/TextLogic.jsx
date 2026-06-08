import React, { useState, useEffect } from 'react'

const phrases = [
 <>Fresh from the farm.<br />Straight to the Market.</>,
  <>From farm, gbam!<br />Straight to market</>,
  <>Ọhụrụ si n’ugbo.<br />Kpọmkwem gaa ahịa.</>,
  <>Tuntun láti oko.<br />Tààrà sí ọjà.</>,
  <>Sabo daga gona.<br />Kai tsaye zuwa kasuwa.</>
]

const TextLogic = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <p>{phrases[index]}</p>
  )
}

export default TextLogic