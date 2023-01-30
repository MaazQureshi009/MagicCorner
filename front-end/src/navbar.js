import { Link } from "react-router-dom";
import "./navbar.css";
function NavBar({Received}) {
  return (
    <>
      <nav id="navbar">
            <ul>
            {(Received.user === undefined)?
              <li>
                {
                  (Received.page === "H")?
                  <Link className="nav-link active" to="/" state={Received}>Top Products</Link>
                  :
                  <Link className="nav-link" to="/" state={Received}>Top Products</Link>
                }
              </li>:(Received.type === "user")?
              <li>
                {
                  (Received.page === "H")?
                  <Link className="nav-link active" to="/" state={Received}>Top Products</Link>
                  :
                  <Link className="nav-link" to="/" state={Received}>Top Products</Link>
                }
              </li>:(Received.type === "admin")?
              <li>
                {
                  (Received.page === "D")?
                  <Link className="nav-link active" to="/Dashboard" state={Received} >Dash Board</Link>
                  :
                  <Link className="nav-link" to="/Dashboard" state={Received} >Dash Board</Link>
                }
              </li>:<></>
              }
              {
                (Object.keys(Received).length === 1)?
                <li>
                  {
                    (Received.page === "P")?
                    <Link className="nav-link active" to="/displayProducts" state={Received}>Products</Link>
                    :
                    <Link className="nav-link" to="/displayProducts" state={Received}>Products</Link>
                  }
                </li>:
                <li>
                {
                  (Received.page === "P")?
                  <Link className="nav-link active" to="/displayProducts" state={Received}>Products</Link>
                  :
                  <Link className="nav-link" to="/displayProducts" state={Received}>Products</Link>
                }
                </li>
              }
              {
                (Received === null)?
                <li>
                  {
                    (Received.page === "W")?
                    <Link className="nav-link active" to="/displayWorkshops" state={Received}>Workshops</Link>
                    :
                    <Link className="nav-link" to="/displayWorkshops" state={Received}>Workshops</Link>
                  }
                </li>:
                <li>
                  {
                    (Received.page === "W")?
                    <Link className="nav-link active" to="/displayWorkshops" state={Received}>Workshops</Link>
                    :
                    <Link className="nav-link" to="/displayWorkshops" state={Received}>Workshops</Link>
                  }
                </li>
              }
            </ul>
      </nav>
    </>
  );
}

export default NavBar;