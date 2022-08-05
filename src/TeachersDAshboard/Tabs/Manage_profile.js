import Axios  from 'axios';
import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Heading_text from '../../Custom-fonts/Heading_text'
import Modal from '../../Custom_tags/Modal';
export default function Manage_profile() {
   const navigate=useNavigate()
  const [profile , setprofile]=useState([])
    const token =localStorage.getItem('Token')
    useEffect(()=>{
        getlist();
         async function getlist(){
          
          Axios.get('get_teacher_data', {
            headers: {
              Authorization: `Bearer ${token}`
          }
          }).then((res)=>{
            // 
            
            // setprofile(list.data)
            if(res.data.statuscode===404){
               
                localStorage.clear()
                navigate('/')
      
              }else if(res.data.status === 400){
                const list =res.data
                setprofile(list.data)
                console.log(list)
               
      
              }
           
          })
         }
    
         if(!token){
          
          navigate('/')
          }
      },[]);
  return (
    <div>
        <div className="bg-white">
 
        <Heading_text
        text="Your Profile"
        boldness={"font-bold"}
        family={"font-sans"}
        size={"text-2xl"}
        color={"text-slate-900"}
        decoration={"underline"}
        className={"ml-7"}

        />
        {profile &&(
            <>
            {profile.length === 0 ?<><Heading_text
        text="Loading Please Wait"
        boldness={"font-bold"}
        family={"font-sans"}
        size={"text-xl"}
        color={"text-red-900"}
        decoration={"underline"}
        className={"text-center"}

        /></>:<>
        
        
            
            
                {profile.map((i)=>
    <>
    
    <div className="container mx-auto  p-5" key={i.id}>
        <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className={(i.active===1? "bg-white p-3 border-t-4 border-green-400" :"bg-white p-3 border-t-4 border-red-400")}>
                    <div className="image overflow-hidden">
                        <img className="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""/>
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{i.first_name} {i.last_name}</h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">Teacher At College.</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{i.address}</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto">{i.active===0?<><span
                                    className="bg-red-500 py-1 px-2 rounded text-white text-sm">Not Active</span></>:<><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></>}</span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Member since</span>
                            <span className="ml-auto">{i.created_at}</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- End of profile card --> */}
               
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">First Name</div>
                                <div className="px-4 py-2">{i.first_name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                <div className="px-4 py-2">{i.last_name}</div>
                            </div>
                           
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">{i.phone}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last updated At.</div>
                                <div className="px-4 py-2">{i.updated_at}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Current Address</div>
                                <div className="px-4 py-2">{i.address}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <div className="px-4 py-2">{i.address}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href={`mailto:${i.email}`}>{i.email}</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                <div className="px-4 py-2">{i.birthdate}</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* <!-- End of about section --> */}

                <div className="my-2"></div>

                {/* <!-- Experience and education --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">

                    <div className="grid grid-cols-2">
                    <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Assigned Department</span>
                            </div>
                            <ul className="list-inside space-y-2 ">
                                <li>
                                    <div className="text-teal-600">Deparment:-{i.course_name}</div>
                                    <div className="text-teal-600">Session:-{i.session}</div>
                                
                                    <div className="text-teal-600">Course Type:{i.course_type} System</div>
                                </li> 
                                
                               
                            </ul>
                            
                        </div>
                       
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Education</span>
                            </div>
                           {
                            i.education_added ===0?<>
                            
                            Not Uploaded <br/>

                            <Modal/>
                            </>:<>
                            
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">{i.graduation}</div>
                                    <div className="text-teal-600">{i.masters}</div>
                                
                                    <div className="text-teal-600">{i.higher_education}</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">{i.other_qualifications}</div>
                                    
                                </li>
                               
                            </ul>
                            </>
                           }
                        </div>
                       
                    </div>
                    {/* <!-- End of Experience and education grid --> */}
                </div>
                <div className='border-2 border-black p-2'>
                 {
                    i.documents_upload ===1?<>311</>:<>113</>
                 }
                  
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>
    </>)}
 
            
            
        </>}
            </>
        )}
</div>
    </div>
  )
}
