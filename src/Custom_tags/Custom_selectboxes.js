import React from 'react'

export default function Custom_selectboxes(props) {
    const options = [`${props.option1}`, `${props.option2}`, `${props.option3}`, `${props.option4}`, `${props.option5}` ,  `${props.option6}`,`${props.option7}` , `${props.option8}`, `${props.option9}` ];
  return (
    <div className={props.width}>
    
       <label className={props.labelcolor}>
                        {props.placeholder}
                        </label>
    {/* <input
       type={props.type}
       name={props.name}
       className={props.className}
       value={props.value}
       onChange={e => props.handleInputData(e.target.value)}
       placeholder={props.placeholder}
    /> */}
    <div className='relative'>
                          <select value={props.value} onChange={(e) => props.handleInputData(e.target.value)}  className={props.className} id="grid-state">
                            <option className='text-black bold'>Select {props.placeholder}</option>
                            {options.map(option  => (
                            // <option>{option ==="undefined" ?<></>:<>{option}</>} </option>
                            <>
                            {option==="undefined"?<></>:<>
                            <option className='font-Roboto font-bold' key={option.id}>{option}</option>
                            </>}
                            </>
                            ))}
                            
                          </select>

                         
                        </div>
    <span className='text-red-800 ml-3'>{props.errormessage}</span>
  </div>
  )
}
