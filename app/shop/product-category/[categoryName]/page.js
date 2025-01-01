"use client";
import Shop from "../../page";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams(); // Get route parameters
  const slug = params; // Access the category-name parameter

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Shop slug={slug} />
    </div>
  );
};

export default CategoryPage;
