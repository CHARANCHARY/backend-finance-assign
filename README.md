Here’s a README.md file tailored to your Personal Expense Tracker project based on the points you provided:


# Personal Expense Tracker API

This is a RESTful API for managing personal financial records, allowing users to record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Dependencies**:
  - `body-parser`: ^1.20.3
  - `dotenv`: ^16.4.5
  - `express`: ^4.21.1
  - `mongoose`: ^8.7.2
  - `nodemon`: ^3.1.7


## API Endpoints

### 1. **User Registration**
- **Method**: `POST`
- **Endpoint**: `/register`
- **Request Body**:
  ```json
  {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "yourpassword"
  }
  ```
- **Response**:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

### 2. **User Login**
- **Method**: `POST`
- **Endpoint**: `/login`
- **Request Body**:
  ```json
  {
      "email": "johndoe@example.com",
      "password": "yourpassword"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```




### 3. **Add a New Transaction**
- **Method**: `POST`
- **Endpoint**: `/transactions`
- **Request Body**:
  ```json
  {
      "type": "income",
      "category": "salary",
      "amount": 10000,
      "date": "2024-10-22",
      "description": "work"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Transaction object.

### 4. **Retrieve All Transactions**
- **Method**: `GET`
- **Endpoint**: `/transactions`
- **Response**:
  - Status: `200 OK`
  - Body: Array of transaction objects.

### 5. **Retrieve a Transaction by ID**
- **Method**: `GET`
- **Endpoint**: `/transactions/:id`
- **Response**:
  - Status: `200 OK`
  - Body: Transaction object.

### 6. **Update a Transaction by ID**
- **Method**: `PUT`
- **Endpoint**: `/transactions/:id`
- **Request Body**:
  ```json
  {
      "type": "expense",
      "category": "bills",
      "amount": 200,
      "date": "2024-10-22",
      "description": "electricity bill"
  }
  ```
- **Response**:
  - Status: `200 OK`
  - Body: Updated transaction object.

### 7. **Delete a Transaction by ID**
- **Method**: `DELETE`
- **Endpoint**: `/transactions/:id`
- **Response**:
  - Status: `200 OK`
  - Body: Confirmation message.

### 8. **Retrieve Summary of Transactions**
- **Method**: `GET`
- **Endpoint**: `/summary`
- **Response**:
  - Status: `200 OK`
  - Body:
  ```json
  {
      "totalIncome": 10000,
      "totalExpense": 200,
      "balance": 9800
  }
  ```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database setup.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-expense-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd personal-expense-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Created a `.env` file in the root of my project.


### Running the Application

Use the following command to start the server:
```bash
npm run dev
```
This will run the server using Nodemon.

### Postman API Testing

- Use Postman to test each API endpoint.
- Screenshots demonstrating each API call should be added here.

## Screenshots

### 1. Register
  ![Screenshot (379)](https://github.com/user-attachments/assets/3920d04e-4546-45b9-b9a2-9ba6f2e0bb02)


### 2. Login
![Screenshot (378)](https://github.com/user-attachments/assets/0ee1513a-805c-473e-b569-06305fa11c62)


### 3. Add a New Transaction
![Screenshot (372)](https://github.com/user-attachments/assets/b2a4e63c-413c-4291-ac2f-2de6d4d197e7)

### 4. Retrieve All Transactions
![Screenshot (373)](https://github.com/user-attachments/assets/1fac31dd-87fd-4ac3-adcd-fc610c5314a3)

### 5. Retrieve a Transaction by ID
![Screenshot (374)](https://github.com/user-attachments/assets/aab85a09-abdb-4de0-aa4b-98df2666fd97)


### 6. Update a Transaction
![Screenshot (375)](https://github.com/user-attachments/assets/531a9416-c516-4907-905c-d40f6f7a5f15)

### 7. Delete a Transaction
![Screenshot (376)](https://github.com/user-attachments/assets/ce4448d3-8ca4-45ae-abf4-778dc11f58ca)

### 8. Retrieve Summary
![Screenshot (377)](https://github.com/user-attachments/assets/947a366e-7b17-46e6-898e-4786ce3c44b6)

## License

This project is licensed under the Sai Charan License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Postman](https://www.postman.com/) for API testing.
```

### Notes
- Replace the `yourusername` in the clone URL with your actual GitHub username.
- Update the **Screenshots** section with actual images captured from your Postman API calls.
- Make sure to include the actual **LICENSE** file if applicable.

Feel free to modify any part of the README to better fit your project’s needs!
