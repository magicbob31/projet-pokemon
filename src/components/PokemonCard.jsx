import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.scss";

function PokemonCard({ data }) {
  const [prices, setPrices] = useState({ low: null, mid: null, high: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data.tcgplayer && data.tcgplayer.prices) {
      const priceData = data.tcgplayer.prices;
      let priceDetails;

      if (priceData.holofoil) {
        priceDetails = priceData.holofoil;
      } else if (priceData.normal) {
        priceDetails = priceData.normal;
      }

      if (priceDetails) {
        setPrices({
          low: priceDetails.low,
          mid: priceDetails.mid,
          high: priceDetails.high,
        });
      }
    }
  }, [data]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <div className="cardname">
        <h1>{data.name}</h1>
        <img
          src={data.images.small}
          alt={data.name}
          onClick={handleImageClick}
          className="clickable-image"
        />
      </div>
      {prices.low !== null && (
        <div className="prices">
          <p>Prix bas: ${prices.low}</p>
          <p>Prix moyen: ${prices.mid}</p>
          <p>Prix haut: ${prices.high}</p>
        </div>
      )}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={data.images.large} alt={data.name} />
          </div>
        </div>
      )}
    </div>
  );
}

PokemonCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      small: PropTypes.string.isRequired,
      large: PropTypes.string,
    }).isRequired,
    tcgplayer: PropTypes.shape({
      prices: PropTypes.shape({
        holofoil: PropTypes.shape({
          low: PropTypes.number,
          mid: PropTypes.number,
          high: PropTypes.number,
        }),
        normal: PropTypes.shape({
          low: PropTypes.number,
          mid: PropTypes.number,
          high: PropTypes.number,
        }),
      }),
    }),
  }).isRequired,
};

export default PokemonCard;
