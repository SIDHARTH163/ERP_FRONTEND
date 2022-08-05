
import axios from "axios";
import React, { useState , useEffect } from "react";
import Signup_Screen from "./Signup_Screen";
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
export default function Login() {
  const [showscreen, setshowscreen] = useState(false)
  const [email, setemail] = useState('')
  const [screen, setscreen] = useState("")
  const [password, setpassword] = useState('')
  const [error , seterror]=useState([])
  const [loggedInState, setLoggedInState] = useState()
  const navigate = useNavigate();

  // changing screen
  const token =localStorage.getItem('Token')
 
  useEffect(() => {
    if(token){
         navigate('/home')  
    }
  
    
  })
  
  const changescreen = (screen) => {
    setshowscreen(!showscreen)
    setscreen(screen)
    console.log(screen)
  }
  
  // 
  const submit = async (e) => {
    e.preventDefault();

    // console.log(`${token}`)
   
    try {

     
     
    
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      setemail("")
      setpassword("")
     await axios.post("login", formData)
        .then(response => {

          
          if (response.data.status === 200) {
            seterror(response.data.error)

          }
          else if (response.data.status === 400 ) {
            window.alert( response.data.message)

          }
          else if (response.data.status === 402) {
            window.alert( response.data.message)
          }
          else {
           
            setLoggedInState("logging in")
            localStorage.setItem('Token', response.data.token)
            
            window.alert("Welcome Back User Good To Have You Back")
          
          }
       

        });
    } catch (e) {

      window.alert(e)

    }
  }
  
  return (
    <>
    <Navbar/>
      {/* <Navbar transparent /> */}
      {loggedInState === "logging in" ? <>
      
      <div className="flex justify-center items-center">
     
<svg role="status" className="w-8 h-8 mr-2 text-red-200 animate-spin dark:text-red-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
</svg>

</div>
      </>:<>
      
      {
        showscreen ?
          <Signup_Screen />
          : <>
            <section className="absolute w-full h-full">
              <div
                className="absolute top-0 w-full h-full bg-gray-900"
                style={{
                  backgroundImage:
                    "url(" + require("../../assets/img/register_bg_2.png") + ")",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat"
                }}
              ></div>
              <div className="container mx-auto px-4 h-full">

                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                      
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-gray-900 text-center mb-3 font-bold">
                          <p className="text-2xl"> sign in with credentials</p>
                        </div>
                        
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                              style={{ transition: "all .15s ease" }}
                            />
                            <span className="text-red-900">{error.email}</span>
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setpassword(e.target.value)}
                              style={{ transition: "all .15s ease" }}
                            />
                              <span className="text-red-900">{error.password}</span>
                          </div>
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="customCheckLogin"
                                type="checkbox"
                                className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                style={{ transition: "all .15s ease" }}
                              />
                              <span className="ml-2 text-sm font-semibold text-gray-700">
                                Remember me
                              </span>
                            </label>
                          </div>

                          <div className="text-center mt-6">
                            <button
                              onClick={submit}
                              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              
                              style={{ transition: "all .15s ease" }}
                            >
                              Sign In
                            </button>
                          </div>
                       
                        <div className="flex flex-wrap mt-2 ">
                          <div className="w-1/2 ">
                            <a
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              className="text-gray-900 font-Roboto font-bold text-lg underline"
                            >
                              <small>Forgot password?</small>
                            </a>
                          </div>
                          <div className="w-1/2 text-right">
                            <p

                              onClick={() => changescreen('Register')}
                              className="text-gray-900 font-Roboto font-bold text-lg underline"
                            >
                              <small>Create new account</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


              </div>
              {/* <FooterSmall absolute /> */}
            </section>
          </>
      }
      
      </>}
     

    </>
  );
}
