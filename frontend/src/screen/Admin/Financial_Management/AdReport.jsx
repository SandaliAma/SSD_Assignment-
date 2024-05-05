import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function AdReport() {
    const [allPayments, setAllPayments] = useState([]);
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

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 20,
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            alignItems: 'center',
            height: 24,
        },
        header: {
            fontWeight: 'bold',
        },
        cell: {
            flexGrow: 1,
            fontSize: 10,
        },
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.header}>My Payments for {selectedMonth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Student IT Number</Text>
                    <Text style={styles.cell}>Description</Text>
                    <Text style={styles.cell}>Date</Text>
                    <Text style={styles.cell}>Amount</Text>
                    <Text style={styles.cell}>Type</Text>
                    <Text style={styles.cell}>Status</Text>
                </View>
                {allPayments.map((payment) => (
                    <View key={payment._id} style={styles.row}>
                        <Text style={styles.cell}>{payment.itnumber}</Text>
                        <Text style={styles.cell}>{payment.discription}</Text>
                        <Text style={styles.cell}>{payment.date}</Text>
                        <Text style={styles.cell}>{payment.amount}</Text>
                        <Text style={styles.cell}>{payment.type}</Text>
                        <Text style={styles.cell}>{payment.status}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );

    return (
        <div>
            <div className='bodymv'>
                <h1 className='h1mv'>My Payments for {selectedMonth}</h1>
                <br /><br /><br /><br />
                <PDFDownloadLink document={<MyDocument />} fileName="payments.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
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
                            {allPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.itnumber}</td>
                                    <td>{payment.discription}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.type}</td>
                                    <td>{payment.status}</td>
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
