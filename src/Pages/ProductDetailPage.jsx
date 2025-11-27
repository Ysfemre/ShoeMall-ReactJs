import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./product-detail.css";

function ProductDetailPage({ products, addToCart, toggleFavorite, favorites }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // State'ler
  const [selectedSize, setSelectedSize] = useState(null);
  const [warning, setWarning] = useState(""); // Uyarı mesajı için state

  if (!product) {
    return <div style={{padding: "150px", textAlign:"center"}}>Product not found!</div>;
  }

  const isFavorite = favorites.includes(product.id);
  const sizes = [38, 39, 40, 41, 42, 43, 44];

  // --- SEPETE EKLEME KONTROLÜ ---
  const handleAddToCart = () => {
    if (!selectedSize) {
      // Eğer numara seçilmediyse uyarı ver
      setWarning("Please select a size first!");
      return; // Fonksiyonu durdur
    }
    
    // Numara seçildiyse App.jsx'teki fonksiyona ürünü ve numarayı gönder
    addToCart(product, selectedSize);
    setWarning(""); // Uyarıyı temizle
  };

  return (
    <div className="detail-page-container">
      <div className="product-main">
        <div className="detail-image-box">
          {/* GÜNCELLEME BURADA: Detay sayfasındaki resim için BASE_URL ekledik */}
          <img 
            src={`${import.meta.env.BASE_URL}${product.img}`} 
            alt={product.name} 
          />
        </div>

        <div className="detail-info-box">
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            <span className="detail-price">${product.price}</span>
            <div className="detail-rating">
              <i className="fa-solid fa-star"></i>
              <span>{product.rating}</span>
              <span className="review-count">({product.reviews} Reviews)</span>
            </div>
          </div>

          <p className="detail-desc">{product.detail} - Bu efsanevi ayakkabı ile rahatlığı hisset.</p>

          <div className="size-selector">
            <p>Select Size: {selectedSize && <span style={{fontWeight:'bold'}}>{selectedSize}</span>}</p>
            <div className="sizes">
              {sizes.map((size) => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  // Tıklanınca numarayı seç ve uyarıyı kaldır
                  onClick={() => { setSelectedSize(size); setWarning(""); }}
                >
                  {size}
                </button>
              ))}
            </div>
            
            {/* UYARI MESAJI BURADA GÖRÜNECEK */}
            {warning && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", fontWeight: "bold" }}>{warning}</div>}
            
          </div>

          <div className="detail-actions">
            <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button 
              className="fav-btn-large"
              onClick={() => toggleFavorite(product.id)}
              style={{ borderColor: isFavorite ? "#ef4444" : "#ddd", color: isFavorite ? "#ef4444" : "inherit" }}
            >
              <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
          </div>
          
          <div className="delivery-info">
            <i className="fa-solid fa-truck-fast"></i> <span>Free delivery on orders over $50</span>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <div className="review-list">
          <div className="review-card">
            <div className="review-header">
              <div className="reviewer-name">Ahmet Y.</div>
              <div className="review-stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
            </div>
            <p className="review-text">Harika ürün, tam beklediğim gibi!</p>
            <span className="review-date">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;