export default async function Quotes() {
  const data = await fetch("https://zenquotes.io/api/random");
  const posts = await data.json();
  return (
    <div>
      {posts.map((post: any) => (
        <div
          key={post.q}
          className="text-center mt-10 w-[90%] md:max-w-2xl mx-auto flex flex-col gap-3 bg-darkdiv py-4 px-5 rounded-xl"
        >
          <p>"{post.q}"</p>
        </div>
      ))}
    </div>
  );
}
