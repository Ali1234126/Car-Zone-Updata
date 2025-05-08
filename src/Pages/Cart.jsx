import React from "react";

const Cart = ({  }) => {
  return (
    <div>
      <h1>Your Cart</h1>
      {/* {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((car, index) => (
            <div key={index} className="cart-item">
              <img src={car.image} alt={car.name} className="car-image" />
              <h3>{car.name}</h3>
              <p>{car.price}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Cart;
// استيراد مكتبة React لإنشاء مكونات واجهة المستخدم