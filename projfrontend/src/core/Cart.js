import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart() || []); // Ensure products is always an array
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>Your Cart</h2>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))
        ) : (
          <h4>No products in the cart</h4>
        )}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>Checkout Section</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
