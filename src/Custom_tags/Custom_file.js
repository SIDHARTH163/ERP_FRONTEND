import React from 'react'

export default function Custom_file(props) {
  return (
    <div className='p-2 my-2 '>
        
<label className="block mb-2 text-lg font-Roboto font-bold text-gray-900" for="file_input">{props.text}</label>
<input onChange={props.onchange} className="block w-full p-2 text-sm text-gray-900 rounded-lg border  cursor-pointer  focus:outline-none bg-gray-300 border-gray-600 placeholder-gray-400" id="file_input" type="file"/>
<span className='text-red-800 ml-3'>{props.errormessage}</span>
    </div>
  )
}
