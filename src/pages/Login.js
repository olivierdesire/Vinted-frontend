import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ setToken, handleToken, baseUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/user/login`, {
        email: email,
        password: password,
      });
      console.log(data);
      handleToken(data.token);
      setErrorMessage("");
      if (!location.state) {
        navigate("/");
      } else {
        navigate(location.state.from);
      }
    } catch (error) {
      console.log(error.response?.data.error.message);
      if (error.response?.data.error.message === "Username missing") {
        setErrorMessage("Veuillez renseigner l'utilisateur");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <input
        className="input-underline"
        type="email"
        email="email"
        id="email"
        placeholder="Adresse email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        className="input-underline"
        type="password"
        email="password"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button>Se connecter</button>
      <p>{errorMessage}</p>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p className="compte connect">Pas encore de compte? inscris-toi!</p>
      </Link>
    </form>
  );
};

export default Login;
