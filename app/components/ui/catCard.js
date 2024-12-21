import Image from "next/image";
import Link from "next/link";

const CatCard = ({ itemData }) => {
  return (
    <div className="catCard text-center flex flex-col gap-3 md:gap-4">
      <Link href={`/product-category/${itemData?.slug}`}>
        <Image width={120} height={120}
          src={itemData?.image?.src || '/placeholder.jpg'}
          alt={itemData?.name || 'Placeholder Image'}
          className="rounded-full   aspect-square object-cover object-top  w-full"
        />
      </Link>

      <Link href={`/product-category/${itemData?.slug}`}
        className="text-sm md:text-base font-medium text-black hover:text-primary transition-all">
        {itemData.name}
      </Link>
    </div>
  );
};

export default CatCard;
