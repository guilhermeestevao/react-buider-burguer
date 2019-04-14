import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}> 
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} 
                </li>
            ); 
        });

    return (
        <Aux>
            <h1>Your Order</h1>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>TOTAL PRICE: {props.price.toFixed(2)} </strong></p>
            <p>Continue to chekout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success"  clicked={props.purchaseContinue} >CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;