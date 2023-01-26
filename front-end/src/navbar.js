import { Link } from "react-router-dom";
import "./navbar.css";
//import logo from './logo.png'
//import { Search, ShoppingCart, FavoriteBorder } from "@mui/icons-material"
function NavBar({Received}) {
  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {(Received === null)?
              <li className="nav-item">
                <Link className="nav-link" to="/" state={Received}>Top Products</Link>
              </li>:(Received.type === "user")?
              <li className="nav-item">
                <Link className="nav-link" to="/" state={Received}>Top Products</Link>
              </li>:
              <li className="nav-item">
                <Link className="nav-link" to="/Dashboard" state={Received}>Dash Board</Link>
              </li>
              }
              {
                (Received === null)?
                <li className="nav-item">
                  <Link className="nav-link" to="/displayProducts" state={Received}>Products</Link>
                </li>:
                <li className="nav-item">
                  <Link className="nav-link" to="/displayProducts" state={Received}>Products</Link>
                </li>
              }
              {
                (Received === null)?
                <li className="nav-item">
                  <Link className="nav-link" to="/displayWorkshops" state={Received}>Workshops</Link>
                </li>:
                <li className="nav-item">
                  <Link className="nav-link" to="/displayWorkshops" state={Received}>Workshops</Link>
                </li>
              }
              {/*
              <li className="nav-item ">
              <Link className="nav-link" to="/search" state={Received}><Search/></Link>
              </li>*/}
              {/*
                (Received !== null)?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart" state={Received}><ShoppingCart /></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/WishList" state={Received}><FavoriteBorder /></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/" >
                      {Received.name}<i className="fi fi-ss-user end-icons" ></i>
                    </Link>
                  </li>
                </>:
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Login</Link>
                </li>
*/
              }
              {/*
                (Received === null )?
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Login</Link>
                </li>
                :
                <li className="nav-item">
                  <Link className="nav-link" to="/" >
                    {Received.user}
                  </Link>
                </li>*/
              }

            </ul>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2 bi bi-search" type="search" placeholder="Search" aria-label="Search"/>
        <i className="bi bi-search"></i>
      </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;