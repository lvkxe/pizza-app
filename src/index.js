import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
  {
    name: "Spinach Pizza",
    ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12,
    image: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Margherita Pizza",
    ingredients: "Tomato, mozzarella, and basil",
    price: 10,
    image: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Salamino Pizza",
    ingredients: "Tomato, mozzarella, and pepperoni",
    price: 15,
    image: "pizzas/salamino.jpg",
    soldOut: false,
  },
  {
    name: "Prosciutto Pizza",
    ingredients: "Tomato, mozzarella, ham, arugula and burrata cheese",
    price: 18,
    image: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
  {
    name: "Funghi Pizza",
    ingredients: "Tomato, mozzarella, mushrooms and onion",
    price: 12,
    image: "pizzas/funghi.jpg",
    soldOut: true,
  },
  {
    name: "Focaccia",
    ingredients: "Bread with Italian olive oil and rosemary",
    price: 6,
    image: "pizzas/focaccia.jpg",
    soldOut: false,
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Menu pizzas={filteredPizzas} />
      <Footer />
    </div>
  );
}

function Header({ searchQuery, setSearchQuery }) {
  return (
    <div className="header-container">
      <h2 className="header-title">Luke's Pizza Co.</h2>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar" 
      />
    </div>
  );
}

function Pizza({ name, ingredients, price, image, soldOut }) {
  const pizzaClass = soldOut ? 'pizza sold-out' : 'pizza';

  return (
    <div className={pizzaClass}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <p>${price}</p>
      {soldOut && <p className="sold-out-text">Sold Out</p>}
    </div>
  );
}

function Menu({ pizzas }) {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <p className="tagline">Authentic Italian Cuisine, all from our stone oven</p>
      <div className="pizza-list">
        {pizzas.map((pizza, index) => (
          <Pizza
            key={index}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            image={pizza.image}
            soldOut={pizza.soldOut}
          />
        ))}
      </div>
    </div>
  );
}

function Order() {
  return (
    <div className="order">
      <h3>We're currently open</h3>
      <button className="order-button" onClick={clickAlert}>Order</button>
    </div>
  );
}

const clickAlert = () => {
  alert('Your order has been placed!');
};

function Footer() {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 10 && currentHour < 22;

  return (
    <footer className="footer">
      {isOpen ? <Order /> : <h3>We're closed</h3>}
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

