# Inkvi Images Store Local Application Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/) (version 1.22.x or later)
- [MySQL](https://www.mysql.com/) (version 5.7 or later)

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set Up the Database

Next, you need to create the MySQL database for the application. Run the following commands:

1. Make the database creation script executable:

```bash
chmod +x scripts/create_database.sh
```

2. Run the script to create the database:

```bash
./scripts/create_database.sh
```

This script will create a new MySQL database named inkvi_images_store.

### 3. Run Database Migrations

Once the database is set up, build the application:

```bash
yarn build
```
Then run the database migrations to create the necessary tables:

```bash
yarn migration:run
```

### 4. Start the Application

With the database set up and migrations applied, you can now start the NestJS application:

```bash
yarn start:dev
```

The application should now be running on http://localhost:3000.

## Additional Information

- **Environment Variables**: Ensure that your .env file is properly configured with your MySQL connection details and other necessary environment variables.

- **Testing**: You can run tests with the following command:

```bash
yarn test
```

## Troubleshooting

If you encounter any issues during setup, ensure that:

- MySQL is running and accessible.
- Your MySQL credentials in the .env file are correct.
- You've properly installed all dependencies using yarn install.

Feel free to reach out for further assistance!
