import LocationDetails from "@/components/LocationDetails";

export default function LocationPage() {
  return <LocationDetails />;
}
export async function generateStaticParams() {
  const allLocations: { id: number }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    const data = await res.json();

    if (res.ok && data.results) {
      allLocations.push(...data.results.map((loc: any) => ({ id: loc.id })));

      hasMore = !!data.info.next;
      page += 1;
    } else {
      hasMore = false;
    }
  }

  return allLocations.map((location) => ({
    id: location.id.toString(),
  }));
}


export const dynamicParams = false;
