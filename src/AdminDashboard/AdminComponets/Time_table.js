import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Heading_text from '../../Custom-fonts/Heading_text'
import Axios from 'axios'
import Custom_buttons from '../../Custom_tags/Custom_buttons'

import Add_timetable from '../Screens/Add_timetable'
import Custom_search_tab from '../../Custom_tags/Custom_search_tab'
export default function Time_table() {
    const navigate=useNavigate()
    const[data , setdata]=useState([])
    const[searchdata , setsearchdata]=useState([])
    const token = localStorage.getItem('Token')
    const [page , setpage]=useState(false)
    const [search , setsearch]=useState('')
    useEffect(() => {


        getteacherlist();
        async function getteacherlist(){
          
          Axios.get(`get_time_table`, {
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
                
            }
          
            
            // console.log(list)
          
          })
         }
    
         if(!token){
          
          navigate('/')
          }
      
    },[])
    const changescreen=()=>{
      setpage(true)
    }

    const SearchRecords=()=>{
      Axios.get(`search_time_table/${search}`).then(response=>{
        if(response.data.statuscode===404){
          window.alert(response.data.status)
          localStorage.clear()
          navigate('/')

        }else if(response.data.status === 400){
             setdata(response.data.data)
             
        }
      
      })
    }
  return (
    <div>
        <div className='bg-white h-auto overflow-y-scroll '>
            {page?<><Add_timetable/></>:<>
            <div className='rounded-sm shadow-md p-3'>
            <div className=' flex flex-row justify-between px-2'>
          <Heading_text
            text="Time Table List "
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"lg:text-2xl md:text-xl sm:text-lg text-lg"}
            color={"text-slate-900"}
            decoration={"underline"}
            className={"lg:ml-3 ml-0 my-2"}

          />
           <Custom_search_tab
              type="text"
              id="0"
              className="form-control
              mt-1
        font-Roboto
        block
        w-full
        px-3
        py-2
        text-base
        font-bold
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Search By Class"}
              handleInputData={setsearch}
              onKeyUp={SearchRecords}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-auto"}
              // errormessage={error.class_from ? <>{`${error.class_from}`}</> : <></>}
            />
         <Custom_buttons
                text={"New"}
                className="bg-slate-900 hover:bg-blue-900 text-white p-2 mt-1  font-normal w-full text-thin rounded-md flex flex-row"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
             onClick={() => changescreen()}

              />
        </div>

        <div className=''>
        <table class="table-fixed  w-full">
  <thead>
    <tr className='bg-slate-900 '>
    <th className='text-white p-1'>Index</th>
      <th className='text-white p-1'>Name</th>
      <th className='text-white p-1'>Subject</th>
      <th className='text-white p-1'>Classes in Week</th>
   
      <th className='text-white p-1'>Class Timing</th>
      <th className='text-white p-1'>Assigned Department</th>
      <th className='text-white p-1'>Teacher Contact</th>
    </tr>
  </thead>
  <tbody>
    {data.map((i , index)=>
    <>
    <tr className='my-2  font-bold font-Roboto'>
    <td className=' shadow-md rounded-sm text-center p-1'>{index}</td>
      <td className=' shadow-md rounded-sm  p-1'>{i.active===0 ?<a className='text-red-800 font-bold underline'>{i.first_name} {i.last_name}</a>:<a className='text-green-800 underline font-bold'>{i.first_name} {i.last_name}</a>}</td>
      <td className=' shadow-md rounded-sm text-center p-1'>{i.subject}</td>
      <td className=' shadow-md rounded-sm text-center p-1'>{i.class_day_from} - {i.class_day_to}</td>
      <td className=' shadow-md rounded-sm text-center  p-1'>{i.class_from} - {i.class_to}</td>
      

     
      <td className=' shadow-md rounded-sm text-center p-1'>{i.course_name}{i.semester}</td>
      <td className='text-center shadow-md rounded-sm  p-1 text-red-900'>{i.phone}<br/>{i.email}</td>
    </tr>
    </>
    )}
    
   
  </tbody>
</table>
{data.length === 0 ?<><p className='text-center font-Roboto font-bold text-2xl text-red-900 underline'>Loading Please Wait ...</p></>:<></>}
        </div>
              
            </div>
            </>}
        </div>
    </div>
  )
}
