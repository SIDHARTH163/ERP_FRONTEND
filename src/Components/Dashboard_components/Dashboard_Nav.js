import React,{useEffect , useState} from "react";
import { useNavigate} from 'react-router-dom'
import Axios  from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
export default function Dashboard_Nav() {
  const [profile , setprofile]=useState({})
  const navigate=useNavigate()
  
    const token =localStorage.getItem('Token')
    useEffect(()=>{
        getlist();
         async function getlist(){
          
          Axios.get('get_user', {
            headers: {
              Authorization: `Bearer ${token}`
          }
          }).then((res)=>{
            // 
            setprofile(res.data.data)
            // setprofile(list.data)
            // if(res.data.statuscode===404){
            //     window.alert(res.data.status)
            //     localStorage.clear()
                
      
            //   }else if(res.data.status === 400){
            //     const list =res.data
            //     setprofile(list.data)
               
      
            //   }
           
          })
         }
    
         
      },[]);
      function logout(){

        localStorage.clear();
        
         navigate('/')
        window.location.reload()
       }
  return (
    <div>
       <Disclosure as="nav" className="bg-slate-900 shadow-md ">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className=" flex items-center justify-between h-16">
             
              <div className="">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className=" h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <p className="text-white mx-1 text-lg">{profile.first_name} {profile.last_name}</p>
                
                </div>
              
              </div>
              <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                   
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <a className="block px-4 py-1 text-lg text-slate-900 cursor-pointer hover:text-xl  font-Roboto font-bold ">Profile</a>
                      </Menu.Item>
                      <Menu.Item>
                        <a onClick={logout} className="block px-4 py-1 text-lg text-slate-900 cursor-pointer hover:text-xl  font-Roboto font-bold ">Logout</a>
                      </Menu.Item>
                      <Menu.Item>
                       <a className="block px-4 py-1 text-lg text-slate-900 cursor-pointer hover:text-xl  font-Roboto font-bold ">Settings</a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
             
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  )
}
