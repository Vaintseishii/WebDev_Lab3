# WebDev Lab 3

By: Xanth Reign Palmes

## Prerequisites
- Node.js 18 or newer
- npm
- PostgreSQL
- Git

## Clone and Set Up the Repository
Open a terminal and clone the repository:

```bash
git clone https://github.com/Vaintseishii/WebDev_Lab3.git
cd WebDev_Lab3
```

Install the project dependencies from the repository directory:

```bash
npm install
```

## Environment Variables
Create a `.env` file in the project root and add the following values. Replace
`your_postgres_password` with the password for your local PostgreSQL user:

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_postgres_password
PGDATABASE=ecommerce_logistics
```


## Set Up the Database
Make sure PostgreSQL is installed and running, then create the database used by
the app:

```bash
createdb ecommerce_logistics
```

## Start the Development Server
Run:

```bash
npm run dev
```

This starts the project with `tsx watch`, which watches for file changes and restarts the API automatically.

The API should be available at:

```text
http://localhost:3000
```

## Available Routes
All routes are enabled by default. The API base URL is
`http://localhost:3000/api/v1`.

### Customers
- `GET /customers` - List all customers
- `GET /customers/:id` - Get a customer by ID
- `POST /customers` - Create a customer
- `PUT /customers/:id` - Update a customer's city or membership level
- `DELETE /customers/:id` - Delete a customer

### Products
- `GET /products` - List all products; optionally filter by category with `?category=value`
- `GET /products/:id` - Get a product by ID
- `POST /products` - Create a product
- `PATCH /products/:id/price` - Update a product's unit price

### Orders
- `GET /orders` - List all orders
- `GET /orders/customer/:customer_id` - List orders for a customer
- `POST /orders` - Create an order
- `DELETE /orders/:id` - Delete an order

### Order Items
- `GET /order_items/:orderId` - List items in an order
- `POST /order_items` - Add an item to an order

### Vendors
- `GET /vendors` - List all vendors

### Supplies
- `GET /supplies/vendor/:vendorId` - List supplies for a vendor
- `PUT /supplies/:vendorId/:productId` - Update a supply stock quantity

