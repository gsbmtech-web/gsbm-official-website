// api/google-reviews.js
//
// Vercel serverless function — fetches GSBM's real Google reviews via
// the Places API (New) Place Details endpoint. This MUST run server-side:
// the API key is never sent to the browser, and calling Google's API
// directly from client-side React would expose the key in the bundled
// JS for anyone to copy and abuse.
//
// ── Setup required before this works ────────────────────────────────
// 1. In Google Cloud Console, create/select a project and enable
//    "Places API (New)" (Google Maps Platform → APIs & Services).
// 2. Billing must be enabled on that Cloud project — Places API requires
//    it even within free-tier usage. Set a budget alert if you're
//    worried about cost; a college blog's traffic volume is nowhere
//    near expensive on Google's pricing.
// 3. Generate an API key. Restrict it to "Places API (New)" only
//    (API restrictions, not app restrictions — this key is called from
//    a server, not a browser, so HTTP-referrer restriction won't work;
//    Vercel serverless functions don't have a fixed IP either, so
//    API-restriction is the practical choice here).
// 4. In your Vercel project → Settings → Environment Variables, add:
//      GOOGLE_PLACES_API_KEY = <your key>
//    Redeploy after adding it — env vars only apply to new deployments.
//
// ── Google's policy constraints (not optional) ──────────────────────
// - You must display Google's attribution alongside these reviews
//   (handled in ApplyNow.jsx — a small "via Google" badge + link).
// - You cannot cherry-pick which reviews render — Google decides which
//   ones this endpoint returns ("most relevant"), not you.
// - You cannot store/cache this content indefinitely. The Cache-Control
//   header below (1 hour) is an operational cache to avoid hammering
//   the API on every page load, not a permanent copy — each hour it
//   re-fetches fresh from Google, which keeps you compliant.

const PLACE_ID = 'ChIJoQ2yuLvWFmwRVdUbkJ8aBkE'; // GSBM, Vinayaka Nagar, OMR, Paiyanur

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    // Fails loudly in server logs rather than silently — makes the
    // missing-env-var setup step obvious instead of a mystery 500.
    console.error('GOOGLE_PLACES_API_KEY is not set in environment variables.');
    res.status(500).json({ error: 'Server misconfigured — missing API key.' });
    return;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          // FieldMask limits what's returned — keeps the response small
          // and keeps billing to only the fields actually used.
          'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri',
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google Places API error:', response.status, errText);
      res.status(502).json({ error: 'Failed to fetch reviews from Google.' });
      return;
    }

    const data = await response.json();

    // Reshape into exactly what the frontend needs — don't leak Google's
    // full raw response (it includes fields we didn't ask to use and
    // don't need to expose).
    const reviews = (data.reviews || []).map((r) => ({
      authorName: r.authorAttribution?.displayName || 'Google User',
      authorPhotoUrl: r.authorAttribution?.photoUri || null,
      authorProfileUrl: r.authorAttribution?.uri || null,
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || '',
      relativeTime: r.relativePublishTimeDescription || '',
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    res.status(200).json({
      businessName: data.displayName?.text || 'GSBM',
      overallRating: data.rating || null,
      totalReviews: data.userRatingCount || null,
      googleMapsUri: data.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
      reviews,
    });
  } catch (err) {
    console.error('Unexpected error fetching Google reviews:', err);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
}