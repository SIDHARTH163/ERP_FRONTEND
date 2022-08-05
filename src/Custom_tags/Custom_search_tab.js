import React from 'react'

export default function Custom_search_tab(props) {
   
  return (
    <>
       
       
  <div className={props.width}>
    
    <input
       type={props.type}
       name={props.name}
       className={props.className}
       value={props.value}
       onChange={(e) => props.handleInputData(e.target.value)}
       onKeyUp={props.onKeyUp}
       placeholder={props.placeholder}
    />
    <span className='text-red-800 ml-3'>{props.errormessage}</span>
  </div>
</>
    
  )
}
