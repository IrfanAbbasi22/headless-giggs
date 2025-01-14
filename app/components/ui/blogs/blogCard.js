import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
    return (
        <>
            <div className="blogs__main-layout bg-white border border-gray-200 rounded-lg shadow flex flex-col"
            >
                <Link
                    href={`/blog/${blog?.slug}`}
                    className="rounded-t-lg aspect-[300/200] inline-block w-full overflow-hidden group"
                >
                    <Image
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-125 transition-all"
                        src={blog?.featuredImageUrl || "/placeholder.jpg"}
                        alt={blog?.title?.rendered?.replace(/<\/?(p|br)\/?>/g, "") || "Placeholder Image"}
                    />
                </Link>
                
                <div className="p-5">
                    <Link href={`/blog/${blog?.slug}`} className="group">
                        <h5
                            className="mb-2 text-lg font-bold tracking-tight text-gray-900 group-hover:text-primary transition-all"
                            dangerouslySetInnerHTML={{
                                __html: blog?.title?.rendered.replace(/<\/?(p|br)\/?>/g, ""),
                            }}
                        ></h5>
                    </Link>

                    {blog?.excerpt?.rendered.length > 0 && (
                        <p
                        className="mb-3 text-sm font-normal text-grayCustom line-clamp-2"
                        dangerouslySetInnerHTML={{
                            __html: blog?.excerpt?.rendered.replace(/<\/?(p|br)\/?>/g, ""),
                        }}
                        ></p>
                    )}

                    <Link
                        href={`/blog/${blog?.slug}`}
                        className="group inline-flex items-center text-sm font-medium text-center text-primary hover:text-primary-hover transition-all"
                    >
                        Read more
                        <svg
                            className="w-3.5 h-3.5 ms-2 group-hover:ms-3 transition-all "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
