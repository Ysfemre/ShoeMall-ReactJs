import React from "react";
import { Link } from "react-router-dom"; // Sayfa geçişleri için Link şart
import "./header.css";

function Header({ setSearchTerm, cartCount, showSearch }) {
  return (
    <>
      <header className="HeaderContainer">
        
        {/* LOGO: Tıklayınca Ana Sayfaya ( / ) gider */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">ShoeMall</div>
        </Link>

        {/* ARAMA ÇUBUĞU: showSearch true ise gösterir */}
        {showSearch && (
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search" 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Arama çubuğu gizlenince düzen bozulmasın diye boşluk bırakıcı */}
        {!showSearch && <div style={{ flex: 1 }}></div>}

        {/* KULLANICI İKONLARI */}
        <div className="user-actions">
          
          {/* SEPET İKONU: Tıklayınca /cart sayfasına gider */}
          <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="cart">
              <i className="fa-solid fa-basket-shopping"></i>
              {/* Sepet doluysa kırmızı sayı balonu */}
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          </Link>

          {/* FAVORİ İKONU: Tıklayınca /favorites sayfasına gider */}
          <div className="favorite">
            <Link to="/favorites" style={{ color: 'inherit', textDecoration: 'none' }}>
              <i className="fa-solid fa-heart"></i>
            </Link>
          </div>
          
          {/* PROFİL İKONU (Şimdilik işlevsiz) */}
          <div className="login">
            <i className="fa-solid fa-user"></i>
          </div>
          
        </div>
      </header>
    </>
  );
}

export default Header;