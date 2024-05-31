# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

EXPLANATION:-
 -------------------------------------------- App.js--------------------------------------------=
This is the main file of the project. It contains the main component of the project
which is the App component. This component is responsible for rendering the entire
user interface of the project. It also contains the state of the project which is
used to store the data of the project.

Explanation
1.Imports:
-useEffect and useState from React for managing component lifecycle and state.
-axios for making HTTP requests to the backend.
-InvoiceForm and InvoiceList components.
-CSS files for styling and animations.

2.State Management:
-invoices state is initialized as an empty array. This will hold the list of invoices fetched from the backend.

3.fetchInvoices Function:
-This function uses axios to send a GET request to the backend (http://localhost:5000/invoices) to fetch the list of invoices.
-The fetched invoices are stored in the invoices state using setInvoices.

4.useEffect Hook:
This hook ensures that fetchInvoices is called once when the component mounts, so the invoices are fetched and displayed when the app loads.

5.Render Method:
The component renders a title, the InvoiceForm component (for creating new invoices), and the InvoiceList component (for displaying the invoices).
fetchInvoices is passed as a prop to both components so they can trigger a refresh of the invoice list after creating or deleting an invoice.

----------------------InvoiveForm.js-------------------------------------------------
This component provides a form for creating new invoices. Users can input client details and add items with quantities and prices.
When the form is submitted, the data is sent to the backend using axios to create a new invoice
and the component is refreshed to display the updated list of invoices.

Explanation
1.State Management:
-clientName, tax, tip, and items states are used to manage form inputs.

2.handleItemChange Function:
This function updates the values of the items in the invoice when the user changes them. It takes the index of the item, the key (either itemName, quantity, or price), and the new value.

3.addItem Function:
Adds a new item object to the items state, allowing the user to add multiple items to the invoice.

4.handleSubmit Function:
Prevents the default form submission.
Sends a POST request to the backend with the invoice details (client name, items, tax, tip).
Calls fetchInvoices to refresh the invoice list after a new invoice is created.

5.Render Method:
Renders a form with inputs for client name, tax, tip, and items.
Includes a button to add more items and a submit button to create the invoice.

6.State for Errors:
Added errors state to keep track of validation errors.

7.validate Function:
This function checks each input field and returns an object containing error messages for fields that are empty or invalid.

8.handleSubmit Function:
Calls validate before submitting the form.
If there are validation errors, the errors are set in the errors state, and form submission is prevented.
If there are no validation errors, the form is submitted.

9.Error Messages in JSX:
Conditionally render error messages below each input field if there are validation errors.


-----------------------------------InvoiceList.js-----------------------------------------------------
This component displays the list of invoices and provides buttons to print, bill, and delete invoices.

Explanation
1.Props:
invoices: An array of invoices passed from the App component.
fetchInvoices: A function passed from the App component to refresh the list of invoices after an invoice is deleted.

2.handlePrint Function:
Opens a new window and writes the invoice details into it.
Calls the print method on the new window to print the invoice.