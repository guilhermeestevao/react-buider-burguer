import React, { Component } from 'react';

import Aux from '../../hoc/Aux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burguer  from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BuilderBurguer extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false    
    }


    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return ( 

            <Aux>
                <Modal 
                    modelClesed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        purchaseContinue={this.purchaseContinueHandle}
                        purchaseCanceled={this.purchaseCancelHandler}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burguer  
                    ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    disabled={disableInfo} 
                    ordered={this.purchaseHandles}
                    ingredientsRemoved={this.removeIngredientHandles}
                    ingredientsAdded={this.addIngredientHandles} />
            </Aux>
        );
    }

    addIngredientHandles = (type) => {
        const oldCount = this.state.ingredients[type];

        const updateCount = oldCount + 1;
        const updateIgredients = {
            ...this.state.ingredients
        };
        updateIgredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIgredients
        });
        this.updatePurchaseState(updateIgredients);
    }

    removeIngredientHandles = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updateCount = oldCount - 1;
        const updateIgredients = {
            ...this.state.ingredients
        };
        updateIgredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIgredients
        });
        this.updatePurchaseState(updateIgredients);
    }

    updatePurchaseState (ingredients) {
      
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum, el) =>{
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandles = () => {
        this.setState({purchasing: true});
    }

    purchaseContinueHandle = () => {
        alert("You continue!");
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

}

export default BuilderBurguer;

