import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline'
import React , {useState , useEffect} from 'react'
import  Axios  from 'axios'
export default function Status_Bar() {
    const[data , setdata]=useState({})
    
    const token = localStorage.getItem('Token')
    
    useEffect(() => {


        getteacherlist();
        async function getteacherlist(){
          
          Axios.get(`get_user`, {
            headers: {
              Authorization: `Bearer ${token}`
          }
          }).then((res)=>{
            
                     const list=res.data
                 setdata(list.data)
               
            
          
            
            // console.log(list)
          
          })
         }
    
       
    },[])
  return (
    <div className='flex justify-center  '>
        
<ol class="items-center p-1 flex">
    <li class="relative  sm:mb-0">
    <div class="my-2 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">step 1 </h3>
            
        </div>
        {/* {data.account_creation} */}
        <div class="flex items-center">
            <div class={data.account_creation===1?(

"flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-teal-700 sm:ring-8 dark:ring-gray-900 shrink-0"
            ):(
                "flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-red-800 sm:ring-8 dark:ring-gray-900 shrink-0"
            )}>
               <EmojiHappyIcon className='w-8 h-8 text-white hover:animate-bounce'/>
            </div>
            <div class={data.account_creation===1?(" lg:w-64 w-24 bg-gray-200 h-1 dark:bg-teal-900 "):(" lg:w-64 w-24 bg-gray-200 h-1 dark:bg-red-800 ")}></div>
        </div>
        <div class="my-3 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">{data.account_creation===1?<>Completed</>:<>Pending</>}</h3>
           
        </div>
    </li>
    <li class="relative mb-1 sm:mb-0">
    <div class="my-3 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">step 2</h3>
            
        </div>
        <div class="flex items-center">
        <div class={data.education_added===1?(

"flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-teal-700 sm:ring-8 dark:ring-gray-900 shrink-0"
            ):(
                "flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-red-800 sm:ring-8 dark:ring-gray-900 shrink-0"
            )}>
                {data.education_added===1?(<EmojiHappyIcon className='w-8 h-8 text-white hover:animate-bounce'/>):(<EmojiSadIcon className='w-8 h-8 text-white hover:animate-bounce'/>)}
            </div>
            <div class={data.education_added===1?(" lg:w-64 w-24 bg-gray-200 h-1 dark:bg-teal-900 "):(" lg:w-64 w-24 bg-gray-200 h-1 dark:bg-red-800 ")}></div>
        </div>
        <div class="my-3 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">{data.education_added===1?<>Completed</>:<>Pending</>}</h3>
            
        </div>
    </li>
    <li class="relative mb-1 sm:mb-0">
    <div class="my-3 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">step 3</h3>
            
        </div>
        <div class="flex items-center">
        <div class={data.documents_upload===1?(

"flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-teal-700 sm:ring-8 dark:ring-gray-900 shrink-0"
            ):(
                "flex z-10 justify-center items-center w-10 h-10 bg-blue-200 rounded-full ring-0 ring-white dark:bg-red-800 sm:ring-8 dark:ring-gray-900 shrink-0"
            )}>
               {data.documents_upload===1?(<EmojiHappyIcon className='w-8 h-8 text-white hover:animate-bounce'/>):(<EmojiSadIcon className='w-8 h-8 text-white hover:animate-bounce'/>)}
            </div>
           
        </div>
        <div class="my-3 sm:pr-1">
            <h3 class="text-sm font-Roboto font-semibold text-gray-900 dark:text-white text-left">{data.documents_upload===1?<>Completed</>:<>Pending</>}</h3>
           
        </div>
    </li>
</ol>

    </div>
  )
}
