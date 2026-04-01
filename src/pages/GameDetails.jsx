import { useParams } from "react-router";

export default function GameDetails() {
  const { slug } = useParams();

  return (
    <>
      <h1>GameDetails {slug}</h1>
    </>
  );
}
