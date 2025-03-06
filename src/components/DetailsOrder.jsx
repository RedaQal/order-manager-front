import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function DetailsOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8080/api/orders')
            .then(res => setOrder(res.data.find(el => el.orderId === id)));
    }, [id])

    return (
        <div className='w-75 m-auto text-center mt-4'>
            <Link to={"/list-orders"} className='btn btn-primary btn-sm float-start'>Back</Link>
            <h3 className='mb-4'>Details order</h3>
            <table className='table table-hover'>
                <tr >
                    <th colSpan="4">Order id</th>
                    <td colSpan="4">{order.orderId}</td>
                </tr>
                <tr>
                    <th colSpan="4">Customer id</th>
                    <td colSpan="4">{order.customerId}</td>
                </tr>
                <tr>
                    <th colSpan="4">Payment Method</th>
                    <td colSpan="4">{order.paymentMethod}</td>
                </tr>
                <tr>
                    <th colSpan={8} >Items</th>
                </tr>
                {order.items?.map(item => (
                    <tr key={item.productId}>
                        <th>Product Id</th>
                        <td> {item.productId}</td>
                        <th>Product name</th>
                        <td>{item.productName}</td>
                        <th>Quantity</th>
                        <td>{item.quantity}</td>
                        <th>Unit Price({item.currency})</th>
                        <td>{item.unitPrice}</td>
                    </tr>
                ))}

                <tfoot>
                    <tr>
                        <th colSpan={6} className='text-end'>Total Amount({order.currency})</th>
                        <td colSpan={2} className='bg-success text-light'>{order.totalAmount} €</td>
                    </tr>
                </tfoot>
            </table>
            <h3 className='text-start'>Shipping Address</h3>
            <table className='table table-bordered w-50 m-auto text-start'>
                <tr>
                    <th>Street</th>
                    <td>{order.shippingAddress?.street}</td>
                </tr>
                <tr>
                    <th>City</th>
                    <td>{order.shippingAddress?.city}</td>
                </tr>
                <tr>
                    <th>Postal Code</th>
                    <td>{order.shippingAddress?.postalCode}</td>
                </tr>
                <tr>
                    <th>Country</th>
                    <td>{order.shippingAddress?.country}</td>
                </tr>
            </table>

        </div>
    )
}
