import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, secret } = body;

    // Optional: Secure your API with a token
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    // }

    if (!id) {
      return new Response(JSON.stringify({ message: 'Missing ID' }), { status: 400 });
    }

    // Fetch product details from WooCommerce API
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(
          `${process.env.NEXT_PUBLIC_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`
        ),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }

    const product = await response.json();

    // Check the product status
    let { slug, status } = product;

    if (!slug) {
      return new Response(JSON.stringify({ message: 'Slug not found in product data' }), { status: 400 });
    }

    // Remove "__trashed" from the slug
    if (slug.includes("__trashed")) {
      slug = slug.replace("__trashed", "");
    }

    const revalidatePathUrl = `/product/${slug}`;

    if (status === "publish") {
      // Revalidate the page if the product is published
      revalidatePath(revalidatePathUrl);
      return new Response(JSON.stringify({ message: `Revalidated ${revalidatePathUrl}` }), { status: 200 });
    } else {
      // Remove the page from cache for draft/trash
      revalidatePath(revalidatePathUrl);

      return new Response(JSON.stringify({ message: `Removed or invalidated ${revalidatePathUrl}` }), { status: 200 });
    }
  } catch (error) {
    console.error('Error during revalidation:', error);
    return new Response(JSON.stringify({ message: 'Error revalidating', error: error.message }), { status: 500 });
  }
}