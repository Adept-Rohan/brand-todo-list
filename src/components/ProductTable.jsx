import React, { useState } from 'react';

const ProductsTable = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProduct, setEditProduct] = useState('');


    const addBrandAndProduct = () => {
        if (newBrand && newProduct) {
            const updatedBrands = [...brands];
            const existingBrandIndex = updatedBrands.findIndex((brand) => brand.name === newBrand);

            if (existingBrandIndex !== -1) {
                updatedBrands[existingBrandIndex].products.push(newProduct);
            } else {
                updatedBrands.push({ name: newBrand, products: [newProduct] });
            }

            setBrands(updatedBrands);
            setNewBrand('');
            setNewProduct('');
        }
    };


    const handleDeleteProduct = (brand, product) => {
        const updatedBrands = brands.map((brandData) => {
            if (brandData.name === brand) {
                return {
                    ...brandData,
                    products: brandData.products.filter((p) => p !== product),
                };
            }
            return brandData;
        });

        setBrands(updatedBrands);
    };


    const handleStartEdit = (product) => {
        setEditingProduct(product);
        setEditProduct(product);
    };


    const handleCancelEdit = () => {
        setEditingProduct(null);
        setEditProduct('');
    };


    const handleUpdateProduct = (brand, oldProduct, newProduct) => {
        const updatedBrands = brands.map((brandData) => {
            if (brandData.name === brand) {
                return {
                    ...brandData,
                    products: brandData.products.map((p) => (p === oldProduct ? newProduct : p)),
                };
            }
            return brandData;
        });

        setBrands(updatedBrands);
        setEditingProduct(null);
    };


    const renderCRUDOperations = (brand, product) => {
        if (editingProduct === product) {
            return (
                <td>
                    <input
                        type="text"
                        value={editProduct}
                        onChange={(e) => setEditProduct(e.target.value)}
                    />
                    <button onClick={() => handleUpdateProduct(brand, product, editProduct)}>Submit</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </td>
            );
        }

        return (
            <td>
                <button onClick={() => handleStartEdit(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(brand, product)}>Delete</button>
            </td>
        );
    };

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <label>
                    Brand Name:
                    <input type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} />
                </label>
                <label>
                    Product Name:
                    <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
                </label>
                <button onClick={addBrandAndProduct}>Add</button>
            </div>
            <div>
                {brands.map((brandData, index) => (
                    <div key={index}>
                        <h3>{brandData.name}</h3>
                        <div >
                            {brandData.products.map((product, pIndex) => (
                                <div key={pIndex}>
                                    {product} {renderCRUDOperations(brandData.name, product)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsTable;
