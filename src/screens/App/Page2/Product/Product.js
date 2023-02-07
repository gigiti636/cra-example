import React, { memo } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Product.scss';

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //add product to cart handler
    const addProduct = () => {};

    const main_image = product.images[0]

    return (
        <div key={product?.id} className={'mb-3'}>
            <Card
                style={{ width: "18rem", textAlign: "center" }}
                className={'productCard'}
            >
                <Card.Img
                    onClick={() => navigate(`/products/${product?.id}`)}
                    variant="top"
                    src={product?.images[0]}
                    className={'cardImg'}
                />
                <Card.Body>
                    <Card.Title>{product?.title}</Card.Title>
                    <Card.Text>${product?.price}</Card.Text>
                    <Button className={'commonBtn'} onClick={addProduct}>
                        ADD TO CART
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default memo(ProductCard);