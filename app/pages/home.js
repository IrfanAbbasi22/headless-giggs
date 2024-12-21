import React from "react";

import Banner from "../sections/banner";
import HomeCats from "../sections/homeCats";

import Chief from "../sections/chief";
import Service from "../sections/service";
import OrderBanner from "../components/ui/orderBanner";
// import Popular from "../sections/Popular";
import HomeCatProducts from "../components/ui/homeCatProducts";

const Home = () => {
  const headings = [
    {
      title: "Deals of the day",
      textOne: "Lorem ipsum dolor sit amet consectetur",
      textTwo:
        "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
    },
  ];
  const headings2 = [
    {
      title: "Featured Product",
      textOne: "Lorem ipsum dolor sit amet consectetur",
      textTwo:
        "  Lorem ipsum, dolor sit amet consectetur adipisicing eli Doloribus reiciendis nisi dolores, optio",
    },
  ];
  return (
    <>
      <Banner />
      <HomeCats />

      <HomeCatProducts cat_id="19" headings={headings} />
      <HomeCatProducts cat_id="16" headings={headings2} />

      <Chief />
      <Service />
      <OrderBanner />
    </>
  );
};

export default Home;
