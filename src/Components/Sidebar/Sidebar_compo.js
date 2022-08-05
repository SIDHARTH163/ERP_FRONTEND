import React , {useState} from 'react'
export default function Sidebar_compo({title , Icon , onClick , color}) {
  
  return (
   <div>
     <li className='items-center  my-2 '>
              {/* {props.title}
              {props.Icon} */}
         <div className={color?'group text-slate-900 flex flex-row items-center cursor-pointer py-2 rounded-lg gap-3':'group flex flex-row items-center cursor-pointer py-2 rounded-lg gap-3 text-slate-500'} onClick={onClick}>
          <Icon className={color?"h-8 animate-bounce text-slate-900 ":"h-8 group-hover:animate-bounce  text-slate-600"}/>
          <p className='text-lg font-semibold hover:text-sky-500'>{title}</p>
         </div>
            </li>
   </div>
  )
}
