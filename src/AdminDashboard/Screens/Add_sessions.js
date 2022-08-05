import React , {useState , useEffect} from 'react'
import Custom_input from '../../Custom_tags/Custom_input'
import Custom_buttons from '../../Custom_tags/Custom_buttons'
import Axios  from 'axios'
export default function Add_sessions() {
  const [session , setsession]=useState('')
  const [error , seterror]=useState([])
 const [list , setlist]=useState([])
  const submit =()=>{
  
    try{
     Axios.post("add_session" , 
     {session:session })
     .then((response)=>{
       if(response.data.status === 202){
      seterror(response.data.error)
      seterror(response.data.error);
       }
      else if (response.data.status === 400){
       window.alert(response.data.message)
       window.location.reload(false)
      }
     
     })
    }catch(e){
     console.log(e)
 
    }
   }
  //  getlists
  useEffect(()=>{
    getlist();
     async function getlist(){
      
      Axios.get('/get_session', {
       
      }).then((res)=>{
        
        if(res.data.status === 400){
          setlist(res.data.data)

        }
        
        
        // console.log(list)
      
      })
     }

    
  });
  return (
    <div>
      <div className='w-full bg-white p-5'>
       <div className='flex flex-row gap-2'>
       <Custom_input
        type="text"
        id="0"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-2
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={"Add Session"}
        handleInputData={setsession}
        value={session}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-3/4 p-3"}
        errormessage={error.session ?<>{`${error.session}`}</>:<></>}
      />
      <div className='flex justify-center py-8'>
<Custom_buttons
      text={"Submit"}
      className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 mt-1 font-Roboto font-bold  text-thin rounded-md flex gap-1"
      onClick={()=>submit()}
      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
    </svg>}
      />
</div>

       </div>
      </div>
      <div className='bg-white p-3 scrollbar-thin'>
      <table class="table-auto border-2 border-black w-full">
  <thead>
    <tr className='bg-slate-900 '>
    <th className='text-white p-2'>Index</th>
      <th className='text-white p-2'>Session</th>
      <th className='text-white p-2'>Created At</th>
      <th className='text-white p-2'>Update Date</th>
     
    </tr>
  </thead>
  <tbody>
    {list.map((i , index)=>
    <>
    <tr className='my-2 border-2 border-slate-900 font-Roboto font-bold'>
    <td className='text-center border-2 border-slate-900 p-1'>{index}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.session}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.created_at.slice(0,10)}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.updated_at.slice(0,10)}</td>

     
    </tr>
    </>
    )}
    
   
  </tbody>
</table>
      </div>

    </div>
  )
}
