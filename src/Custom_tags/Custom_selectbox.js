import React, { useState , useEffect, useCallback} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Custom_selectbox(props) {
    const navigate =useNavigate()
   const [data , setdata]=useState([])
   const token = localStorage.getItem('Token')


   useEffect(() => {


        getlists();
        async function getlists(){
          
          Axios.get(`${props.foraxios}`, {
            headers: {
              Authorization: `Bearer ${token}`
          }
          }).then((res)=>{
            
            if(res.data.statuscode===404){
              window.alert(res.data.status)
              localStorage.clear()
              navigate('/')
    
            }else if(res.data.status === 400){
                setdata(res.data.data)
                console.log(res.data.data , 'data for subject')
            }
          
            
            // console.log(list)
          
          })
         }
    
        //  if(!token){
          
        //   navigate('/')
        //   }
      
   },[])
   
   
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
                          <select value={props.value} onChange={e => props.handleInputData(e.target.value)}  className={props.className} id="grid-state">
                            <option className='text-black font-bold'>{props.placeholder}</option>
                            {data.map(option => (
                            // <option>{option ==="undefined" ?<></>:<>{option}</>} </option>
                            <>
                          
                            {option.first_name ?<>
                                <option className='font-bold' key={option.id} value={option.id}>{option.first_name} {option.last_name} {option.course_name}</option>
                            </>:<>
                           {
                            option.subject?<>
                             <option className='font-bold' key={option.id} value={option.subject}>{option.subject} {option.course_name}</option>
                            
                            </>:<>
                            <option className='font-bold' key={option.id} value={option.id}>{option.course_name}</option>
                            
                            </>
                           }
                            </>}
                         </>
                            ))}
                            
                          </select>

                         
                        </div>
    <span className='text-red-800 ml-3'>{props.errormessage}</span>
  </div>
  )
}
