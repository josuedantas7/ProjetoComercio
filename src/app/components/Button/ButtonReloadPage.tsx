'use client'
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ButtonReloadPage = () => {

    const [loading, setLoading] = useState(false)

  return <AiOutlineLoading3Quarters onClick={() => {
    setLoading(true)
    location.reload()
  }} size={20} className={` w-[30px] h-[30px] ${loading && 'animate-spin'}`} />
}

export default ButtonReloadPage
