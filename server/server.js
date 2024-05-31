const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
const port=5000;

//middleware
app.use(bodyParser.json());
app.use(cors());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/invoice-app',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connected to database');
})

//Item schema
const invoiceSchema = new mongoose.Schema({
    clientName: String,
    items: [
      {
        ItemName: String,
        quantity: Number,
        price: Number,
      }
    ],
    tax:Number,
    tip:Number,
    totalAmount: Number,
    invoiceDate: {
      type: Date,
      default: Date.now
    },
  });
  
  const Invoice = mongoose.model('Invoice', invoiceSchema);

//Routes
app.get('/invoices', async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).send(invoices);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

app.post('/invoices', async (req, res) => {
  const { clientName, items,tax,tip } = req.body;
  let totalAmount = 0;
  items.forEach(item => {
    totalAmount += ((item.quantity * item.price)+tax+tip);
  });

  const newInvoice = new Invoice({
    clientName,
    tax,
    tip,
    items,
    totalAmount,
  });

  try {
    const savedInvoice = await newInvoice.save();
    res.status(201).send(savedInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.put('/invoices/:id', async (req, res) => {
    const { clientName, tip,tax, items } = req.body;
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += (item.quantity * item.price)+tax+tip;
    });
  
    try {
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        {
          clientName,
          tax,
          tip,
          items,
          totalAmount,
        },
        { new: true }
      );

      if (!updatedInvoice) {
        return res.status(404).send('Invoice not found');
      }
      res.status(200).send(updatedInvoice);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  app.delete('/invoices/:id', async (req, res) => {
    try {
      const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!deletedInvoice) {
        return res.status(404).send('Invoice not found');
      }
      res.status(200).send(deletedInvoice);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

