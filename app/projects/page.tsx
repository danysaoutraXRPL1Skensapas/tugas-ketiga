import CardList from "@/components/ProjectCardList";

export default async function Projects() {
  const res = await fetch("http://localhost:3000/api", { cache: "no-store" });
  const data = await res.json();

  return (
    <div>
      <CardList data={data} />
    </div>
  );
}