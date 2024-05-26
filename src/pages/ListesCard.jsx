import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import "./ListesCard.scss";
import { Link } from "react-router-dom";

const ListesCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = import.meta.env.VITE_MY_API_TOKEN;

    const fetchCard = async (page) => {
      setLoading(true);
      try {
        let url = `https://api.pokemontcg.io/v2/cards?page=${page}`;
        if (searchTerm) {
          url += `&q=name:${searchTerm}*`;
        }

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-Api-Key": token,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCard(page);
  }, [page, searchTerm]);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchEntei = () => {
    setSearchTerm("Entei");
  };

  const handleHomePage = () => {
    setSearchTerm("");
    setPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="all">
      <Link to="/">
        <button type="button">Accueil</button>
      </Link>
      <div className="navbar">
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchEntei}>Rechercher Entei</button>
      </div>
      <div className="cards">
        {data?.map((pokemon) => (
          <PokemonCard data={pokemon} key={pokemon.id} />
        ))}
      </div>
      <div className="button">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Précédent
        </button>
        <button onClick={handleNextPage}>Suivant</button>
      </div>
    </div>
  );
};

export default ListesCard;
