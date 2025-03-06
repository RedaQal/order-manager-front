import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

export default function AddOrder() {
    const [formData, setFormData] = useState({
        customerId: '',
        paymentMethod: 'CREDIT_CARD',
        shippingAddress: {
            street: '',
            city: '',
            postalCode: '',
            country: ''
        },
        items: [],
        totalAmount: 0,
        currency: 'USD',
        status: 'PENDING'
    });
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const toast = useToast()

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('shippingAddress')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const product = products.find(p => p.productId === productId);
        setSelectedProduct(product);
    };

    const handleAddProduct = () => {
        if (!selectedProduct || quantity < 1) {
            alert('Please select a product and enter a valid quantity.');
            return;
        }

        const newProduct = {
            productId: selectedProduct.productId,
            productName: selectedProduct.productName,
            quantity: quantity,
            unitPrice: selectedProduct.unitPrice,
            currency: selectedProduct.currency
        };

        setFormData(prev => ({
            ...prev,
            items: [...prev.items, newProduct],
            totalAmount: prev.totalAmount + newProduct.unitPrice * newProduct.quantity
        }));

        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...formData.items];
        const removedProduct = updatedProducts.splice(index, 1)[0];
        setFormData(prev => ({
            ...prev,
            items: updatedProducts,
            totalAmount: prev.totalAmount - removedProduct.unitPrice * removedProduct.quantity
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerId) newErrors.customerId = 'Customer ID is required';
        if (formData.items.length === 0) newErrors.products = 'At least one product is required';
        if (!formData.shippingAddress.street) newErrors.shippingAddressStreet = 'Street is required';
        if (!formData.shippingAddress.city) newErrors.shippingAddressCity = 'City is required';
        if (!formData.shippingAddress.postalCode) newErrors.shippingAddressPostalCode = 'Postal Code is required';
        if (!formData.shippingAddress.country) newErrors.shippingAddressCountry = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:8080/api/orders', formData);
            toast({
                title: 'Success.',
                description: "Order added successfully!",
                status: 'success',
                position: "top",
                duration: 5000,
                isClosable: true,
            })
            navigate('/list-orders');
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5 w-75 m-auto">
            <div className="card p-4 shadow-sm">
            <h2 className="mb-4 text-center">Add New Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input
                        type="text"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className={`form-control ${errors.customerId ? 'is-invalid' : ''}`}
                    />
                    {errors.customerId && <div className="invalid-feedback">{errors.customerId}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Product</label>
                    <select
                        name="productId"
                        value={selectedProduct ? selectedProduct.productId : ''}
                        onChange={handleProductChange}
                        className={`form-control ${errors.products ? 'is-invalid' : ''}`}
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.productId} value={product.productId}>
                                {product.productName} - {product.unitPrice} {product.currency}
                            </option>
                        ))}
                    </select>
                    {errors.products && <div className="invalid-feedback">{errors.products}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        min="1"
                        className="form-control"
                    />
                </div>

                <button type="button" onClick={handleAddProduct} className="btn btn-secondary mb-3 w-25 d-block m-auto">
                    Add Product
                </button>

                <div className="mb-3 w-75 text-center m-auto">
                    <h4>Selected Products</h4>
                    {formData.items.map((product, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <span>
                                {product.productName} (x{product.quantity}) - {product.unitPrice * product.quantity} {product.currency}
                            </span>
                            <button type="button" onClick={() => handleRemoveProduct(index)} className="btn btn-danger btn-sm">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                        type="text"
                        name="totalAmount"
                        value={formData.totalAmount.toFixed(2)}
                        readOnly
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Shipping Address</label>
                    <input
                        type="text"
                        name="shippingAddress.street"
                        value={formData.shippingAddress.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className={`form-control mb-2 ${errors.shippingAddressStreet ? 'is-invalid' : ''}`}
                    />
                    {errors.shippingAddressStreet && <div className="invalid-feedback">{errors.shippingAddressStreet}</div>}

                    <input
                        type="text"
                        name="shippingAddress.city"
                        value={formData.shippingAddress.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={`form-control mb-2 ${errors.shippingAddressCity ? 'is-invalid' : ''}`}
                    />
                    {errors.shippingAddressCity && <div className="invalid-feedback">{errors.shippingAddressCity}</div>}

                    <input
                        type="text"
                        name="shippingAddress.postalCode"
                        value={formData.shippingAddress.postalCode}
                        onChange={handleChange}
                        placeholder="Postal Code"
                        className={`form-control mb-2 ${errors.shippingAddressPostalCode ? 'is-invalid' : ''}`}
                    />
                    {errors.shippingAddressPostalCode && <div className="invalid-feedback">{errors.shippingAddressPostalCode}</div>}

                    <input
                        type="text"
                        name="shippingAddress.country"
                        value={formData.shippingAddress.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className={`form-control mb-2 ${errors.shippingAddressCountry ? 'is-invalid' : ''}`}
                    />
                    {errors.shippingAddressCountry && <div className="invalid-feedback">{errors.shippingAddressCountry}</div>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                    {isSubmitting ? 'Submitting...' : 'Add Order'}
                </button>
            </form>
        </div>
        </div>
    );
}