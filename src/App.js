import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    let selectedCartItem = cartList.find(each => each.id === id)

    if (selectedCartItem) {
      const updatedQuantity = selectedCartItem.quantity + 1
      selectedCartItem = {...selectedCartItem, quantity: updatedQuantity}
      const updatedCartList = cartList.map(item =>
        item.id === selectedCartItem.id ? selectedCartItem : item,
      )

      this.setState({cartList: updatedCartList})
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let selectedCartItem = cartList.find(each => each.id === id)

    if (selectedCartItem.quantity > 1) {
      const updatedQuantity = selectedCartItem.quantity - 1
      selectedCartItem = {...selectedCartItem, quantity: updatedQuantity}

      const updatedCartList = cartList.map(item =>
        item.id === selectedCartItem.id ? selectedCartItem : item,
      )

      this.setState({cartList: updatedCartList})
    } else {
      const updatedCartList = cartList.filter(each => each.id !== id)
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    console.log(cartList)
    let selectedCartItem = cartList.find(each => each.id === product.id)
    if (cartList.includes(selectedCartItem)) {
      const updatedQuantity = selectedCartItem.quantity + product.quantity
      console.log(updatedQuantity)
      selectedCartItem = {...selectedCartItem, quantity: updatedQuantity}
      const updatedCartList = cartList.map(item =>
        item.id === selectedCartItem.id ? selectedCartItem : item,
      )

      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
