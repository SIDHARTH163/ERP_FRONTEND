import React from 'react'

export default function Navbar_home({ showSidebar, setShowSidebar }) {
  return (
    <nav className="head  sticky  z-40 lg:container text-white bg-slate-900  md:ml-64   md:hidden px-3 py-1 ">
            <div className="bg-slate-900 container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div
                        className={`absolute top-0  md:hidden ${showSidebar === 'left-0' ? 'left-64' : '-left-80'
                            } z-50 transition-all duration-300`}
                    >
                        <button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-80')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mt-1 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-lg font-serif tracking-wider mt-1 mx-10">

                    </h4>

                    <div className="flex">

                    </div>
                </div>
            </div>
        </nav>
  )
}
