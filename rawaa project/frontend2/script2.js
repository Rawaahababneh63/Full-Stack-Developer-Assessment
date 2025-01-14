const API_URL = 'http://localhost:3000/api/products';

// Fetch all products for admin dashboard
const fetchAdminProducts = async () => {
  const productList = document.getElementById('admin-product-list');
  productList.innerHTML = 'Loading products...';

  console.log('Fetching all products for admin:', API_URL);

  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    console.log('Admin Products fetched:', products);

    productList.innerHTML = ''; // Clear loading message
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn-secondary delete-button" data-id="${product.id}">
          Delete
        </button>
      `;
      productList.appendChild(productCard);
    });

    // Add event listeners for "Delete" buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-id');
        console.log(`Delete button clicked for product ID: ${productId}`);
        await deleteProduct(productId); // Delete product
      });
    });
  } catch (error) {
    console.error('Error fetching products for admin:', error);
    productList.innerHTML = 'Failed to load products.';
  }
};

// Add a new product for admin dashboard
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
      fetchAdminProducts(); // Reload products
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

// Delete a product
const deleteProduct = async (productId) => {
  console.log(`Deleting product with ID: ${productId}`);

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Product deleted successfully!');
      fetchAdminProducts(); // Reload products
    } else {
      console.error('Failed to delete product:', response.statusText);
      alert('Failed to delete product. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product. Please try again later.');
  }
};

// Initialize Admin Dashboard
const initializeAdminDashboard = () => {
  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
  fetchAdminProducts();
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('admin-product-list')) {
    console.log('Admin Dashboard detected. Initializing...');
    initializeAdminDashboard();
  }
});
