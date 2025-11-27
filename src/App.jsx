import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Cards from "./Components/Cards/Cards";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import FavPage from "./Pages/FavPage";
import "./index.css"; 

// 1. ADIM: Veriyi harici dosyadan çağırıyoruz
import { products } from "./Data";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Arama çubuğunu gizleme ayarı
  const isDetailPage = location.pathname.includes("/product/");
  const showSearchBar =
    !isDetailPage &&
    location.pathname !== "/cart" &&
    location.pathname !== "/favorites";

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // --- SEPETE EKLEME FONKSİYONU ---
  const addToCart = (product, size) => {
    const newItem = {
      ...product,
      selectedSize: size, // Seçilen numarayı kaydet
      cartId: Date.now() + Math.random(), // Benzersiz ID oluştur
    };
    setCart([...cart, newItem]);
  };

  // --- SİLME FONKSİYONU ---
  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  return (
    <>
      <Header
        setSearchTerm={setSearchTerm}
        cartCount={cart.length}
        showSearch={showSearchBar}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Cards
              products={products} // Import ettiğimiz veriyi gönderiyoruz
              searchTerm={searchTerm}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              products={products} // Import ettiğimiz veriyi gönderiyoruz
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/favorites"
          element={
            <FavPage
              products={products} // Import ettiğimiz veriyi gönderiyoruz
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;