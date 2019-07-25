import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link} from 'react-router-dom';
import '../styles/checkout.scss';

class Checkout extends Component {
    render() {
        return (
            <div className='top-down-page'>
                <div className='checkout-header nav'>
                    <Link to='/'><p className='item'><i class="fas fa-arrow-left"></i>back</p></Link>
                    <h1 className='checkout-title h1_primary'>Checkout</h1>
                </div>
                <div className='items'>
                    {this.props.inCheckout ?
                    this.props.inCheckout.map((item) => {
                        return (
                            <div key={item._id} className='item-container'>
                                <div className='img-container'>
                                    <img alt='food' className='item-img' src={item.image}></img>
                                </div>
                                <p key={item._id} className='item'>{item.name}</p>
                            </div>
                        )
                    }) : <p>Uh Oh, you have no items yet. Go back.</p>
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inCheckout: state.inCheckout,
    };
};


export default connect(mapStateToProps, null)(Checkout);
