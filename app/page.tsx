import Carrossel from "./components/Carrossel";

export default function Home() {
  return (
    <section className="app-section">
      <h1 className="text-center mt-10">Welcome to the Rick and Morty Characterverse!</h1>
      <p className="text-center mt-5">Explore characters, episodes, and locations from the Rick and Morty universe.</p>
      <Carrossel/>
    </section>
  );
}
