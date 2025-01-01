# NestJS Project Setup Guide

This guide provides step-by-step instructions for setting up and running a NestJS project that uses Yarn, MySQL, and Prisma.

---

## **Prerequisites**

Before starting, ensure you have the following installed:

### 1. Node.js
- Download and install Node.js from [nodejs.org](https://nodejs.org).
- Verify the installation by running:
  ```bash
  node -v
  npm -v
2. Yarn
Install Yarn globally using npm:
bash
Copy code
npm install --global yarn
3. MySQL
Download and install MySQL from mysql.com.
Configure MySQL with the following details:
Database Name
Username
Password
Port
Ensure the MySQL server is running.
Project Setup
1. Clone the Repository
Open a terminal and navigate to the directory where you want to clone the project.
Clone the repository by running:
bash
Copy code
git clone <your-repo-url>
2. Navigate to the Project Directory
Move into the project folder:
bash
Copy code
cd <project-folder-name>
3. Install Dependencies
Install the required Node.js modules:
bash
Copy code
yarn install
4. Configure Environment Variables
Copy the .env file provided in your email into the project directory.
Ensure the .env file contains the following variables:
env
Copy code
DATABASE_URL= url
MYSQL_DATABASE= database
MYSQL_USER= user
MYSQL_PASSWORD= password
MYSQL_HOST= host
MYSQL_PORT= port

PUSHOVER_USER_KEY= key
PUSHOVER_APP_TOKEN= token
Replace the placeholder values with your actual configuration.
Database Setup
1. Run Prisma Migrations
Use Prisma to create the necessary tables in your MySQL database:
bash
Copy code
npx prisma migrate dev
2. Seed the Database
If a seed script exists (e.g., prisma/seed.ts), populate the database with initial data:
bash
Copy code
npx prisma db seed
3. Generate Prisma Client
Ensure Prisma is up-to-date by generating the Prisma client:
bash
Copy code
npx prisma generate
Running the Project
Start the Development Server
Start the server in development mode by running:
bash
Copy code
yarn start:dev
This command will start the server and watch for file changes.
Testing the API
Available Endpoints
Use Postman or any HTTP client to test the following endpoints:
Get All Products

URL: http://localhost:8080/product
Method: GET
Get Product by ID

URL: http://localhost:8080/product/:id
Method: GET
Get Top 10 Products in a Specific Area

URL: http://localhost:8080/product/top-ordered?area=Zayed
Method: GET
Get All Orders

URL: http://localhost:8080/order
Method: GET
