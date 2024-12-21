import Link from "next/link";

const orderBanner = () => {
  return (
    <section
      className="   mt-3  md:mt-0 py-10 md:py-[60px]  bg-cover bg-center"
      // style={{ backgroundImage: `url(${BulkBanner})` }}
      style={{
        backgroundImage: `url(/assets/images/Bulk-Order-Banner.png)`,
      }}
    >
      <div className="container mx-auto px-5  ">
        <div className=" grid  md:grid-cols-2 gap-2 ">
          <div className=" flex gap-6  flex-col text-white">
            <h2 className=" text-4xl lg:text-[64px] md:text-5xl font-semibold">
              BULK <br /> ORDER
            </h2>

            <p className="    font-normal ">
              Lorem ipsum dolor sit amet consectetur. Convallis nullam amet
              montes elit. Arcu diam placerat aliquam tempor lorem amet sed a
              sed. Sed diam enim sed nulla iaculis sit id blandit.
            </p>

            <Link
              href={`/contact-us`}
              className="transition-all bg-white hover:bg-primary font-medium text-black hover:text-white !leading-none text-base md:text-lg  rounded-3xl   mt-2 w-max py-4 px-8"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default orderBanner;
