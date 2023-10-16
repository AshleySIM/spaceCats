import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, updateLineItem, subtractLineItem }) => {

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );
  const totalQuantity = cartItems.reduce(
    (total, lineItem) => total + lineItem.quantity,
    0
  );
  const totalPrice = cartItems.reduce((total, lineItem) => {
    const product = products.find(
      (product) => product.id === lineItem.product_id
    );
    if (product) {
      return total + product.price * lineItem.quantity;
    }
    return total;
  }, 0);

  const fixedPrice = totalPrice.toFixed(2);

  return (
    <div className='cartDiv'>
      <h2>Cart $({fixedPrice})</h2>
      <ul>
        {lineItems
          .filter((lineItem) => lineItem.order_id === cart.id)
          .map((lineItem) => {
            const product =
              products.find((product) => product.id === lineItem.product_id) ||
              {};
            return (
              <li key={lineItem.id}>
                {product.name}({lineItem.quantity})($
                {((product.price * lineItem.quantity) / 1).toFixed(2)})
                <br></br>
                <button onClick={ () => updateLineItem(lineItem)}> + 1 {product.name} </button>
                <br></br>
                <button onClick={ () => { lineItem.quantity > 1 ? subtractLineItem(lineItem): removeFromCart(lineItem)}}> - 1 {product.name} </button>
                <br></br>
                <button onClick={() => removeFromCart(lineItem)}>
                  Remove All {product.name} From Cart
                </button>
              </li>
            );
          })}
      </ul>
      {lineItems.filter((lineItem) => lineItem.order_id === cart.id).length ? (
        <button
          onClick={() => {
            updateOrder({ ...cart, is_cart: false });
          }}
        >
          Create Order
        </button>
      ) : null}
    </div>
  );
};

export default Cart;