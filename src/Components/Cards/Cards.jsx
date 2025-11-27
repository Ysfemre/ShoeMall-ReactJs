import React from "react";
import { Link } from "react-router-dom";
import "./cards.css";

function Cards({ products, searchTerm, favorites, toggleFavorite, addToCart }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="CardContainer">
      {filteredProducts.map((product) => {
        const isFavorite = favorites.includes(product.id);

        return (
          <div className="Card" key={product.id}>
            <div className="ImageContainer">
              <div className="ImageTopIcon">
                {product.price >= 50 ? (
                  <div className="Cargo">
                    Free <i className="fa-solid fa-truck-moving"></i>
                  </div>
                ) : (
                  <div></div>
                )}

                <div
                  className="fav-icon"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <i
                    className={
                      isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"
                    }
                    style={{ color: isFavorite ? "#ef4444" : "#333" }}
                  ></i>
                </div>
              </div>

              <Link to={`/product/${product.id}`} className="Image">
                {/* GÜNCELLEME BURADA: Resim yolunun başına BASE_URL ekledik */}
                <img 
                  src={`${import.meta.env.BASE_URL}${product.img}`} 
                  alt={product.name} 
                />
              </Link>
            </div>

            <div className="Product-Detail-Container">
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="Product-Name">{product.name}</div>
              </Link>
              <div className="Product-Detail">{product.detail}</div>
            </div>

            <div className="Point-Container">
              <div className="Point">
                {product.rating || 4.2} <i className="fa-solid fa-star"></i>
              </div>
              <div className="Comment">({product.reviews || 120})</div>
            </div>

            <div className="Cart-and-Price-Container">
              <div className="Price">${product.price}</div>

              <button
                className="AddCart-btn"
                // Ana sayfadan ekleyince numara seçilmediği için 'null' gönderiyoruz
                onClick={() => addToCart(product, null)}
              >
                ADD CART
              </button>
            </div>
          </div>
        );
      })}

      {filteredProducts.length === 0 && (
        <div
          style={{
            width: "100%",
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "40px",
            fontSize: "1.2rem",
            color: "#666",
          }}
        >
          Sorry, no product found for "{searchTerm}". 😔
        </div>
      )}
    </div>
  );
}

export default Cards;