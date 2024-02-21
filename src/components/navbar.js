import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logOut = () => {
    // set cookies to be empty
    // window.localStorage.removeItem("userID");
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  console.log(cookies);
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <button onClick={logOut}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
