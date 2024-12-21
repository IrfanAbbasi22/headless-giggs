import Link from "next/link";
import React from "react";

const popular = () => {
  const popularSearches = [
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum  dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
    {
      item: "35% off on:",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis culpa sequi rem, consectetur officia provident voluptatum at odio saepe nulla modi pariatur cupiditate tempora eius deleniti eos, minima recusandae sunt nesciunt? Unde nobis amet blanditiis sint quibusdam, totam expedita dolorum quidem molestias id voluptate quod natus commodi quaerat, minima a possimus ducimus doloribus neque iusto tempore. Sequi tenetur beatae autem eligendi a necessitatibus voluptas, dolorem odit fugiat repellendus veritatis laudantium placeat earum saepe hic.",
    },
  ];

  return (
    <section className=" py-6 md:py-[60px]">
      <div className="container mx-auto  px-5">
        <div className="flex flex-col items-center justify-center gap-2 lg:gap-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Popular Search
          </h1>
          <div className=" flex flex-col gap-3 mt-2  md:mt-3 lg:mt-4">
            {popularSearches.map((search, index) => (
              <div className="flex" key={index}>
                <p>
                  <strong className=" text-xs">{search.item}</strong>
                  <Link href={"/"}>
                    {" "}
                    <span className="text-[#2C2929] text-xs font-normal cursor-pointer">
                      {search.description}
                    </span>
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default popular;

// import React from "react";

// const Popular = () => {
//   const text =
//     "Buy 1 Get 1 Free : Chicken Mince + Chicken Mince | Mutton Mince+Mutton Mince | Rainbow Chicken Seekh Kebab + Chicken Nuggets | Chicken Tandoori Tikka + Mutton Seekh Kebab | Chicken Nuggets + Chicken Seekh Kebab | Chicken Ham + Chicken Sausages | Pork Salami + Pork Sausages | Turkish Chicken Seekh+Chicken Seekh Kebab | Mutton Burger Patty+Chicken Burger Patty | Chicken Seekh Kebab+Chicken Salami | Peri Peri Chicken Seekh +Mughlai Chicken Seekh | Mutton Seekh + Chicken Seekh | Grilled Chicken Burger Patty | Peri Peri Chicken Seekh Kebab | Pork Salami (Buy One Get One Free) | Lamb Chops (F) | Chicken Mince/Keema (F) | Mutton Burger Patty | Chicken Salami (Buy one Get one free) | Mutton Seekh Kebab |";

//   const popularSearches = text.split("|").map((itemPair) => {
//     const [item1, item2] = itemPair.split("+");
//     return {
//       item: item1.trim(),
//       description: item2 ? `Buy 1 Get 1 Free: ${item1} and ${item2}` : item1,
//     };
//   });

//   return (
//     <section>
//       <div className="container mx-auto mt-3 lg:mt-4 px-4 py-4 md:py-6 lg:py-10">
//         <div className="flex flex-col items-center justify-center gap-2 lg:gap-4">
//           <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
//             Popular Search
//           </h1>
//           <div className=" mt-2  md:mt-3 lg:mt-4">
//             {popularSearches.map((search, index) => (
//               <div className="flex gap-1 " key={index}>
//                 <p>
//                   <span className="font-bold text-xs">{search.item}</span>
//                   <span className="text-[#2C2929] text-xs font-normal">
//                     {" "}
//                     {search.description}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Popular;
