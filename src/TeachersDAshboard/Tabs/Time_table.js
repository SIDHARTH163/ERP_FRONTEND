import React, {useState , useEffect} from 'react'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
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
          
          Axios.get(`get_user_time_table`, {
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
        <div className='bg-white overflow-y-auto scrollbar-thin'>
        <table class="table-auto  w-full">
  <thead>
    <tr className='bg-slate-900'>
    <th className='text-white p-1'>Index</th>
      <th className='text-white p-1'>Name</th>
      <th className='text-white p-1'>Subject</th>
      <th className='text-white p-1'>Classes in Week</th>
   
      <th className='text-white p-1'>Class Timing</th>
      <th className='text-white p-1'>Assigned Department</th>
     
    </tr>
  </thead>
  <tbody>
    {data.map((i , index)=>
    <>
    <tr className='my-2  font-bold font-Roboto'>
    <td className='   text-center p-1'>{index}</td>
      <td className='    p-1'>{i.active===0 ?<a className='text-red-800 font-bold underline'>{i.first_name} {i.last_name}</a>:<a className='text-green-800 underline font-bold'>{i.first_name} {i.last_name}</a>}</td>
      <td className='   text-center p-1'>{i.subject}</td>
      <td className='   text-center p-2'>{i.class_day_from} - {i.class_day_to}</td>
      <td className='   text-center  p-2'>{i.class_from} - {i.class_to}</td>
      

     
      <td className='   text-center p-1'>{i.course_name}{i.semester}</td>
     
    </tr>
    </>
    )}
    
   
  </tbody>
</table>
{data.length === 0 ?<><p className='text-center font-Roboto font-bold text-2xl text-red-900 underline'>Loading Please Wait ...</p></>:<></>}
      
      
        </div>
    </div>
  )
}
