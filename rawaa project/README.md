# Rawaa Store

## Project Overview
Rawaa Store is a simple e-commerce web application where users can view products and make payments via Stripe. Additionally, an admin dashboard allows administrators to add and delete products. The application is built using Node.js for the backend and plain HTML, CSS, and JavaScript for the frontend.

### Features
- **Customer Features**:
  - View all available products.
  - Make secure payments using Stripe.
- **Admin Features**:
  - Add new products.
  - Delete existing products.
  - Manage products in a separate admin dashboard.

---

## Technologies Used
- **Backend**: Node.js, Express, Prisma ORM
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (via Prisma)
- **Payment Gateway**: Stripe

---

## Installation and Setup Instructions
Follow these steps to install and run the application locally.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```



5. Initialize the database using Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

---

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. No additional dependencies are required for the frontend. Simply open the `index.html` file in your browser using a live server.
   - If you don’t have a live server, you can install one globally:
     ```bash
     npm install -g live-server
     ```
     Then run:
     ```bash
     live-server
     ```
   The application will open in your default browser on `http://127.0.0.1:8080` or similar.

---

### Stripe Setup
1. Create a Stripe account if you don’t already have one.
2. Obtain your **Publishable Key** and **Secret Key** from the Stripe Dashboard.
3. Replace the placeholders in the following files:
   - **Backend**: Update `STRIPE_SECRET_KEY` in the `.env` file.
   - **Frontend**: Replace the publishable key in `script.js`:
     ```javascript
     const stripe = Stripe('your-publishable-key');
     ```

---

### How to Use
#### Customer Page
1. Open the `index.html` file in your browser.
2. Browse through the available products.
3. Use the Stripe card details below to test payments:
   - **Card Number**: `4242 4242 4242 4242`
   - **Expiry Date**: Any valid future date (e.g., `12/34`)
   - **CVC**: Any 3-digit number (e.g., `123`)

#### Admin Dashboard
1. Navigate to `admin.html` in your browser.
2. Add or delete products using the form and buttons provided.

---

### Project Details
#### Backend Endpoints
1. **Products**:
   - `GET /api/products` - Fetch all products.
   - `POST /api/products` - Add a new product.
   - `DELETE /api/products/:id` - Delete a product by ID.

2. **Payments**:
   - `POST /api/payments` - Create a payment intent.

#### Folder Structure
```
project-folder
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   ├── src
│   │   ├── controllers
│   │   │   ├── productController.js
│   │   │   ├── paymentController.js
│   │   ├── routes
│   │   │   ├── productRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   ├── server.js
│   ├── .env
│   ├── package.json
├── frontend
│   ├── index.html
│   ├── admin.html
│   ├── style.css
│   ├── script.js
```

---

### Known Issues
- Ensure the backend server is running on `http://localhost:3000`.
- Payments require a valid Stripe account and API keys.

---

### Future Improvements
1. Add user authentication for enhanced security.
2. Implement a more robust admin dashboard with analytics.
3. Improve the UI/UX for mobile devices.

---

### Author
Rawaa ababneh

