import React from 'react'
import Card_Stats from '../../StudentDashboard/Components/Cards/Card_Stats'
export default function Dashboard_Home({student}) {

  return (
    <div>
        <div className=' px-4 md:px-8 mx-auto w-full  pt-5 pb-6'>
              <div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-6/12 xl:w-3/12 px-4 '>
                    <Card_Stats
                      
                      statSubtitle={student.first_name}
                      statTitle={student.last_name}
                      statArrow="up"
                      statPercent={student.account_creation===1?<>Registered</>:<>Pending</>}
                      statPercentColor="text-slate-900"
                      statDescripiron={ student.created_at}
                      statIconName="group"
                      statIconColor="bg-red-500"

                    />
                  </div>
                  <div className='w-full lg:w-6/12 xl:w-3/12 px-4'><Card_Stats

                    statSubtitle={"Information"}
                    statTitle={student.education_added===1?<>Done</>:<>Pending</>}
                    statArrow={`${student.education_added===1?<>up</>:<>down</>}`}
                    statPercent={student.education_added===1?<>done</>:<>pending</>}
                    statPercentColor="text-emerald-500"
                    statDescripiron={student.updated_at}
                    statIconName="bar_chart"
                    statIconColor="bg-orange-400"

                  /></div>
                   <div className='w-full lg:w-6/12 xl:w-3/12 px-4'><Card_Stats

statSubtitle={"Documents "}
statTitle={student.documents_upload===1?<>Done</>:<>Pending</>}
statArrow={student.documents_upload===1?<>up</>:<>down</>}
statPercent={student.documents_upload===1?<>done</>:<>pending</>}
statPercentColor="text-emerald-500"
statDescripiron={student.updated_at}
statIconName="pie_chart"
statIconColor="bg-orange-400"

/></div>
                  <div className='w-full lg:w-6/12 xl:w-3/12 px-4'><Card_Stats

                    statSubtitle={student.phone}
                    statTitle={student.birthdate}
                    statArrow="up"
                    statPercent={student.account_creation===1?<>done</>:<>pending</>}
                    statPercentColor="text-emerald-500"
                    statDescripiron={student.updated_at}
                    statIconName="percent"
                    statIconColor="bg-lightBlue-500"

                  /></div>
                </div>

              </div>
            </div>
    </div>
  )
}
