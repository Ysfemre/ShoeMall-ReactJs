import React from "react";
import { Link } from "react-router-dom";
import "./cart-page.css";

function CartPage({ cart, removeFromCart }) {
  
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const shippingCost = totalPrice > 50 ? 0 : 10;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Shopping Cart ({cart.length})</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <i className="fa-solid fa-basket-shopping"></i>
          <p>Your cart is currently empty.</p>
          <Link to="/" className="start-shopping-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              // ARTIK KEY OLARAK 'cartId' KULLANIYORUZ
              <div className="cart-item" key={item.cartId}>
                
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  {/* GÜNCELLEME BURADA: Sepetteki resimler için de BASE_URL ekledik */}
                  <img 
                    src={`${import.meta.env.BASE_URL}${item.img}`} 
                    alt={item.name} 
                  />
                </Link>

                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  
                  {/* SEÇİLEN NUMARAYI GÖSTERME KISMI */}
                  <span className="cart-item-detail">
                    {item.selectedSize 
                      ? `Size: ${item.selectedSize}` 
                      : <span style={{color: '#999', fontSize: '0.8rem'}}>Standart Size</span>
                    }
                  </span>
                  
                  <span className="cart-item-price">${item.price}</span>
                </div>

                <button 
                  className="remove-btn" 
                  // SİLME İŞLEMİNDE DE cartId KULLANIYORUZ
                  onClick={() => removeFromCart(item.cartId)}
                  title="Remove from cart"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Estimate</span>
              <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Order Total</span>
              <span>${grandTotal}</span>
            </div>
            <button className="checkout-btn">
              CHECKOUT <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="secure-checkout">
              <i className="fa-solid fa-lock"></i> Secure Checkout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;