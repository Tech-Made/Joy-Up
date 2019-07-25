
import React, {Component} from 'react';
import { connect } from "react-redux";
import { addItem } from '../redux/actions/index.js';
import { thisExpression } from '@babel/types';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inCheckout: this.props.inCheckout,
            options: [],
            modifiers: [],
            item: {}
        }
    }

    // create a function to update the options selected
    updateOptions = (id, price, name) => {

        const option = {}
        option['id'] = id;
        option['price'] = price;
        option['name'] = name;
        let updatedOptions = [...this.state.options]
        updatedOptions.push(option);
        this.setState({
            options: updatedOptions
        })
    }

    // create a function to update the options selected
    updateModifiers = (modifiersId, top_modifier_name, data_name, modifierId, modifier_data_name, modifier_data_price_amount) => {        
        const modifier = {}
        modifier['modifiersId'] = modifiersId;
        modifier['top_modifier_name'] = top_modifier_name;
        modifier['data_name'] = data_name;
        modifier['modifierId'] = modifierId;
        modifier['modifier_data_name'] = modifier_data_name;
        modifier['modifier_data_price_amount'] = modifier_data_price_amount;
        let updatedMods = [...this.state.modifiers];
        updatedMods.push(modifier);
        this.setState({
            modifier: updatedMods
        })
    }

    addItem = () => {
        const newItem = {...this.state.item};
        newItem['name'] = this.props.item.name;
        newItem['id'] =  this.props.item.id;
        newItem['options'] = this.state.options
        newItem['modifiers'] = this.state.modifiers

        this.props.addItem(newItem);
        console.log('this.props.inCheckout.lengthhhh:', this.props.inCheckout.length);
        
        this.props.updateItemsInCheckoutandHide(this.props.inCheckout.length)
    }

    render() {
        
        // console.log('OPT:', this.state.options);
        
        const item = this.props.item; 
        // console.log('item:', item); 
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
          <div className={showHideClassName}>
            <section className="modal-main">
                <i onClick={this.props.handleClose} className="close far fa-times-circle"></i>
                {item !== undefined
                ?
                    <div className='item-modal-content'>
                    <div className='content'>
                        <img src={item.image}></img>
                        <p className='title'>{item.name}</p>
                        {
                            <>
                            <p className='label'>Options</p>
                            {item.options.map((option, index) => {
                                // console.log('option in map:', option);
                                
                                return (
                                    <div key={index}>
                                        <label className="container">
                                        <p className='option-text'>{option.name}</p>
                                        <p className='option-text'>Price: {option.price}</p>
                                            <input type="checkbox"></input>
                                            <span onClick={() => this.updateOptions(option.id, option.price, option.name)} className="checkmark"></span>
                                        </label>
                                    </div>
                                )
                            })}
                            </>
                            
                        }
                    </div>
                        { item.modifiers[0] &&
                            // really only one index, but maybe more are added later so map is good.
                            
                            item.modifiers.map((modifiers, index) => {
                                // console.log('modifiers:', modifiers);
                                
                                return (
                                    <div className='content' key={index}>
                                        {
                                            // object of objects
                                            // go through the key and values of each entry  ob the object.
                                            Object.keys(modifiers.modifiers).map((_, keyIndex) => {
                                                if (modifiers.modifiers[keyIndex] !== undefined) {
                                                    const modifiersId = modifiers.modifiers[keyIndex].id;
                                                    const data = modifiers.modifiers[keyIndex].modifier_list_data
                                                    const data_name = data.name; // data_name                                       
                                                    const top_modifier_name = data.name; // top_modifier_name
                                                    // console.log('modifiersId:', modifiersId, 'top_modifier_name:', top_modifier_name, 'data_name:', data_name);
                                                    return data.modifiers.map((data, index) => {
                                                        const modifierId = data.id
                                                        // console.log('modifierId:', modifierId);
                                                        return (
                                                            <div key={index}>
                                                                <p className='mod-text'>{top_modifier_name}</p>
                                                                <label className="mod-cont">
                                                                <div className='mod-2-t'>
                                                                    <p className='mod-name mod-text'>{data.modifier_data.name}</p>
                                                                    <p className='mod-text'>Price: {data.modifier_data.price_money.amount}</p>
                                                                </div>

                                                                    <input type="checkbox"></input>
                                                                    <span  onClick={() => this.updateModifiers(modifiersId, top_modifier_name, data_name, modifierId, data.modifier_data.name, data.modifier_data.price_money.amount)} className="checkmark"></span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            })



                                        }
                                    </div>
                                )
                            })
                        }
                        <button onClick={this.addItem} className='add'>Add to cart</button>
                    </div>
                : null
                }
            </section>
          </div>
        );
    }
}
// const Modal = ({ handleClose, show, children }) => {


// };
// 
const mapStateToProps = state => {
    return {
        categoryIdxFocused: state.categoryIdxFocused,
        categories: state.categories,
        inCheckout: state.inCheckout
    };
};

function mapDispatchToProps() {
    return {
        addItem
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Modal);
