import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Link from "next/link";

const CharacterList = () => {
  const { characters, loading, error } = useSelector(
    (state: RootState) => state.characters
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
      {characters.length ? (
        characters.map((character) => (
          <Link
            href={`/characters/${character.id}`}
            key={character.id}
            className="bg-blue-600 p-4 rounded-md shadow hover:shadow-lg transition block"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold mt-2">{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
          </Link>
        ))
      ) : (
        <div className="text-center-black col-span-full">No results found.</div>
      )}
    </div>
  );
};

export default CharacterList;
