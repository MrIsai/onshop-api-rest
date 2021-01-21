# ONSHOP PROJECT - REST API

Version 0.1.0 (Alpha)

## About

ONSHOP is a solution for enterprising people who want to open an online business on a platform that provides the digital marketing service.

This repository contains a REST API which is a fundamental component of the OnShop architecture to provide the respective services that the user needs through a mobile application or web page.

## API Features

- Protected Routes with **JSON Web Tokens (JWT)**
- User registration and active sessions through login
- CRUD operations for users, shops, products and others.
- Media storage works with [Cloudinary Services (CDN)](https://cloudinary.com/)
- App data storage works with **Mongoose** and **MondoDB**

## Routes

| Route          | HTTP Method | Description                |
|----------------|-------------|----------------------------|
| /auth/signup   | POST        | User registration          |
| /auth/login    | POST        | User login                 |
| /users/:userId | GET         | Get the user data by id    |
| /users/:userId | PUT         | Update the user data by id |
| /users/:userId | DELETE      | Delete the user data by id |

## More

Author: Isai Pashel  
Developed by: Isai Pashel
