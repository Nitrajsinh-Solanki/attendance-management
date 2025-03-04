

Install the required dependencies:

```bash
npm install
```

### **Environment Variables Configuration**

This project requires environment variables for database connection, email authentication, and other configurations.  

#### **Setting Up `.env.local`**
Create a `.env.local` file in the root directory of the project and add the following variables:

```plaintext
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# Email Configuration for OTP Verification (Using Gmail SMTP)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password


```

### **Running the Application**
After setting up the environment variables, start the development server:

```bash
npm run dev
```

By default, the application runs at **http://localhost:3000**.



