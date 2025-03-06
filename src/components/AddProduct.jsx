import axios from "axios";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'

export default function AddProduct() {
    const [formData, setFormData] = useState({
        productId: "",
        productName: "",
        quantity: "",
        unitPrice: "",
        currency: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.productId) newErrors.productId = "Required product ID";
        if (!formData.productName) newErrors.productName = "Required product name";
        if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Invalid quantity";
        if (!formData.unitPrice || formData.unitPrice <= 0) newErrors.unitPrice = "Invalid price";
        if (!formData.currency) newErrors.currency = "Required currency";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:8080/api/products', formData);
            toast({
                title: 'success',
                description: "product added successfully!",
                status: 'success',
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            setFormData({
                productId: "",
                productName: "",
                quantity: "",
                unitPrice: "",
                currency: ""
            })
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mt-5 w-50 m-auto">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Add product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Product ID</label>
                        <input name="productId" value={formData.productId} onChange={handleChange} className="form-control" />
                        {errors.productId && <div className="text-danger">{errors.productId}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input name="productName" value={formData.productName} onChange={handleChange} className="form-control" />
                        {errors.productName && <div className="text-danger">{errors.productName}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control" />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Unit price (€)</label>
                        <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="form-control" />
                        {errors.unitPrice && <div className="text-danger">{errors.unitPrice}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Currency</label>
                        <select name="currency" value={formData.currency} onChange={handleChange} className="form-control">
                            <option value="">Select a currency</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="MAD">MAD</option>
                        </select>
                        {errors.currency && <div className="text-danger">{errors.currency}</div>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                        {isSubmitting ? 'Submitting...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}
