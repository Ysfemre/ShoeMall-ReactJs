import React from "react";
import { Link } from "react-router-dom";
import "./fav-page.css";

function FavPage({ products, favorites, toggleFavorite, addToCart }) {
  
  // 1. Tüm ürünler içinden, ID'si favorilerde olanları süzüyoruz
  const favoriteProducts = products.filter((product) => 
    favorites.includes(product.id)
  );

  return (
    <div className="fav-page-container">
      <h1 className="fav-title">My Favorites ({favoriteProducts.length})</h1>

      {/* Eğer hiç favori yoksa */}
      {favoriteProducts.length === 0 ? (
        <div className="empty-fav">
          <i className="fa-regular fa-heart"></i>
          <p>No favorites yet.</p>
          <Link to="/" className="back-home-btn">Discover Products</Link>
        </div>
      ) : (
        // Varsa listele
        <div className="fav-list">
          {favoriteProducts.map((product) => (
            <div className="fav-item" key={product.id}>
              
              {/* SOL: RESİM (Tıklayınca Detaya Gider) */}
              <Link to={`/product/${product.id}`} className="fav-image">
                {/* GÜNCELLEME BURADA: Favori resimleri için BASE_URL eklendi */}
                <img 
                  src={`${import.meta.env.BASE_URL}${product.img}`} 
                  alt={product.name} 
                />
              </Link>

              {/* ORTA: BİLGİLER */}
              <div className="fav-info">
                <Link to={`/product/${product.id}`} className="fav-name">
                  {product.name}
                </Link>
                <p className="fav-desc">{product.detail}</p>
                <div className="fav-rating">
                  {product.rating} <i className="fa-solid fa-star"></i>
                </div>
                <div className="fav-price">${product.price}</div>
              </div>

              {/* SAĞ: AKSİYONLAR */}
              <div className="fav-actions">
                
                {/* Sepete Ekle */}
                <button 
                  className="fav-add-btn" 
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>

                {/* Favoriden Kaldır (Kalp İkonu) */}
                <button 
                  className="fav-remove-btn"
                  onClick={() => toggleFavorite(product.id)}
                  title="Remove from favorites"
                >
                  <i className="fa-solid fa-heart"></i> {/* Dolu kalp çünkü zaten favorilerdeyiz */}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavPage;