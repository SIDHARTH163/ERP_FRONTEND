import Axios  from 'axios';
import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Heading_text from '../../Custom-fonts/Heading_text'
import Custom_input from '../../Custom_tags/Custom_input';
import Custom_buttons from '../../Custom_tags/Custom_buttons';
import Custom_selectbox from '../../Custom_tags/Custom_selectbox';
import Custom_file from '../../Custom_tags/Custom_file';
export default function Student_profile() {
   const [adhaarfile , setaddharfile]=useState(null)
   const [profilepic , setproflepic]=useState(null)
   const [marklist_10 , setmarklist_10]=useState(null)
   const [marklist_12 , setmarklist_12]=useState(null)
   const [fname , setfname]=useState('')
   const [mname , setmname]=useState('')
   const [fno , setfno]=useState('')
   const [foc , setfoc]=useState('')
   const [course ,setcourse]=useState('')
const [stream , setstream]=useState('')
const [tenth , settenth]=useState('')
const [twelfth , settwelfth]=useState("")
const [ aadhar , setaadhar]=useState('')

const [alert, setalert] = useState([])
const [error, seterror] = useState([])
const [error1, seterror1] = useState([])
    const proxy="http://192.168.1.39:8000"
   const navigate=useNavigate()
  const [profile , setprofile]=useState([])
    const token =localStorage.getItem('Token')
    useEffect(()=>{
        getlist();
         async function getlist(){
          
          Axios.get('get_student_data', {
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


      const Submit=()=>{
        try {
            Axios.request({
              url: "add_data",
              method: "post",
              
              headers:{
                Authorization: `Bearer ${token}`
              } ,
              
                data:{father_name:fname , mother_name:mname , father_no:fno , fathers_occupation:foc , course_id:course , stream_passed:stream , marks_10th:tenth , marks_12th:twelfth , adhaar_no:aadhar}
              
         })
              .then((response) => {
      
                if (response.data.status === 422) {
                  seterror(response.data.error)
                  
                }
                else if (response.data.status === 400) {
                  
                  setalert(response.data)
                  window.location.reload(false)
                
                }
                else if (response.data.statuscode === 404) {
                  setalert(response.data)
                  localStorage.clear()
                  navigate('/')
                }
               
      
              })
          } catch (e) {
            console.log(e)
      
          }
        }

        const handelchange=(e)=>{
             if(e.target.files[0]){
                setproflepic(e.target.files[0])
             }
        }
        const handelchange1=(e)=>{
            if(e.target.files[0]){
               setmarklist_10(e.target.files[0])
            }
       }
       const handelchang2=(e)=>{
        if(e.target.files[0]){
         setmarklist_12(e.target.files[0])
        }
   }

   const handelchang3=(e)=>{
    if(e.target.files[0]){
       setaddharfile(e.target.files[0])
    }
}
        const upload=()=>{
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const formData=new FormData();
      formData.append("profile_image" , profilepic);
      formData.append("tenth_marklist" , marklist_10);
      formData.append("twelfth_marklist" , marklist_12);
      formData.append("aadhar_card" , adhaarfile);
      Axios.post('/uploadFile' , formData ,   config).then((response)=>
     {
        
        if (response.data.status === 422) {
            seterror(response.data.error)
            
          }
          else if (response.data.status === 400) {
            
            window.alert("Documents Uploaded Thankyou")
            window.location.reload(false)
          
          }
          else if (response.data.statuscode === 404) {
            setalert(response.data)
            localStorage.clear()
            navigate('/')
          }
     }
      
      ).catch((err)=>console.log(err))
              
        }
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
                            src={`${proxy}/Profiles/${i.profile_image}`}
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
                <div className=" p-3 shadow-sm rounded-sm bg-white">

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
                                <span className="tracking-wide">Department</span>
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
                            
                            
                            <div className='w-full  p-2'>
                                <p className='font-Roboto font-bold text-lg text-red-700'>Please Add Details First</p>
                              
                                </div> 
                            </>:<>
                            
                            <ul className="list-inside space-y-2">
                                <li>
                                    
                                    <div className="text-teal-600">10th marks :{i.marks_10th}</div>
                                
                                    <div className="text-teal-600">12th marks{i.marks_12th}</div>
                                    <div className="text-teal-600">stream:{i.stream_passed}</div>
                                </li>
                                {
                                    i.documents_upload === 0?<>
                                    
                                    <div className='w-full  p-2'>
                                <p className='font-Roboto font-bold text-lg text-red-700'></p>
                              
                                </div> 
                                    </>:<>
                                    <li>
                                <div className="text-black ">Documents </div>
                                    <a className="text-teal-600" href={`http://192.168.1.39:8000/tenth_marklists/${i.tenth_marklist}`} target="_blank">View Tenth Marklist</a><br/>
                                    <a className="text-teal-600" href={`http://192.168.1.39:8000/twelfth_marklists/${i.twelfth_marklist}`} target="_blank">View Twelfth Marklist</a><br/>
                                    <a className="text-teal-600" href={`http://192.168.1.39:8000/aadhar/${i.aadhar_card}`} target="_blank">View Aadhar Card</a>
                                    
                                </li>
                                    
                                    </>
                                }
                               
                            </ul>
                            </>
                           }
                        </div>
                       
                    </div>
                    {/* <!-- End of Experience and education grid --> */}
                </div>
                <div className='p-2 bg-slate-100 shadow-lg'>
                 {
                    i.education_added ===0?<>  <p className='font-Roboto font-bold text-xl text-red-700 text-center'>Please Add Details Here</p>
                    {/* education and other informationn  */}
                    
                    <div className='p-1'>
                          <div className=' flex flex-row gap-x-1'>
                           
                           
                            <Custom_input
        type="text  "
        id="2"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-1.5
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
        placeholder="Father Name"
        handleInputData={setfname}
        value={fname}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-full p-3"}
         errormessage={error.father_name ?<>{`${error.father_name}`}</>:<></>}
      />
      <Custom_input
        type="text"
        id="2"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-1.5
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
        placeholder="Mother Name"
        handleInputData={setmname}
        value={mname}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-full p-3"}
         errormessage={error.mother_name ?<>{`${error.mother_name}`}</>:<></>}
      />
                          </div>
                          {/* occupation */}
                          <div className=' flex flex-row gap-x-1'>
                           
                           
                           <Custom_input
       type="tel"
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="Father Phone Number"
       handleInputData={setfno}
       value={fno}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-full p-3"}
        errormessage={error.father_no ?<>{`${error.father_no}`}</>:<></>}
     />
     <Custom_input
       type="text"
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="Fathers Occupation"
       handleInputData={setfoc}
       value={foc}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-full p-3"}
         errormessage={error.fathers_occupation ?<>{`${error.fathers_occupation}`}</>:<></>}
     />
                         </div>   
                         <div className=' flex flex-row gap-1'>
                           
                           
                         <Custom_selectbox
              className="form-control
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
     focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Select Course "}
              handleInputData={setcourse}
              value1={course}

              foraxios={"get_courses"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-full p-3"}
            errormessage={error.course_id ? <>{`${error.course_id}`}</> : <></>}
            />
     <Custom_input
       type="number"
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="10th Percentage"
       handleInputData={settenth}
       value={tenth}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-full p-3"}
       errormessage={error.marks_10th ?<>{`${error.marks_10th}`}</>:<></>}
     />
                         </div>   
                         <div className=' flex flex-row gap-1'>
                           
                           
                           <Custom_input
       type="text  "
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="12th Percentage"
       handleInputData={settwelfth}
       value={twelfth}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-full p-3"}
       errormessage={error.marks_12th ?<>{`${error.marks_12th}`}</>:<></>}
     />
     <Custom_input
       type="text"
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="Stream Passed"
       handleInputData={setstream}
       value={stream}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-full p-3"}
       errormessage={error.stream_passed ?<>{`${error.stream_passed}`}</>:<></>}
     />
                         </div>
                         <div className=' flex flex-row gap-1'>
                           
                           
                           <Custom_input
       type="number"
       id="2"
       className="form-control
       font-Roboto
       block
       w-full
       px-3
       py-1.5
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
       placeholder="Add Aadhar No"
       handleInputData={setaadhar}
       value={aadhar}
       labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-1/2 p-3"}
       errormessage={error.adhaar_no ?<>{`${error.adhaar_no}`}</>:<></>}
     />
    <div className='w-1/2 py-7 flex justify-center items-center' >
    <Custom_buttons
      text={"Submit"}
      className="bg-slate-800 hover:bg-slate-900  text-white px-3 py-2 font-Roboto font-bold  text-thin rounded-md flex gap-1"
       onClick={() => Submit()}
      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
    </svg>}
      />
    </div>
   
                         </div>
                    </div>
                    
                    
                    </>:<></>
                 }
                  {
                    i.documents_upload===0?<>
                    
                    {
                        i.education_added?<>
                        <div className=' p-2'>
                        <div className='my-2 p-2'>
        {alert.status===400 ? <>
            <div class="bg-green-100 border my-1 border-green-400 text-slate-900 font-bold px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Hi</strong>
              <span class="block sm:inline"> {alert.message}.</span>
             
            </div></> : <></>}
          {alert.statuscode===404 ? <>
            <div class="bg-red-100 border my-1 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Hi</strong>
              <span class="block sm:inline"> {alert.status}.</span>
             
            </div></> : <></>}
        </div>
                        <p className='font-Roboto font-bold text-xl text-red-700 text-center'>Please Upload Documents Here</p>
                            <Custom_file
                            
                            onchange={handelchange}
                            text={"Upload Profile Pic"}
                            errormessage={error.profile_image?<>{`${error.profile_image}`}</>:<></>}
                            />
                             <Custom_file
                            
                            onchange={handelchange1}
                            text={"Upload Tenth Marklist "}
                            errormessage={error.tenth_marklist ?<>{`${error.tenth_marklist}`}</>:<></>}
                            />
                             <Custom_file
                            
                            onchange={handelchang2}
                            text={"Upload Twelfth Marklist"}
                            errormessage={error.twelfth_marklist ?<>{`${error.twelfth_marklist}`}</>:<></>}
                            />

                             <Custom_file
                            
                            onchange={handelchang3}
                            text={"Upload Aadhar Card File"}
                            errormessage={error.aadhar_card ?<>{`${error.aadhar_card}`}</>:<></>}
                            />
                            <div className='w-1/2  ' >
    <Custom_buttons
      text={"Upload"}
      className="bg-slate-800 hover:bg-slate-900  text-white px-3 py-2 font-Roboto font-bold  text-thin rounded-md flex gap-1"
       onClick={() => upload()}
      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
    </svg>}
      />
    </div>
                        </div>
                
                        
                        {/* upload form */}
                       {/* /\upload form ends  */}
                        
                        </>:<></>
                    }
                    </>:<></>
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
