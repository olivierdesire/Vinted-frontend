import Logo from "../assets/img/Vinted_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ token, handleToken, filters, setFilters }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceDesc, setPriceDesc] = useState(false);

  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="Vinted" />
      </Link>
      <div>
        <input
          className="search-bar"
          placeholder="Que recherches-tu"
          name="search"
          id="search"
          value={search}
          onChange={(event) => {
            for (let i = 0; i < filters.length; i++) {
              const keys = Object.keys(filters[i]);
              if (keys[0] === "title") {
                filters.splice(i, 1);
              }
            }
            setSearch(event.target.value);
            const copytab = [...filters];
            copytab.push({ title: event.target.value });
            setFilters(copytab);
          }}
        />
        <div className="search">
          <p>Prix entre</p>
          <input
            type="text"
            name="prive-min"
            id="price-min"
            value={priceMin}
            placeholder="prix min"
            onChange={(event) => {
              for (let i = 0; i < filters.length; i++) {
                const keys = Object.keys(filters[i]);
                if (keys[0] === "priceMin") {
                  filters.splice(i, 1);
                }
              }
              setPriceMin(event.target.value);
              const copytab = [...filters];
              copytab.push({ priceMin: event.target.value });
              setFilters(copytab);
            }}
          />
          <p>€ et</p>
          <input
            type="text"
            name="prive-min"
            id="price-min"
            value={priceMax}
            placeholder="prix max"
            onChange={(event) => {
              for (let i = 0; i < filters.length; i++) {
                const keys = Object.keys(filters[i]);
                if (keys[0] === "priceMax") {
                  filters.splice(i, 1);
                }
              }
              setPriceMax(event.target.value);
              const copytab = [...filters];
              copytab.push({ priceMax: event.target.value });
              setFilters(copytab);
            }}
          />
          <p>€</p>
          <input
            type="checkbox"
            name="desc"
            id="desc"
            value={priceDesc}
            onChange={(event) => {
              let check = "";
              if (event.target.value) {
                check = "price-desc";
              } else {
                check = "price-asc";
              }
              for (let i = 0; i < filters.length; i++) {
                const keys = Object.keys(filters[i]);
                const values = Object.values(filters[i]);
                if (keys[0] === "sort") {
                  if (values[0] === check) filters.splice(i, 1);
                }
              }

              setPriceDesc(!priceDesc);
              const copytab = [...filters];
              if (!priceDesc) {
                copytab.push({ sort: "price-desc" });
              } else {
                copytab.push({ sort: "price-asc" });
              }
              setFilters(copytab);
            }}
          />
          <label htmlFor="asc">Prix ↘️ </label>
        </div>
      </div>

      {token ? (
        <div className="sign-up">
          <button
            onClick={() => {
              handleToken(null);
              navigate("/");
            }}
          >
            se déconnecter
          </button>
        </div>
      ) : (
        <div className="sign-up">
          <Link to="/signup">
            <button>s'inscrire</button>
          </Link>
          <Link to="/login">
            <button>se connecter</button>
          </Link>
        </div>
      )}
      <button className="vint">vends tes articles</button>
    </header>
  );
};
export default Header;
