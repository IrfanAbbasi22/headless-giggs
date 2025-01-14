import { fetchPostDetails } from "@/app/components/lib/fetchPostDetails";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Style from "./style.scss";
import PostSideBar from "@/app/components/ui/postSideBar";
import RelatedBlogsSlider from "@/app/components/ui/blogs/relatedBlogsSlider";

export default async function PostPage({ params }) {
    const { slug } = await params;
    const postDetail = await fetchPostDetails(slug);

    console.log("fuck", postDetail);

    if (postDetail === null || postDetail === undefined) {
        return (
        <>
            <main className="min-h-[70dvh] bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-[380px] md:max-w-md space-y-6 text-center">
                {/* Animated Icon */}
                <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-package-x w-10 h-10 sm:w-12 sm:h-12 text-primary"
                    >
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                    <path d="m17 13 5 5m-5 0 5-5" />
                    </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary/10 rounded-full blur-sm" />
                </div>

                {/* Content */}
                <div>
                <h1 className="text-lg font-semibold md:text-2xl tracking-tight">
                    Post Not Found
                </h1>
                <p className="mt-1 text-base font-normal text-grayCustom max-w-[280px] sm:max-w-none mx-auto">
                    We couldn&apos;t locate the post you&apos;re looking for. It
                    might have been moved or is no longer available.
                </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                    Back to Home
                </Link>
                <Link
                    href="/blogs"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:text-white text-sm hover:bg-primary px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                    Browse Posts
                </Link>
                </div>
            </div>
            </main>
        </>
        );
    }

    const categoryIds = [];
    postDetail?._embedded?.['wp:term']?.[0]?.forEach((cat) => {
        if (cat?.id) {
            categoryIds.push(cat.id);
        }
    });

    console.log('categoryIds', categoryIds);


  return (
    <>
      <main className="main__post py-20">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="main__post-content">
                <h1 className="text-4xl font-semibold mb-4">
                  {postDetail?.title?.rendered}
                </h1>

                {postDetail?.featuredImageUrl && (
                  <img
                    width={300}
                    height={200}
                    className={`w-full h-auto`}
                    src={`${postDetail?.featuredImageUrl}`}
                    alt={postDetail?.title?.rendered}
                  />
                )}

                {postDetail?.content?.rendered && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postDetail.content.rendered,
                    }}
                  />
                )}
              </div>

              {/* Author details */}
              <div className="border-t border-black border-opacity-20 pt-6 mt-6">
                Written by :
                <div className="userCard flex items-center gap-3 mt-4">
                  {postDetail?._embedded?.["author"]?.[0].avatar_urls && (
                    <img
                      width={48}
                      height={48}
                      className={`rounded-full`}
                      src={
                        postDetail?._embedded?.["author"]?.[0].avatar_urls[48]
                      }
                      alt={postDetail?._embedded?.["author"]?.[0].name}
                    />
                  )}
                  <div>
                    <h5 className="text-lg">
                      {postDetail?._embedded?.["author"]?.[0].name}
                    </h5>

                    {postDetail?._embedded?.["author"]?.[0]?.description
                      ?.length > 0 && (
                      <p className={`text-grayCustom text-sm line-clamp-2`}>
                        {postDetail?._embedded?.["author"]?.[0]?.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              <PostSideBar/>
            </div>
          </div>

          {/* Related Blogs */}
          {
            categoryIds.length > 0 &&
            <div className="relatedBlogs pt-20">
                <div className="main__heading pb-10">
                    <h2 class="text-lg font-semibold md:text-2xl">Shop by Categories</h2>
                </div>
                <RelatedBlogsSlider excludeID={postDetail?.id} categoryIds={categoryIds}/>
            </div>
          }
        </div>
      </main>
    </>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    // <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <div className="container max-w-2xl m-auto px-4">
    //         <div className="space-y-6">
    //             {post.title.rendered && (
    //                 <h1 className="text-2xl font-bold">
    //                     {post.title.rendered}
    //                 </h1>
    //             )}

    //             {featuredImage && (
    //                 <Image
    //                     className="w-full"
    //                     src={featuredImage}
    //                     width={256}
    //                     height={171}
    //                     alt="Post image"
    //                 />
    //             )}

    //             <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    //         </div>
    //     </div>
    // </main>
    // </div>
  );
}
