import CharacterDetails from "@/components/CharacterDetails";

export default function CharacterPage() {
  return <CharacterDetails />;
}

export async function generateStaticParams() {
  const allCharacters: { id: number; image: string }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await res.json();

    if (res.ok && data.results) {
      allCharacters.push(
        ...data.results.map((char: any) => ({
          id: char.id,
          image: char.image.split('?')[0],
        }))
      );

      hasMore = !!data.info.next;
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return allCharacters.map((character) => ({
    id: character.id.toString(),
  }));
}

export const dynamicParams = false;
