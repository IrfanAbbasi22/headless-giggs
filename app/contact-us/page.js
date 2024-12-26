import Link from "next/link";
import React from "react";

const ContactUs = () => {
  return (
    <div className=" py-4 lg:py-10">
      <div className=" container">
        <h3> this is a contact page</h3>
        <Link href={"/"}> back to home</Link>
      </div>
    </div>
  );
};

export default ContactUs;
