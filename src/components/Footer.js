import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Footer extends Component {
    constructor(props,context) {
        super(props, context);

        this.state = {
            inCheckout: this.props.inCheckout
        }
    }

    componentDidMount = () => {
        this.setState({
            inCheckout: this.props.inCheckout            
        })
    }

    render() {
        return (
            <Link to='/checkout'>
            <div className='footer'>
                {/* <p>{this.state.inCheckout.length}</p> */}
                <p> Checkout</p>
                <i className="fas fa-shopping-cart"></i>
            </div>
            </Link>
        );
    }
}

const mapStateToProps = state => {
    return {
        inCheckout: state.inCheckout
    };
};


export default connect(mapStateToProps, null)(Footer);
// export default Footer;
