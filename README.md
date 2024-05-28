# CRUD Application

This is a CRUD application with user authentication, allowing users to register, log in, create, read, update, and delete records. The application includes error handling and user-friendly notifications.

## Features

1. **User Authentication:**
   - Login with email and password.
   - Registration with name, email, password, and gender.
   - Error handling for invalid login credentials and duplicate registration.

2. **CRUD Operations:**
   - Create a new record.
   - Retrieve a list of all records or a single record.
   - Update an existing record.
   - Delete a record (single or bulk delete).

3. **Record Fields:**
   - Name (text input)
   - Description (textarea)
   - Category (dropdown menu, fetched from the database)
   - Active/Inactive toggle

4. **Filtering and Searching:**
   - Filter records by active/inactive status.
   - Search records by name.

## Tech Stack

- **Backend:** Express, MongoDB
- **Frontend:** React
- **Other:** Axios for API requests, JSON Web Tokens (JWT) for authentication

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/my-crud-app.git
    cd my-crud-app
    ```

2. Set up the backend:

    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following:
    ```
    MONGO_URI=mongodb://localhost:27017/mycrudapp
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

5. Set up the frontend:

    ```sh
    cd ../frontend
    npm install
    ```

6. Start the frontend development server:
    ```sh
    npm start
    ```

The application should now be running on `http://localhost:3000` with the backend API available at `http://localhost:5000`.

## Usage

1. **Register:**
   - Go to the registration page and fill in the required fields.
   - Submit the form to create a new account.

2. **Login:**
   - Go to the login page and enter your email and password.
   - Submit the form to log in.

3. **Create a Record:**
   - Navigate to the "Create New Record" page.
   - Fill in the record details and submit the form.

4. **View Records:**
   - Navigate to the "Record List" page to view all records.
   - Use the search bar and filter options to narrow down the records.

5. **Update a Record:**
   - From the record list, click on "Update" next to a record.
   - Edit the record details and submit the form.

6. **Delete a Record:**
   - From the record list, click on "Delete" next to a record to remove it.
   - Use the bulk delete option to remove multiple records at once.

## Folder Structure
my-crud-app/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── recordController.js
│ ├── models/
│ │ ├── categoryModel.js
│ │ ├── recordModel.js
│ │ └── userModel.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── recordRoutes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth/
│ │ │ │ ├── Login.js
│ │ │ │ ├── Register.js
│ │ │ ├── Record/
│ │ │ │ ├── RecordForm.js
│ │ │ │ ├── RecordList.js
│ │ │ ├── Dashboard.js
│ │ │ ├── Header.js
│ │ │ ├── Footer.js
│ │ ├── context/
│ │ │ └── AuthContext.js
│ │ ├── App.js
│ │ ├── index.js
│ ├── styles/
│ │ ├── login.css
│ │ ├── register.css
│ │ ├── recordform.css
│ │ ├── recordlist.css
│ └── package.json
├── README.md

## Contributing

Feel free to open issues or submit pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.

