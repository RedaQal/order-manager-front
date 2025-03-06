import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading';


export default function ListOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/orders')
            .then(res => setOrders(res.data));
    }, [])

    return (
        <>
            {
                orders.length === 0 ? <Loading /> :
                    <table className='table table-striped w-75 m-auto text-center mt-3'>
                        <caption className='caption-top'>List orders</caption>
                        <thead className='table-dark text-light'>
                            <tr>
                                <th>Order id</th>
                                <th>Customer Id</th>
                                <th>Payment Method</th>
                                <th>Total Amount</th>
                                <th>Currency</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.customerId}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.currency}</td>
                                    <td>{order.status}</td>
                                    <td><Link to={`/details-order/${order.orderId}`} className="btn btn-outline-primary btn-sm">Details</Link></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
            }
        </>
    )
}
