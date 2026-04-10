import { useSearchParams } from "react-router";
import GamesSearched from "../components/GamesSearched";
import VideogamesList from "../components/VideogamesList";

export default function Games() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  return <>{search ? <GamesSearched /> : <VideogamesList />}</>;
}
