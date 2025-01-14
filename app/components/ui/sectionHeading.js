const SectionHeading = ({ heading, description, actionComponent, alignCenterHeading }) => {
  return (
    <>
        <div className="@container grid grid-cols-3 gap-2">
          <div className={`flex gap-1 md:gap-2 flex-col ${alignCenterHeading ? 'col-span-3 text-center w-1/2 m-auto' : 'col-span-2'} `}>
            <h2 className={`text-lg @[680px]:text-2xl font-semibold ${alignCenterHeading ? 'lg:text-[44px] mb-4' : ''} `}>
              {heading}
            </h2>

            {
              description &&
              <p className="text-xs md:text-base md:hidden font-normal text-grayCustom">
                {description}
              </p>
            }
          </div>
          {
            actionComponent && 
            <div className="place-items-end">{actionComponent}</div>
          }
        </div>
    </>
  );
};

export default SectionHeading;
