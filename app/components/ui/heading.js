// import React from "react";

// const Heading = ({ headings, hideTextOneOnMd = false }) => {
//   return (
//     <div>
//       {headings.map((heading, index) => (
//         <div key={index} className="grid grid-cols-2 gap-2">
//           <div className="flex gap-1 md:gap-2 flex-col">
//             <h2 className="text-lg font-semibold md:text-2xl">
//               {heading.title}
//             </h2>
//             <p
//               className={`text-xs md:text-base font-normal text-grayCustom ${
//                 hideTextOneOnMd ? "hidden md:block" : ""
//               }`}
//             >
//               {heading.textOne}
//             </p>
//             {heading.textTwo && (
//               <p className="text-xs md:text-base hidden md:grid font-normal text-grayCustom">
//                 {heading.textTwo}
//               </p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Heading;
import React from "react";

const Heading = ({ headings, actionComponent, alignCenterHeading }) => {
  return (
    <>
      {headings.map((heading, index) => (
        <div key={index} className="grid grid-cols-3 gap-2">
          <div className={`flex gap-1 md:gap-2 flex-col ${alignCenterHeading ? 'col-span-3 text-center w-1/2 m-auto' : 'col-span-2'} `}>
            <h2 className={`text-lg font-semibold md:text-2xl ${alignCenterHeading ? 'lg:text-[44px] mb-4' : ''} `}>
              {heading.title}
            </h2>
            <p className="text-xs md:text-base md:hidden font-normal text-grayCustom">
              {heading.textOne}
            </p>
            <p className="text-xs md:text-base hidden md:grid font-normal text-grayCustom">
              {heading.textTwo}
            </p>
          </div>
          {
            actionComponent && 
            <div className="place-items-end">{actionComponent}</div>
          }
        </div>
      ))}
    </>
  );
};

export default Heading;
