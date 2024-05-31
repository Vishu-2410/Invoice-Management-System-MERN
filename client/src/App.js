import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import './App.css';
//import './components/animation.css';

const App = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="App">
      <InvoiceForm fetchInvoices={fetchInvoices} />
      <InvoiceList invoices={invoices} fetchInvoices={fetchInvoices} />
    </div>
  );
};

export default App;
