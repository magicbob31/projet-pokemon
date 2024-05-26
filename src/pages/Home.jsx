import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="tête">
        <h1 className="H1">A la recherche d'Entei</h1>{" "}
        <div className="corp">
          <div className="lsCard">
            <Link to="/ListesCard">
              <button type="button">liste des cartes</button>
            </Link>
          </div>
          <div className="MC">
            <Link to="/MaColec">
              <button type="button">ma collection</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
