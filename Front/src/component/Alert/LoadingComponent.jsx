import React from 'react'
import {Loader2} from "lucide-react"

function LoadingComponent() {
  return (
    <div className='flex justify-center items-center '>

        <Loader2 size={20} color='blue' />
    </div>
  )
}

export default LoadingComponent