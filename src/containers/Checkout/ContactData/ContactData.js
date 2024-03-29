import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order.js';
import Spinner from '../../../components/UI/Spinner/Spinner.js';
import Button from '../../../components/UI/Button/Button.js';
import Input from '../../../components/UI/Input/Input.js';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/action/index';

import classes from './ContactData.module.scss';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Eamil'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for (let formElementID in this.state.orderForm){
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        console.log(this.state.orderForm);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        console.log(order);

        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.length <= rules.maxLength & isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputID) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputID] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputID] = updatedFormElement;
        console.log(updatedFormElement);
        let formIsValid = true;
        for (let inputID in updatedOrderForm){
            formIsValid = updatedOrderForm[inputID].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        }

        
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>)
                })}
                <Button 
                    btnType="Success"
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));