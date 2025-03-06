import { CircularProgress } from '@chakra-ui/react'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-75 m-auto d-flex justify-content-center align-items-center mt-5' style={{ height: "80vh" }}>
      <CircularProgress isIndeterminate />
    </div>
  )
}
