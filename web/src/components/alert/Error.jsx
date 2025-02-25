// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
function Error({message}) {
  return (
    <div className="p-4 bg-red-600 text-white rounded-md my-2 w-1/2">
    {message}
  </div>
  )
}

export default Error