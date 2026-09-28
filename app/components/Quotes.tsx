type Quote = {
  q: string;
  a: string;
};

// If ZenQuotes is down or rate-limits us, the page still renders.
const FALLBACK: Quote = {
  q: "It does not matter how slowly you go as long as you do not stop.",
  a: "Confucius",
};

async function getQuote(): Promise<Quote> {
  try {
    // One fetch an hour instead of one per visit — ZenQuotes allows only a few a minute.
    const res = await fetch("https://zenquotes.io/api/random", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;
    const [quote] = (await res.json()) as Quote[];
    return quote?.q ? quote : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function Quotes() {
  const quote = await getQuote();

  return (
    <figure className="text-center mt-6 w-full max-w-md mx-auto flex flex-col gap-3 bg-darkdiv py-4 px-4 rounded-xl">
      <blockquote className="text-mint-cream italic">“{quote.q}”</blockquote>
      <figcaption className="text-lighter text-sm">— {quote.a}</figcaption>
    </figure>
  );
}
