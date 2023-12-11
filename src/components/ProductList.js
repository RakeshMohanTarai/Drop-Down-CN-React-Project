import React from "react";
import './ProductList.css'; // Import your CSS file

const ProductList = ({ products }) => {
    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Product List</h2>
            <ul className="product-list">
                {products.map((product) => {
                    return <li key={product.id}>{product.name}</li>
                })}
            </ul>
        </div>
    );
}

export default ProductList;
