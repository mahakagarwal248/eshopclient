import React, { Component, Fragment} from 'react';
import {getProduct} from "../../actions/productAction";
import {connect} from "react-redux";
import { Spin, Space, Button, Rate, Modal, Alert} from 'antd';
import Navbar from '../../components/general/navbar';
import {Link} from "react-router-dom";
import {isEmpty} from "lodash";
import { decodeUser } from '../../util';
import {addToCart} from "../../actions/CartActions";

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            product: null,
            visible: false,
        };
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    };
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.product){
            const product = nextProps.product;
            this.setState({product});
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
          this.setState({ 
            visible: false,
        });
      };  
    
      handleCancel = () => {
        this.setState({ 
            visible: false 
        });
      };

    registerModal = (product)=>{
        return(
            <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer ={[
                    <Button key="back" onClick={this.handleCancel}>
                        close
                    </Button>
                ]}
                >
                 <div>
                     <br/>
                     <Alert message={
                         <center>
                             <span style={{fontSize:"16px"}}>
                                 <strong>Added</strong> <b>{product.name} to the Cart</b>
                             </span>
                         </center>
                     } type="success">
                     </Alert>
                     <br/>
                     <center>
                         <Link to="/cart?redirect=/cart">
                            <Button key="submit" type="primary" style={{backgroundColor:"#993300"}}>Go to Cart</Button>
                         </Link>
                     </center>
                 </div>
            </Modal>
        );
    };

    async addProductToCart(product){
        //check if the user is signed in
        if(!localStorage.getItem("token")){
            const productExists = !isEmpty(localStorage.getItem("products"));
            if(productExists){
                const products = JSON.parse(localStorage.getItem("products"));
                products.push(product._id);
                this.showModal();
                return localStorage.setItem("products", JSON.stringify([product._id]));
            }else{
                this.showModal();
                return localStorage.setItem("products", JSON.stringify([product._id]));
            }
        }
        const userId = decodeUser().user.id;
        const context = {products:[product._id], userId};
        await this.props.addToCart(context)
        this.showModal();
    }
    render() {
        const {product} = this.state;
        return (
            <Fragment>
            <Navbar/>
            <div className="container">
                {product ? (
                <Fragment>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <img src="/assets/images/laptop.jpg" alt="product" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <h1 style={{margin: "0"}}>{product.name}</h1>
                        <p className="lead" style={{margin: "0"}}>Description: {product.description}</p>
                        <p className="lead" style={{margin: "0"}}>Features:</p>
                        <ul style={{marginLeft:"5%", marginTop:"0"}}>
                            {product.features.map((feature, index)=>
                            <li key={index}>{feature}</li>)}
                        </ul>
                        <Rate disabled allowHalf defaultValue={product.rating} style={{margin: "0"}}/>
                        <p className="lead" style={{margin: "0"}}>Quantity: {product.quantity}</p>
                        <h1>${product.price}</h1>
                        <Button type="primary" style={{backgroundColor:"#993300", border:"2px solid black"}} onClick={(_)=> this.addProductToCart(product)}>Add to Cart</Button>
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <h1>Product Details</h1>
                <p className="lead">
                    <b>{product.details}</b>
                </p>
                <p className="lead" style={{margin: "0"}}>Main Features of Product:</p>
                <ul style={{marginLeft:"5%", marginTop:"0"}}>
                    {product.features.map((feature, index)=>
                    <li key={index}>{feature}</li>)}
                </ul>
                </Fragment>
                ) : (
                <Space size="middle">
                    <Spin size="large" />
                </Space>
                )}
            </div>
            {product && this.registerModal(product)}
            </Fragment>
        );
    }
};

const MapStateToProps = (state) =>({
    product: state.products.product,
})
export default connect(MapStateToProps, {getProduct, addToCart})(ProductDetails);