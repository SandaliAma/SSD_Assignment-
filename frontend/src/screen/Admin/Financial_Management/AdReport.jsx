import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AdReport() {
    const [allmpayments, setAllPayments] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    const fetchPayments = async () => {
        try {
            const [onlineRes, bankRes, cashRes] = await Promise.all([
                axios.get('http://localhost:5000/displayonline'),
                axios.get('http://localhost:5000/displaybank'),
                axios.get('http://localhost:5000/displaycash')
            ]);
            const onlinePayments = onlineRes.data;
            const bankPayments = bankRes.data;
            const cashPayments = cashRes.data;
            const allPayments = [...onlinePayments, ...bankPayments, ...cashPayments];
            const filteredPayments = allPayments.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
            });
            setAllPayments(filteredPayments);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth]);

    return (
        <div>
            <div className='bodymv'>
                <h1 className='h1mv'>My Payments for {selectedMonth}</h1>
                <br /><br /><br /><br />
                <div className="tbl-headermv">
                    <table>
                        <thead>
                            <tr>
                                <th>Student IT Number</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-contentmv">
                    <table>
                        <tbody>
                            {allmpayments.map((allmpayment) => (
                                <tr key={allmpayment._id}>
                                    <td>{allmpayment.itnumber}</td>
                                    <td>{allmpayment.discription}</td>
                                    <td>{allmpayment.date}</td>
                                    <td>{allmpayment.amount}</td>
                                    <td>{allmpayment.type}</td>
                                    <td>{allmpayment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdReport;
