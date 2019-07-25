import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { getCategories } from '../redux/actions/index.js';


class Categories extends Component {
    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div className='top-down-page'>
            <p>Home</p>
            <Link to='/dashboard'>Enter App</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
    };
};

function mapDispatchToProps() {
    return {
        getCategories
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Categories);
