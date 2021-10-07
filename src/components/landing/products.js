import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card } from 'antd';
import {getProducts} from "../../actions/productAction";
import Product from '../general/Product';

const { Meta } = Card;

class Products extends Component {
    constructor(props){
        super(props);
        this.state= {
            products: [],
        };
    }
    componentDidMount(){
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.products.products){
            const products = nextProps.products.products;
            this.setState({products});
        }
    }

    productDetails = (product)=> {
        return(
            <ul style={{textAlign:"center"}}>
                <li>INR {product.price}</li>
                <li>quantity : {product.quantity}</li>
            </ul>
        )
    }
    render() {
        const {products} = this.state;
        return (
            <div className="container">
                <div className="row">
                    {products.map((product, index)=>(
                        <Product
                        key={index}
                        link={`products/${product._id}`} 
                        product={product}
                        description={this.productDetails(product)}
                        thumbnail={product.thumbnail}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapToStateProps = (state)=>({
    products: state.products,
});

export default connect(mapToStateProps, {getProducts})(Products);
