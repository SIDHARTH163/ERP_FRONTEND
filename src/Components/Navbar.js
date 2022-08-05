
import React,{useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'


export default function Navbar(props) {
  const navigate=useNavigate()
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const token =localStorage.getItem('Token');
  // const logout=()=>{
  //  console.log( localStorage.getItem('Token'))
  // }
 function logout(){

  localStorage.clear();
  
  navigate('/')
  window.location.reload()
 }
  
  return (
    <nav
      className={
        (props.transparent
          ? "top-0 sticky z-50 w-full"
          : "  sticky bg-white ") +
        " flex flex-wrap items-center justify-between px-2 py-3 top-0 sticky z-50 w-full "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className=
              
              " text-lg font-Roboto font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            
            href="/"
          >
            Logo
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            open
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
         
          <ul className="flex flex-col lg:flex-row gap-1 list-none lg:ml-auto">
          
           
              {token?<>
                <li className="flex items-center">
              <Link to="/home"
                className=
                 
                    "bg-gray-900 text-white active:bg-gray-900 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                 
                
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Home
              </Link>
            </li>

                <li className="flex items-center">
              <Link to="#"
              onClick={logout}
                className= "bg-gray-900 text-white active:bg-gray-900 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                 
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Logout
              </Link>
            </li>
           </>:<>
           <li className="flex items-center">
              <Link to="/"
                className= "bg-gray-900 text-white active:bg-gray-900 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                 
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Login
              </Link>
            </li>
           </>}
            
         

           

           
          </ul>
        </div>
      </div>
    </nav>
  );
}
