import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

const BurgerIngredient = props => {
  let BurgerIngredient = null;

  switch (props.type) {
    case "bread-bottom":
      BurgerIngredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      BurgerIngredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      BurgerIngredient = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      BurgerIngredient = <div className={classes.Cheese}></div>;
      break;
    case "bacon":
      BurgerIngredient = <div className={classes.Bacon}></div>;
      break;
    case "salad":
      BurgerIngredient = <div className={classes.Salad}></div>;
      break;
    default:
      BurgerIngredient = null;
  }

  return BurgerIngredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;