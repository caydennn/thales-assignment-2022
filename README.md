# Thales Assignment

# Contents

- [About](#about)

- [Setting Up](#setting-up)

- [API Documentation](#api-documentation)

- [Code Snippets](#code-snippets)

- [Potential Problems and Future Improvements](#potential-problems-and-future-improvements)

---

# About

This repository is meant for the take-home assignment as part of the Thales interview process. A backend service with the following features were demanded:

- To receive QR code files, process them and insert the data into a database

- Allow for searching of this data by Title

- Allow for deletion of the uploaded data 

- Only authenticated users can upload/delete data

- Search functionality is available for everyone regardless of authentication

WIth limited time given to me, I made the following design choices:

- A simple database, storing **posts** with just a username and title

- The database would be stored on the server

- Minimal checks on incoming requests (heavy assumptions on cleanliness of incoming data)

- Simplistic authentication system
  
  

This setup is definitely not safe for production due to these compromises, in which the user will need to handle or improve. The `.env` file has also been included for the sake of running the repository. 

For more thoughts about possible problems that may arise, please see [this section](#potential-problems-and-future-improvements).

## Libraries Used

I used ExpressJS as the main framework of choice and other third-party plugins, including:

- multer (for handling uploading of QR code image)

- qrcoder-reader (for decoding QR code content)

- jsonwebtoken (for handling authentication)

- cookie-parser (for reading token set in httpOnly cookies)

# Setting Up

1. Clone this repository

2. Open up a terminal in the root of this folder and type the following commands 
   
   ```bash
   npm install
   npm start
   ```

3. You should see the following message
   
   ```textile
   Main server running on Port 4000
   ```

# API Documentation

Please refer to the [API Documentation](https://documenter.getpostman.com/view/11608598/UyxojPyV) here.

# Code Snippets

You may run and test the functionality of the backend service under the `requests` folder, which contains individual Python files to test each endpoint.

**Authentication and Access Token**

To access protected endpoints, you will need to run `python3 login.py` and copy the access token printed in the terminal. You will then need to paste this access token in the `token` variable in files such as `createPost.py` and `deletePost.py`. 

# Potential Problems and Future Improvements

This section briefly describes the shortcomings of this rushed project, and other improvements that I would wish to make if given more time.

## General

1. **Tighter checks on incoming requests**
   
   There are many assumptions on the cleanliness and formatting of incoming requests, such as an incoming QR code only encoding a JSON object with `{username: ..., title: ...}` fields exactly. 
   
   Some quick suggestions would be to actually check if duplicate posts already exists in the database or whether the incoming QR code contains deformed data.

## Authentication

1. **Lack of password**
   
   Definitely one of the more straightforward issues. 
   
   Currently, an access token is granted simply with a username and opens up to impersonation attacks. 
   
   **Improvements:** We could address this by requesting the user to submit a password together with the username, which is then encrypted and stored in a database. Libraries that can help with this include `bcrypt`.        

2. **Isolate authentication server**
   
   Currently this single server handles authentication logic, together with serving content. 
   
   **Improvements:** While this is suitable for such a trivial use case, it might be worthwhile to migrate authentication logic to another server, especially if the application starts to scale. 
   
   This also leverages on the benefit of using **JWTs** since different servers can enforce authentication checks independently. 

## Database

1. **Migrate to an actual database**
   
   A clear problem with storing data on the server is that it gets resetted everytime it restarts. For such a use-case as in this assignment, even a redis cache would work, which I actually did attempt to implement but was again constrained by time.
   
   **Improvements:** Options include MongoDB, Firebase, SQL.

## 
