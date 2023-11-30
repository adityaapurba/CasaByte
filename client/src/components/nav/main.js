import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import {SlMenu} from "react-icons/sl";

export default function Main() {

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate('/ad/create');
    } else {
      navigate("/login");
    }
  }

  return (

    <nav className="navbar navbar-expand-lg bg-light py-1" data-bs-theme="light">
      <div className="container-fluid">
      <NavLink className="navbar-brand" href="/home"><h3 style={{fontFamily:"Veranda", color:""}}>
      <span style={{color:"#176B87"}}>Casa </span><span style={{color:"#64CCC5"}}>Byte</span>
      </h3>
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"><SlMenu /></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarColor03">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <NavLink className="nav-link h5 pr-3" style={{color:"#1F4172"}} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link h5 pr-3" style={{color:"#1F4172"}} to="/search">
                Search
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link h5 pr-3" style={{color:"#1F4172"}} to="/buy">
                Buy
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link h5 pr-3" style={{color:"#1F4172"}} to="/rent">
                Rent
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link h5 text-dark pr-3 cursor-pointer" onClick={handlePostAdClick}>
                <span style={{color:"#1F4172"}} className=" ">Create Listing</span>
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link h5 pr-3" style={{color:"#1F4172"}}to="/agents">
                Agents
              </NavLink>
            </li>
            {!loggedIn ? <>
              <NavLink className="nav-link h5 text-dark pr-3"  to="/login">
                Login
              </NavLink>
            </> : ""}


            {loggedIn ? (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle h5 text-dark" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  {auth?.user?.name ? auth.user.name : auth.user.username}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="nav-link" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <a onClick={logout} className="nav-link">Logout</a>
                  </li>
                </ul>
              </li>
            ) : ""}
          </ul>
          </div>
        </div>
    </nav>
  );
}
