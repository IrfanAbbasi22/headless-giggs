"use client";

import Image from "next/image";
import Link from "next/link";

const list = ({ section, links, details, socialMedia, downloads }) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <p className="font-medium text-xs md:text-base">{section}</p>

      {links &&
        links.map((link, index) => (
          <Link href={"/"} key={index}>
         
            <p className="text-[#807373] text-[10px] md:text-sm font-normal cursor-pointer">
              {link}
            </p>
          </Link>
        ))}
      {details &&
        details.map((detail, index) => (
          <p
            key={index}
            className="text-[#807373] text-[10px] md:text-sm flex items-center gap-2 cursor-pointer"
          >
            <span>
              <Link href={"/"}>
                <Image width={12} height={16} src={detail.icon} alt="icon" className=" h-4  w-3 md:w-5 md:max-h-4" />
              </Link>
            </span>
            <Link href={"/"}>
              <span>{detail.text}</span>
            </Link>
          </p>
        ))}
      <div className=" flex gap-3 md:gap-5">
        {socialMedia &&
          socialMedia.map((media, index) => (
            <p
              key={index}
              className="text-[#807373] text-[10px] md:text-sm cursor-pointer"
            >
              <Link href={"/"}>
                <Image width={24} height={24} src={media.icon} alt="social media" />
              </Link>
            </p>
          ))}
      </div>

      <div className="flex gap-4">
        {downloads &&
          downloads.map((download, index) => (
            <p
              key={index}
              className="text-[#807373] text-[10px] md:text-sm cursor-pointer"
            >
              <Link href={"/"}>
                <Image width={134} height={39} src={download.img} alt="download"  className=" max-w-[134px] max-h-[39px]"/>
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default list;
