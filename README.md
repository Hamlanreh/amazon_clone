# Fullstack MERN Amazon Clone Application

[View Live Demo Link Here!](https://amazon-clone-mern-dev.herokuapp.com/)

The Amazon clone fullstack application is an e-commerce website which was inspired by Amazon website. The frontend and backend built with (MERN Stack) with authentication capabilities and payment system implementation(Dummy payment not real payment), this application performs the most quintescential function and feature to the Amazon e-commerce online shop such as:

## Features

- JWT Authentication capabilities: Signup, login and logout functionalities with authentication and cookie management system
- User can create, update, customize and deactivate account also (update profile picture using image management system)
- CRUD operations on reviews of products (User can comment reviews and rate products)
- Change password, forgot and reset password functionalities
- Choose products and add, increase, decrease, remove or clear all from cart
- Create an order for choosen products
- Search for product with full product name
- Payment system implementation using Stripe for (Dummy payment nto real payment)
- Email transaction for forgotten password, deactivated account etc.
- Backend REST API

## Tech Stacks

**Frontend Technology**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Backend Technology**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
Nodemailer

**Cloud Storage**

[Cloudinary](https://cloudinary.com/)

**Mail Service**

[Mailchimp]()

**Deployed On**

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

**Version Control**

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Screenshots

The user interface is modelled similar to the Amazon website and i've tried to make it as mobile responsive as possible but best view on laptop or desktop. Keep in mind the primary purpose of the application is to create a fully functional e-commerce website

![amazon-ecommerce-screenshot](https://user-images.githubusercontent.com/101047579/192185265-e366b8fc-a1a3-449e-bd76-0d0dc2cb256d.png)

![Products list](https://user-images.githubusercontent.com/101047579/184636223-f552db7d-42fe-4b8c-bcc8-45a5d3470cb8.png)
Products List page

![Signup page](https://user-images.githubusercontent.com/101047579/184636306-60211b59-44c1-473b-8d59-15dda9b75cec.png)
Signup page

![Login page](https://user-images.githubusercontent.com/101047579/184636407-f7242054-0466-42fb-8386-1ff815ae1312.png)
Login page

![Orders page](https://user-images.githubusercontent.com/101047579/184636480-426178f7-8275-487f-8f4a-c514a7265d9f.png)
Orders page

![Cart items](https://user-images.githubusercontent.com/101047579/184636573-c60cd8f4-91c7-444b-b309-a21b3e907302.png)
Selected cart products list

![Checkout product list](https://user-images.githubusercontent.com/101047579/184636730-9f409986-2d08-409e-b6de-26f6043e8b56.png)
Checkout items list

![Checkout Payment](https://user-images.githubusercontent.com/101047579/184636695-8a6827d3-c88a-441c-9645-2bd755ffff9a.png)
Checkout stripe payment section

![Profile page](https://user-images.githubusercontent.com/101047579/184636829-480918c4-3fd8-41b6-bc42-9a0703530469.png)
Profile page

## Database Schema

According to the current application functionalities there are 4 database collections(tables) in the schema. The User schema has all the data and password of the user

`User._id --> {author} --> Review.user`
`User._id --> {customer_order} --> Order.user`

The products collections(tables) contains all the information about the different products such as name, photo, prices and ratings etc.

`Product._id --> {ordered_product} --> Order.items.product`
`Product._id --> {reviewed_product} --> Review.product`

Orders collections(tables) contains all the data of the products ordered by the user and the connection is given as:

`User._id --> {customer_order} --> Order.user`
`Product._id --> {ordered_product} --> Order.items.product`

The Reviews collections(tables) stores and keeps track on all CRUD operations performed on review by the users. The user makes reviews and the review is made on the a particular product and the connection is depicted as:

`User._id --> {author} --> Review.user`
`Product._id --> {reviewed_product} --> Review.product`

## Note

- The database is built on MongoDB cluster
- The application authentication management system allow automatic login with stored cookie

## To run on your machine

- Download/clone this repository to your local machine
- Make sure you have the right nodejs version
- Setup backend server environment with dependencies `npm install`
- Setup frontend client environment with dependencies `cd client/ && npm install`
- From the root directory activate client and server environment concurrently `npm run dev`

## Test User Credentials

- Username: tester
- Email: tester@dev.io
- Password: test1234

## Things yet to do

- Creation of new products by user and CRUD operation on product

## Contribution

I consider this application as open source project, if there are possible improvements to be made to the application, issues to be resolved or help to provide pertaining to the development of this application, it will be well appreciated.
