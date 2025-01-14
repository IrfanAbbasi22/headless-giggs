import React, { useEffect, useState } from "react";

import List from "./list";
import Image from "next/image";
import Popular from "@/app/sections/popular";
import Link from "next/link";
import { fetchCats } from "../lib/fetchCats";

const Footer = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const items = [
    {
      section: "Useful Links",
      links: [
        {
          name: "Blogs",
          slug: "/blogs",
        },
        {
          name: "Careers",
          slug: "/careers",
        },
        {
          name: "Sitemap",
          slug: "/sitemap",
        },
        {
          name: "Corporate Information",
          slug: "/corporate-information",
        },
        {
          name: "Whitehat",
          slug: "/whitehat",
        },
        {
          name: "Clear trip",
          slug: "/clear-trip",
        },
      ],
    },
    {
      section: "Customer Policies",
      links: [
        {
          name: "Contact Us",
          slug: "/contact-us",
        },
        {
          name: "FAQ",
          slug: "/faq",
        },
        {
          name: "T&C",
          slug: "/terms-and-conditions",
        },
        {
          name: "Terms Of Use",
          slug: "/terms-of-use",
        },
        {
          name: "Track Orders",
          slug: "/track-orders",
        },
        {
          name: "Shipping",
          slug: "/shipping",
        },
        {
          name: "Privacy policy",
          slug: "/privacy-policy",
        },
      ],
    },
    {
      section: "Categories",
      links: [
        {
          name: "Chicken",
          slug: "/categories/chicken",
        },
        {
          name: "Mutton",
          slug: "/categories/mutton",
        },
        {
          name: "Fish",
          slug: "/categories/fish",
        },
        {
          name: "Cold Cuts",
          slug: "/categories/cold-cuts",
        },
        {
          name: "Ready to Relish",
          slug: "/categories/ready-to-relish",
        },
        {
          name: "Imported",
          slug: "/categories/imported",
        },
      ],
    },
    {
      section: "Useful Links ",
      details: [
        {
          icon: `/assets/icons/location.svg`,
          text: "A 67 S/F, KH. 81 , NEB Sarai, South Delhi, Delhi, 110068",
        },
        {
          icon: `/assets/icons/message-icon.svg`,
          text: "contact@nexgi.com",
          link: "mailto:contact@nexgi.com",
        },

        {
          icon: `/assets/icons/contact-icon.svg`,
          text: "78XXXXXXXX",
          link: "tel:78XXXXXXXX",
        },
      ],
    },

    {
      section: "Keep in Touch",
      socialMedia: [
        {
          icon: `/assets/icons/instagram-icon.svg`,
          link: "https://www.instagram.com/nexgi/",
        },
        {
          icon: `/assets/icons/linkedin-icon.svg`,
          link: "https://www.linkedin.com/company/nexgi/",
        },
        {
          icon: `/assets/icons/facebook-icon.svg`,
          link: "https://www.facebook.com/nexgeninnovators",
        },
        {
          icon: `/assets/icons/x-icon.svg`,
          link: "https://twitter.com/_nexgi",
        },
      ],
    },
    {
      section: "Customer Policies ",
      downloads: [
        {
          img: `/assets/images/googleplay.png`,
          Link: "https://play.google.com/store/apps/details?id=com.in.nexgi.startar",
        },
        {
          img: `/assets/images/appstore.png`,
          Link: "https://apps.apple.com/in/app/startar/id1601759164",
        },
      ],
    },
  ];
  const listItems = [
    {
      icon: `/assets/icons/original-icon.svg`,
      title: "100% Original:",
      description: "guarantee for all products at gigg's meat",
    },
    {
      icon: `/assets/icons/timer-icon.svg`,
      title: "Same Day Delivery:",
      description: "enjoy all Gigg’s Meat Products",
    },
    {
      icon: `/assets/icons/fresh-icon.svg`,
      title: "100% Freshest:",
      description: "meat handpicked for you",
    },
  ];

  const fetchCatData = async () => {
    setLoading(true);
    try {
      const resultCat = await fetchCats();

      // Filter only the required IDs
      const allowedIds = [19, 21, 17, 22, 18, 16];
      const filteredCats = resultCat.filter((cat) =>
        allowedIds.includes(cat.id)
      );

      setCategoryData(filteredCats);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);
  return (
    <>
      <footer className=" py-5  md:py-[57px]  bg-[#FFE7E6]">
        <div className="container mx-auto px-5  grid grid-cols-1 md:grid-cols-3 md:gap-10  lg:gap-16 gap-3 ">
          {/* Logo Column */}
          <div className="flex flex-col gap-6 md:gap-4 md:order-1">
            <div>
              <Link href={"/"}>
                <Image
                  src={`/assets/images/footer-logo.png`}
                  width={130}
                  height={62}
                  alt="logo"
                  className="  h-[62px] md:max-h-[62px]"
                />
              </Link>
            </div>
            <ul className="flex flex-col  gap-1 lg:gap-4">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 lg:gap-4">
                  <span>
                    <Image
                      width={74}
                      height={74}
                      src={item.icon}
                      alt={item.title}
                      className="  w-[74px] h-[74px] md:max-w-[74px]  md:max-h-[74px]"
                    />
                  </span>
                  <div>
                    <p className=" space-x-1">
                      <span className="font-medium  text-xs md:text-base ">
                        {item.title}
                      </span>
                      <span className="text-WarmGray text-[10px] font-normal md:text-sm  ">
                        {item.description}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Links and Customer Policies Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* First Column */}
            <div className="flex flex-col gap-2">
              <List section={items[0].section} links={items[0].links} />

              <List section={items[1].section} links={items[1].links} />
            </div>

            {/* Second Column */}
            <List
              section={items[2].section}
              links={
                categoryData.length > 0
                  ? categoryData.map((cat) => ({
                      name: cat.name,
                      slug: `/product-category/${cat.slug}`,
                    }))
                  : items[2].links
              }
            />
          </div>

          {/* Downloads and Keep in Touch Section */}
          <div className="grid grid-cols-1 gap-6 ">
            <div className="flex flex-col gap-4 md:gap-8 lg:gap-10">
              <List section={items[5].section} downloads={items[5].downloads} />

              <List
                section={items[4].section}
                socialMedia={items[4].socialMedia}
              />

              {/* Contact Us Section */}
              <List section={items[3].section} details={items[3].details} />
            </div>
          </div>
        </div>
      </footer>
      <div className=" pb-12 md:pb-6 lg:pb-0 ">
        <Popular />
      </div>
    </>
  );
};

export default Footer;
