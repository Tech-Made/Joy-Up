import React, {Component} from 'react';

import { setCategoryIdxFocused } from '../redux/actions/index.js';
import { connect } from "react-redux";

class Navbar extends Component {

  componentDidMount = () => {
    if (this.props.categories.menu) {
      const firstItem = document.getElementById('0');
      firstItem.classList.add("active-tab");  
    }
  } 

  handleCategoryChange = (e) => {
    this.props.setCategoryIdxFocused(e.target.id);
    let els = document.querySelectorAll('.nav-item')
    
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('active-tab');
    }
    document.getElementById(e.target.id).classList.add('active-tab');

  }

  render() {
    return (
      <div className='nav'>
        <div className='top-nav'>
          {/* <img src={logo}></img> */}
          <h1 className='h1_primary'>Menu</h1>
        </div>
        <div className='categories scrollmenu'>
          {this.props.categories.menu !== undefined
          ?
            this.props.categories.menu.map((menu,idx) => {
              return(
                <p onClick={(e) => this.handleCategoryChange(e)} id={idx} key={menu._id} className='nav-item'>{menu.name}</p>
              )
            })
          :
            <p>Loading</p>}
        </div>
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
    setCategoryIdxFocused
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
