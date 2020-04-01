import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-4b01a.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients:response.data })
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  handleRemoveIngredient = type => {
    const newIngredients = { ...this.state.ingredients };
    if (newIngredients[type] > 0) {
      newIngredients[type]--;
    }
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(newIngredients);
  };

  handleAddIngredient = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type]++;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(newIngredients);
  };

  handlePurchase = () => {
    this.setState({ purchasing: true });
  };

  handlePurchaseCancel = () => {
    this.setState({ purchasing: false })
  }

  handlePurchaseContinue = () => {
    // alert('You continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Liu BingYi',
        address: {
          street: 'ZhongHua Road',
          zipCode: '12345',
          country: 'China'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Auxx>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onRemoveIngredient={this.handleRemoveIngredient}
            onAddIngredient={this.handleAddIngredient}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.handlePurchase}
            price={this.state.totalPrice}
          />
        </Auxx>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.handlePurchaseCancel}
          purchaseContinued={this.handlePurchaseContinue}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
      <Auxx>
        <Modal
          show={this.state.purchasing}
          modalClose={this.handlePurchaseCancel}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxx>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
