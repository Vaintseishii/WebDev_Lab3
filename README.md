# WebDev Lab 3

By: Xanth Reign Palmes

## Prerequisites
- Node.js 18 or newer
- npm
- PostgreSQL
- Git

## Clone the Repository
From your terminal, run:

```bash
git clone https://github.com/<your-username>/ecommerce-logistics-api.git
cd ecommerce-logistics-api
```

Replace `<your-username>` with the GitHub username or repository path you are cloning from.

## Install Dependencies
Once inside the project folder, install the required packages:

```bash
npm install
```

## Environment Variables
Make a .env file with these values

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_postgres_password
PGDATABASE=ecommerce_logistics
```


## Set Up PostgreSQL
Make sure PostgreSQL is running locally, then create the database used by the app:

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
The project currently enables the customer route by default:

- `/api/v1/customers`

Additional routes are defined in the project but may be commented out in `src/index.ts` depending on what you want to enable during development.

## Notes
- The server uses Express and PostgreSQL.
- The main entry point is `src/index.ts`.
- Database configuration is handled in `src/db.ts`.

If you run into connection issues, check that PostgreSQL is running and that the `.env` values match your local database configuration.

