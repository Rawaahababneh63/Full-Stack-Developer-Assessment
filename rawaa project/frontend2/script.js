const API_URL = 'http://localhost:3000/api/products';
const PAYMENT_API_URL = 'http://localhost:3000/api/payments';

// Stripe Initialization
const stripe = Stripe('pk_test_51QgoxTHI8ONCXGGKZx6tzhcXafMjFQGjc1TC8UcKOglc6tw2IsXxgTvxXDVB2OFi8xM1wYmOma9F3reEAV5fD5fL00pUXCzuyU'); // Replace with your Stripe publishable key
const elements = stripe.elements();

// Create an instance of the card element
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Fetch all products for the homepage
const fetchProducts = async () => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = 'Loading products...';

  console.log('Fetching all products from API:', API_URL);

  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    console.log('Products fetched:', products);

    productList.innerHTML = ''; // Clear loading message
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn-primary pay-button" data-price="${product.price}" data-id="${product.id}">
          Pay Now
        </button>
      `;
      productList.appendChild(productCard);
    });

    // Add event listeners for "Pay Now" buttons
    const payButtons = document.querySelectorAll('.pay-button');
    payButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const price = button.getAttribute('data-price');
        console.log(`Pay button clicked. Initiating payment for $${price}`);
        await handlePayment(price); // Initiate payment
      });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    productList.innerHTML = 'Failed to load products.';
  }
};

// Add a new product
const addProduct = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  console.log('Adding new product:', { name, description, price });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
      alert('Product added successfully!');
      fetchProducts(); // Reload products
      document.getElementById('add-product-form').reset(); // Clear the form
    } else {
      console.error('Failed to add product:', response.statusText);
      alert('Failed to add product. Please try again.');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Error adding product. Please try again later.');
  }
};

// Handle Stripe payment
const handlePayment = async (price) => {
  console.log(`Initiating payment for amount: $${price}`);

  try {
    // Create payment intent on the backend
    const response = await fetch(PAYMENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price * 100 }), // Stripe uses cents
    });

    if (!response.ok) {
      console.error('Failed to create payment intent:', response.statusText);
      alert('Failed to initiate payment. Please try again later.');
      return;
    }

    const { clientSecret } = await response.json();
    console.log('Received client secret from backend:', clientSecret);

    // Confirm the payment
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
      alert(`Payment failed: ${error.message}`);
    } else {
      console.log('Payment successful!');
      alert('Payment successful!');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed.');
  }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-list')) {
    console.log('Homepage detected. Fetching all products...');
    fetchProducts();
  }

  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
});
