document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', submitForm);
});

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const table = form.id; // Use the form's id as the table name

    // Create the data object dynamically based on the form elements
    const data = {
        table: form.id,
        product_name: formData.get('product_name'), // Ensure this is unique for each form
        quantity: formData.get('quantity'),
        unit_price: formData.get('unit_price'),
        purchase_date: formData.get('purchase_date'),
        expiry_date: formData.get('expiry_date'),
    };

    // Log the data to help debug
    console.log('Submitting data:', JSON.stringify(data));

    // Construct the endpoint based on the table name
    const endpoint = `http://127.0.0.1:3000/submit/`;  // Assuming same endpoint for all tables

    // Send data to the backend via fetch
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to submit entry');
            }
            return response.json();
        })
        .then((result) => {
            console.log('Success:', result);
            // Show a success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `Product added to ${data.table} successfully!`,
                confirmButtonText: 'OK'
            });
            form.reset(); // Clear the form fields
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show an error alert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `An error occurred while submitting the form. (${error.message})`,
                confirmButtonText: 'Retry'
            });
        });
}
