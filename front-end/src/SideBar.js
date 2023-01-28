import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom';
import "./navbar.css";

function icons({Received}) {
    return (
        <div className='floaticons'>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
                (Received !== null)?
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart" state={Received}><i class="fi fi-ss-shopping-bag"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/WishList" state={Received}><i class="fi fi-ss-heart"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Account" state={Received}>
                            <i className="fi fi-ss-user" ></i>
                        </Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link" to="/Chat" state={Received}><i class="fi fi-sr-comment-alt"></i></Link>
                    </li>
                </>:
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login" state={Received}><i class="fi fi-ss-shopping-bag"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login" state={Received}><i class="fi fi-ss-heart"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login"><i className="fi fi-ss-user" ></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login"><i class="fi fi-sr-comment-alt"></i></Link>
                    </li>
                </>
            }
            </ul>
        </div>
    )
}

export default icons;