import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export default function ProductCardPreloader() {
  return (
    <div className={`overflow-hidden flex flex-col gap-2 w-full`}>
      <div className="relative leading-none">
        <Skeleton className="aspect-[246/174] !rounded-md" />
      </div>

      <div className=" flex flex-col">
        <div className="leading-none">
          <Skeleton width={`25%`} height={14} />
        </div>

        <Skeleton height={20} className="mt-[6px] mb-1" />

        <Skeleton height={14} className="mb-2" />

        <Skeleton width={`50%`} height={16} className="mb-1" />

        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <Skeleton height={16} />
          </div>

          <div className="w-6 h-6 lg:w-8 lg:h-8">
            <Skeleton height={`24px`} />
          </div>
        </div>
      </div>
    </div>
  );
}
