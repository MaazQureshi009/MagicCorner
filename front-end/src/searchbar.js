import React from "react";
import "./searchbar.css";
import NavBar from './navbar';

function Search() {
    return (
        <>
            <NavBar/>
            <form className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                />
                <input type="submit" value="Search" />
            </form>
            <a
                href="https://wa.me/2348100000000"
                class="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="fa fa-whatsapp whatsapp-icon"></i>
            </a>
        </>
    );
};

export default Search;