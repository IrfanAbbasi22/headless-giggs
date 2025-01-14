export const fetchPostDetails = async (slug) => { 
    try {
        const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wp/v2/posts?_embed=true&status=publish&slug=${slug}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const responseError = await response.json();
            throw new Error(responseError.error);
        }

        const responseJson = await response.json();

        const postsWithImages = responseJson.map((post) => {
            const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
            return {
              ...post,
              featuredImageUrl,
            };
        });

        if (postsWithImages.length && postsWithImages[0].status === "publish") {
            return postsWithImages[0];
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error fetching blog details:", error);
    }
};

// Fetch All Posts
export const fetchBlogs = async (options = {}) => {
    const {
        perPage = 12,
        curPage = 1,
        categories,
        exclude,
    } = options;

    try {
        const params = new URLSearchParams({
            _embed: true,
            status: "publish",
            per_page: perPage,
            page: curPage,
        });

        if (categories) params.append("categories", categories);
        if (exclude) params.append("exclude", exclude);
        
        let url = `${process.env.NEXT_PUBLIC_WOO_URL}/wp/v2/posts?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const responseError = await response.json();
            throw new Error(responseError.error);
        }

        return response;
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};