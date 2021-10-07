import React from 'react';
import {Card, Button} from "antd";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const { Meta } = Card; 

const Product = ({product, description, uploadImages, link, thumbnail, showBtn}) => {
    return (
        <div style={{padding:"15px", textAlign:"center"}}>
            <Link to={link || ""}>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={
                <img
                    alt="example"
                    src={thumbnail}
                />
                }
                
            >
                <Meta
                title={<h4>{product.name}</h4>}
                description={description}
                />
                {showBtn && <Link className="btn btn-primary" to={uploadImages}>Add Images</Link>}
            </Card>
            </Link>,
        </div>
    )
}
Product.propTypes={
    product: propTypes.object.isRequired,
    description: propTypes.func.isRequired,
    buttonName: propTypes.string,
}
export default Product;