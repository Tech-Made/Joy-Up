import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import NavBar from '../components/NavBar';
import { getCategories, addItem } from '../redux/actions/index.js';
import Modal from '../components/Modal.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemSelected: undefined,
            show: false,
            inCheckout: this.props.inCheckout.length
        }
    }
    
    showModal = (item) => {        
        // console.log('item here:', item);
        this.setState({
            show: true,
            itemSelected: item
        });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

    componentDidMount() {
        // oncomponentmount, later make this reset the categoryIdxSelected  back to 0.
        this.props.getCategories();
        this.setState({
            inCheckout: this.props.inCheckout.length          
        })
        // console.log('this.props.categories.menu[0].items:', this.props.categories.menu[0].items);
    };

    // addItem = (item) => {
    //     this.props.addItem(item)
    //     this.setState({
    //         inCheckout: this.props.inCheckout            
    //     })
    // }
    
    updateItemsInCheckoutandHide = (num) => {
        console.log('hit');
        
        console.log('num:', num);
        
        this.setState({
            inCheckout: num,
            show: false,                      
        })
    }

    render() {
        console.log('this.state.inCheckout:', this.state.inCheckout);
        
        return (
            <>
                <NavBar/>
                <div className='top-down-page'>
                    <div className='items'>
                        {
                        this.props.categories.menu !== undefined
                        ?
                        this.props.categories.menu[this.props.categoryIdxFocused].items.map((item, index) => {
                            return(
                                <div key={item._id} className='item-container'>
                                    <div className='img-container'>
                                        <img alt='food' className='item-img' src={item.image}></img>
                                    </div>
                                    <p key={item._id} className='item'>{item.name}</p>
                                    <i id='myBtn' onClick={() => this.showModal(item)} className="add-icon fas fa-plus-circle"></i>                       
                                    {/* <i id='myBtn' onClick={() => this.addItem(item)} className="add-icon fas fa-plus-circle"></i> */}
                                </div>
                            )
                        })
                        :
                        <p>Loading</p>
                        }
                        
                        <Modal updateItemsInCheckoutandHide={(num) => this.updateItemsInCheckoutandHide(num)} show={this.state.show} item={this.state.itemSelected} handleClose={this.hideModal}>
                            <p>Modal</p>
                            <p>Data</p>
                        </Modal>
                    </div>
                </div>
                <Link to='/checkout'>
                    <div className='footer'>
                        <p>{this.state.inCheckout} items in</p>
                        <p>Checkout</p>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </Link>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        categoryIdxFocused: state.categoryIdxFocused, 
        categories: state.categories,
        inCheckout: state.inCheckout
    };
};

function mapDispatchToProps() {
    return {
        getCategories,
        addItem
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Dashboard);
