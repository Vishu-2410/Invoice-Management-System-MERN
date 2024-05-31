import React from 'react';
import axios from 'axios';

const InvoiceList = ({ invoices, fetchInvoices }) => {
  const handlePrint = (invoice) => {
    const printContent = `
      <div>
        <h1>Invoice</h1>
        <p>Client: ${invoice.clientName}</p>
        <h2>Items</h2>
        <ul>
          ${invoice.items.map(item => `
            <li>${item.itemName} - ${item.quantity} x $${item.price}</li>
          `).join('')}
        </ul>
        <p>Tax: $${invoice.tax}</p>
        <p>Tip: $${invoice.tip}</p>
        <h3>Total: $${invoice.totalAmount}</h3>
      </div>
    `;
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  const handleBill = (invoice) => {
    alert(`Billing ${invoice.clientName} for $${invoice.totalAmount}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/invoices/${id}`);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice', error);
    }
  };

  return (
    <div className='customer-invoices'>
      <h2>Customer's Invoice</h2>
      {invoices.map((invoice) => (
        <div key={invoice._id} /*className="invoice-item"*/  className="customer-section">
          <h3>Customer's Name:{invoice.clientName}</h3>
          <div className='invoice-actions'>
          <button className="print-btn" onClick={() => handlePrint(invoice)}>Print</button>
          <button className="bill-btn" onClick={() => handleBill(invoice)}>Bill</button>
          <button className="delete-btn" onClick={() => handleDelete(invoice._id)}>Delete</button>
        </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
