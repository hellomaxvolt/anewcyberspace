import {session} from 'passport'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {retrieveCart} from '../../store/order'
import {Link} from 'react-router-dom'

export class CartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cartItems: []
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.removeCartItem = this.removeCartItem.bind(this)
  }

  handleQuantityChange() {
    if (this.props.isLoggedIn) {
      //Keaton User Cart
    } else {
      //Alex Guest Cart
    }
  }

  removeCartItem() {
    if (this.props.isLoggedIn) {
      //Keaton User Cart
    } else {
      //Alex Guest Cart
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.setState({loading: true}, () => {
        this.props.retrieveCart().then(() => {
          this.setState({
            cartItems: this.props.cart.OrderItems,
            loading: false
          })
        })
      })
    } else {
      const items = Object.values(global.localStorage)
      this.setState(
        {
          cartItems: items,
          loading: false
        },
        () => {
          let newItemArray = this.state.cartItems.map(item => {
            return JSON.parse(item)
          })
          this.setState({cartItems: newItemArray})
        }
      )
    }
  }

  render() {
    let totalPrice = 0
    return (
      <div id="cartContainer">
        {this.state.cartItems && this.state.cartItems.length ? (
          <div id="itemsContainer">
            {this.state.cartItems.map((item, idx) => {
              totalPrice += item.price * item.quantity
              let optionTags = []
              for (let i = 1; i < 100; i++) {
                optionTags.push(i)
              }
              return (
                <div key={idx} id="cartItem">
                  <button id="removeButton" onClick={this.removeCartItem()}>
                    +
                  </button>
                  {this.props.isLoggedIn ? (
                    <>
                      <img
                        id="cartItemImage"
                        src={'../' + item.product.imageUrl}
                      />
                      <h2 id="cartItemName">{item.product.name}</h2>
                      <p id="cartItemDescription">{item.product.description}</p>
                    </>
                  ) : (
                    <>
                      <img id="cartItemImage" src={'../' + item.imageUrl} />
                      <h2 id="cartItemName">{item.name}</h2>
                      <p id="cartItemDescription">{item.description}</p>
                    </>
                  )}
                  <select
                    id="chooseQuantityCart"
                    name="quantity"
                    onChange={() => this.handleQuantityChange(event)}
                  >
                    {optionTags.map((tag, idx) => {
                      if (tag === item.quantity) {
                        return (
                          <option key={idx} value={tag} selected>
                            {tag.toString()}
                          </option>
                        )
                      } else {
                        return (
                          <option key={idx} value={tag}>
                            {tag.toString()}
                          </option>
                        )
                      }
                    })}
                  </select>
                  <h2 id="singleItemPrice">
                    {'$' +
                      (item.price / 100).toLocaleString() +
                      ' (' +
                      item.quantity +
                      ')'}
                  </h2>
                  <h2 id="totalItemPrice">
                    {'Total: $' +
                      (item.price * item.quantity / 100).toLocaleString()}
                  </h2>
                  {/*
                      (document.getElementById(
                        'chooseQuantityCart'
                      ).value = (item).quantity)
                      */}
                </div>
              )
            })}
          </div>
        ) : (
          <div id="emptyCart" />
        )}
        <h2 id="totalCartPrice">
          {'Total: $' + (totalPrice / 100).toLocaleString()}
        </h2>
        <Link id="checkoutLink" to="/confirmation">
          <button id="checkoutButton">Checkout</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  retrieveCart: () => dispatch(retrieveCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
