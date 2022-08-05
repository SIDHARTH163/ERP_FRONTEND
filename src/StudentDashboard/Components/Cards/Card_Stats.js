import React from 'react'
import PropTypes from 'prop-types'
export default function Card_Stats({
    statSubtitle,
    statTitle,
    statArrow,
    statPercent,
    statPercentColor,
    statDescripiron,
    statIconName,
    statIconColor,
}) {
  return (
    <>
    <div className="relative flex flex-col min-w-0 break-words  mb-6 xl:mb-0  ">
      <div className="flex-auto bg-white rounded-lg px-6 pt-7 pb-7 shadow-lg">
        <div className="flex flex-wrap bg-white">
          <div className="relative w-full pr-4 max-w-full bg-white flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl text-blueGray-700">
              {statTitle}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                statIconColor
              }
            >
              {/* <span className="material-icons">{statIconName}</span>   */}
             
<span class="material-symbols-outlined">
{statIconName}
</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
          <span className={statPercentColor + " mr-2"}>
           
            {statPercent}
          </span>
         
        </p>
      </div>
    </div>
  </>
);
}

Card_Stats.defaultProps = {
statSubtitle: "Traffic",
statTitle: "350,897",
statArrow: "up",
statPercent: "3.48",
statPercentColor: "text-emerald-500",
statDescripiron: "Since last month",
statIconName: "help",
statIconColor: "bg-red-500",
};

Card_Stats.propTypes = {
statSubtitle: PropTypes.string,
statTitle: PropTypes.string,
statArrow: PropTypes.oneOf(["up", "down"]),
statPercent: PropTypes.string,
// can be any of the text color utilities
// from tailwindcss
statPercentColor: PropTypes.string,
statDescripiron: PropTypes.string,
statIconName: PropTypes.string,
// can be any of the background color utilities
// from tailwindcss
statIconColor: PropTypes.string,
};
