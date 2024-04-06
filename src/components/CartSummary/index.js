import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalPrice = 0

      if (cartList.length > 0) {
        totalPrice = cartList.reduce(
          (total, each) => total + each.price * each.quantity,
          0,
        )
      }

      const itemsCount = cartList.length
      return (
        <div className="cart-summary-cont">
          <h2 className="order-total">
            Order Total:{' '}
            <span className="order-total-amount">{`Rs ${totalPrice}`}</span>
          </h2>
          <p className="items-in-cart">
            <span>{itemsCount}</span> items in cart
          </p>
          <button type="button" className="logout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
