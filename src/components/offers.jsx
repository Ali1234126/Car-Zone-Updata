import React from "react";
import Car from '../assets/images/img-1.png';
import Car1 from '../assets/images/img-2.png';
import Car2 from '../assets/images/img-3.png';

const cars = [
  { img: Car, name: "Mercedes CAR", price: "$4500" },
  { img: Car1, name: "Mercedes CAR", price: "$3500" },
  { img: Car2, name: "Mercedes CAR", price: "$4000" },
  { img: Car, name: "Mercedes CAR", price: "$4500" },
  { img: Car1, name: "Mercedes CAR", price: "$3500" },
  { img: Car2, name: "Mercedes CAR", price: "$4000" },
  { img: Car, name: "Mercedes CAR", price: "$4500" },
  { img: Car1, name: "Mercedes CAR", price: "$3500" },
  { img: Car2, name: "Mercedes CAR", price: "$4000" },
];

const Offers = () => {
  const bookNow = () => {
    alert("Booking feature is coming soon!");
  };

  return (
    <section className="offers-section">
      <h1>Our Best Offers</h1>
      <div className="offers-container">
        {cars.map((car, index) => (
          <div className="card" key={index}>
            <img src={car.img} alt={car.name} />
            <h2>{car.name}</h2>
            <p>Start per day {car.price}</p>
            <button className="book-btn" onClick={bookNow}>Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
