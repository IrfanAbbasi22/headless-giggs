import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, secret } = body;
    // console.log('id from res', id);

    // Optional: Secure your API with a token
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    // }

    if (!id) {
      return new Response(JSON.stringify({ message: 'Missing ID' }), { status: 400 });
    }

    // Fetch product details from WooCommerce API
    const url = `${process.env.NEXT_PUBLIC_WOO_URL}/wc/v3/products/${id}?status=publish`;
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

    const data = await response.json();

    // Extract the slug from the response
    let slug = data.slug;

    if (!slug) {
      return new Response(JSON.stringify({ message: 'Slug not found in product data' }), { status: 400 });
    }

    if (slug.includes('__trashed')) {
      slug = slug.replace('__trashed', '');
    }

    // Revalidate the specific product page
    const revalidatePathUrl = `/product/${slug}`;
    revalidatePath(revalidatePathUrl);

    console.log('Revalidated path:', slug);
    return new Response(JSON.stringify({ message: `Revalidated ${revalidatePathUrl}` }), { status: 200 });

  } catch (error) {
    console.error('Error during revalidation:', error);
    return new Response(JSON.stringify({ message: 'Error revalidating', error: error.message }), { status: 500 });
  }
}
