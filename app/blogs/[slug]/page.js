import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
    // Fetching data directly in the component
    const res = await fetch(`${process.env.WP_API_URL}/posts?slug=${params.slug}`);
    const data = await res.json();

    console.log('single data', data);

    // If data is an array, get the first item (single post)
    const post = Array.isArray(data) && data.length > 0 ? data[0] : null;


    const fetchFeaturedImage = async (mediaId) => {
        const mediaRes = await fetch(
          `${process.env.WP_API_URL}/media/${mediaId}`
        );
        const mediaData = await mediaRes.json();
        console.log(mediaData.source_url)
        return mediaData.source_url; // Return the image URL
    };

    if (!post) {
        return <p>Post not found</p>;  // Handle the case where no post is found
    }

    const featuredImage = post.featured_media
                            ? await fetchFeaturedImage(post.featured_media) // Await the image URL
                            : null;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="container max-w-2xl m-auto px-4">
                <div className="space-y-6">
                    {post.title.rendered && (
                        <h1 className="text-2xl font-bold">
                            {post.title.rendered}
                        </h1>
                    )}

                    {featuredImage && (
                        <Image
                            className="w-full"
                            src={featuredImage}
                            width={256}
                            height={171}
                            alt="Post image"
                        />
                    )}

                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
            </div>
        </main>
        </div>
    );
}