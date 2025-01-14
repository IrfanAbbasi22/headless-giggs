"use client";
import { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import DotPulsePreloader from "../components/ui/preloader/dotPulsePreloader";
import { fetchBlogs } from "../components/lib/fetchPostDetails";
import BlogCard from "../components/ui/blogs/blogCard";


const Page = () => {

    const [blogs, setBlogs] = useState([]);
    const [preloader, setPreloader] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [loadMorePreloader, setLoadMorePreloader] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageItems, setPerPageItems] = useState(6);
    const [isInitialLoad, setIsInitialLoad] = useState(true);


    const fetchPostCards = async (options = {}) => {
        setLoadMorePreloader(currentPage > 1);
        if (isInitialLoad) setPreloader(true);

        try {
            const response = await fetchBlogs(options);
            const responseJson = await response.json();

            const postsWithImages = responseJson.map((post) => {
                const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                return {
                  ...post,
                  featuredImageUrl,
                };
            });

            if (postsWithImages?.length) {
                setBlogs((prevPosts) => {
                    const updatedPosts = [...prevPosts, ...postsWithImages];
          
                    // Delay the logic after setting the state
                    const totalPosts = parseInt(response.headers.get("X-WP-Total"), 10);
        
                    if (updatedPosts.length >= totalPosts) {
                        setHasMore(false);
                    }else{
                        setHasMore(true);
                    }
          
                    return updatedPosts;
                });
            } else {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPreloader(false);
            setLoadMorePreloader(false);
            setIsInitialLoad(false);
        }
    };

    // Load More
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        
        fetchPostCards({
          curPage: nextPage,
          perPage: perPageItems,
        });
    };

    const hasInitiated = useRef(false);
    useEffect(() => {
        if (!hasInitiated.current) {
            hasInitiated.current = true;

            fetchPostCards({
                curPage: 1,
                perPage: perPageItems,
            });
        }
    }, []);
    return (
        <>
        <section className="py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs?.length > 0 && !preloader && (
                        blogs.map((blog, index)=>(
                            <BlogCard key={`blogCardKey${blog?.id}${index}`} blog={blog}/>
                        ))
                        
                    )}

                    {(preloader || loadMorePreloader) &&
                    Array.from({ length: isInitialLoad ? 6 : perPageItems }, (_, index) => index + 1).map(
                        (number) => (
                            <div
                                key={`blogCardPreloaderKey-${number}`}
                                className="bg-white border border-gray-200 rounded-lg shadow flex flex-col"
                            >
                                <Skeleton className="rounded-t-lg aspect-[300/200] w-full !inline-block" />
                                <div className="p-5 py-4">
                                <Skeleton height={18} className="mb-2" />
                                <p className="mb-3">
                                    <Skeleton height={12} className="" />
                                    <Skeleton height={12} className="" />
                                </p>
                                <Skeleton height={12} width={`50%`} className="" />
                                </div>
                            </div>
                        )
                    )}
                </div>
                
                {/* LoadMore */}
                {hasMore && (
                    <div className="place-items-center grid  mt-5  ">
                        <button
                            onClick={handleLoadMore}
                            className="w-max py-3 px-8 bg-primary hover:bg-primary-hover rounded-[100px] text-white font-medium disabled:text-primary transition-all relative"
                            disabled={loadMorePreloader}
                        >
                            Load more
                            {loadMorePreloader ? (
                                <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <DotPulsePreloader color={"#fff"}/>
                                </div>
                            ) : (
                                " "
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
        </>
    );
};

export default Page;
