type Quote = {
  q: string;
  a: string;
};

export default async function Quotes() {
  const data = await fetch("https://zenquotes.io/api/random");
  const posts: Quote[] = await data.json();

  return (
    <div className="text-center mt-6 w-[90%] md:max-w-2xl mx-auto flex flex-col gap-3 bg-darkdiv py-4 px-4 rounded-xl">
      <p className="text-mint-cream italic">"{posts[0].q}"</p>
      <p className="text-lighter text-sm">— {posts[0].a}</p>
    </div>
  );
}
