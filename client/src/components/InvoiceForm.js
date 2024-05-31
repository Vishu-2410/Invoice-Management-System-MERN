import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = ({ fetchInvoices }) => {
  const [clientName, setClientName] = useState('');
  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [items, setItems] = useState([{ itemName: '', quantity: '', price: '' }]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!clientName) newErrors.clientName = 'Client name is required';
    if (tax === '') newErrors.tax = 'Tax is required';
    if (tip === '') newErrors.tip = 'Tip is required';
    items.forEach((item, index) => {
      if (!item.itemName) newErrors[`itemName${index}`] = 'Item name is required';
      if (item.quantity === '') newErrors[`quantity${index}`] = 'Quantity is required';
      if (item.price === '') newErrors[`price${index}`] = 'Price is required';
    });
    return newErrors;
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: '', quantity: '', price: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await axios.post('http://localhost:5000/invoices', { clientName, items, tax: parseFloat(tax), tip: parseFloat(tip) });
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice', error);
    }
  };

  return (
    <div /*className='formContainer'*/ className='form'>
      <h1>Invoice Management System</h1>
    <form onSubmit={handleSubmit}>
      <label>Customer Name</label>
      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        // required
      />
      {errors.clientName && <div className="error">{errors.clientName}</div>}
      <br></br>
      <label>Tax</label>
      <br></br>
      <input
        type="number"
        placeholder="Tax"
        value={tax}
        onChange={(e) => setTax(e.target.value)}
        // required
      />
      {errors.tax && <div className="error">{errors.tax}</div>}
      <br></br>
      <label>Tip</label>
      <br></br>
      <input
        type="number"
        placeholder="Tip"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        // required
      />
      <br></br>
      {errors.tip && <div className="error">{errors.tip}</div>}
      <br></br><br></br>
      {items.map((item, index) => (
        <div key={index} /*className="item"*/  className="invoice-item">
          <label>Item name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={item.itemName}
            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
            // required
          />
          {errors[`itemName${index}`] && <div className="error">{errors[`itemName${index}`]}</div>}
          
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            // required
          />
          {errors[`quantity${index}`] && <div className="error">{errors[`quantity${index}`]}</div>}
          
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            //required
          />
          {errors[`price${index}`] && <div className="error">{errors[`price${index}`]}</div>}
        </div>
      ))}
      
      <button type="button" onClick={addItem}>Add Item</button>
      <button type="submit">Create Invoice</button>
    </form>
    </div>
  );

};

export default InvoiceForm;
