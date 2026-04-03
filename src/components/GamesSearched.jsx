import { useSearchContext } from "../contexts/SearchContext";

export default function GamesSearched() {
  const { searchGamesList } = useSearchContext();

  return (
    <>
      <h1>SEARCH</h1>
    </>
  );
}
