import EpisodeDetails from "@/components/EpisodeDetails";

export default function EpisodePage() {
  return <EpisodeDetails />;
}

export async function generateStaticParams() {
  const allEpisodes: { id: number }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
    const data = await res.json();

    if (res.ok && data.results) {
      allEpisodes.push(
        ...data.results.map((episode: any) => ({ id: episode.id }))
      );

      hasMore = !!data.info.next;
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return allEpisodes.map((episode) => ({
    id: episode.id.toString(),
  }));
}

export const dynamicParams = false;
