
  
<!---
Hi! We're happy you opened this file, not everyone does!
To let us know you did, paste a capybara picture 
in the How to Run section 😊 
These will be extra points for you!
-->

# Backend Engineer Interview Assignment

## Introduction

This is an interview exercise for the Digital Products team of [xtream](https://www.linkedin.com/company/xtream-srl). In the following sections, you will find a number of challenges that we ask you to implement. You **DO NOT NECESSARILY need to complete 100% of them**: you can choose to complete as many as you want.

:watch: We give you **1 week** to submit a solution, so that you can do it at your own pace. We are aware that you might have other commitments, so we are not expecting you to work on this full-time. You will be evaluated based on the quality of your work, not on the time you spent on it.

### Deliverables

Simply fork this repository and work on it as if you were working on a real-world project assigned to you. A week from now, we will assess your work.

:heavy_exclamation_mark: **Important**: At the end of this README, you will find a "How to run" section that is not written out. Please, write there instructions on how to run your code: we will use this section to evaluate your work.


### Evaluation

Your work will be assessed according to several criteria. As an example, these include:

* Code quality
* Design Patterns
* Project Structure
* Work quality (commits, branches, workflow, tests, ...)
* Provided Documentation

#### A Friendly Reminder:
We’re all about embracing the latest in AI, including GPT and similar technologies. They’re great tools that can provide a helping hand, whether it’s for generating ideas, debugging, or refining solutions. However, for this coding challenge, we’re really keen to see your personal touch. We're interested in your thought process, decision-making, and the solutions you come up with.

Remember, while using AI tools can be incredibly helpful, the essence of this task is to showcase your skills and creativity. Plus, be prepared to dive into the details of your code during the technical interview. Understanding the 'why' and 'how' behind your decisions is crucial, as it reflects your ability to critically engage with the technology you're using.

So, feel free to lean on AI for support, but ensure your work remains distinctly yours. We're looking for a blend of technical savvy and individual flair. Dive in, get creative, and let’s see what you can create. Excited to see your work. Happy coding! 🚀💼👩‍💻

### Let's get started

We do understand that some topics might be unfamiliar for you. Therefore, pick any number of challenges and try to complete them.

:heavy_exclamation_mark:**Important**: you might feel like the tasks are somehow too broad, or the requirements are not fully elicited. **This is done on purpose**: we want to give you the freedom to make your own choices and to put as fewer constraints as possible on your work. We appreciate if you could record any decisions, assumptions and doubts, together with any questions that you will ask in a real-world scenario. If you want to choose our stack instead, we generally work with TypeScript and NestJS.

---   

### Problem Domain

Your task is to build the backend for **FreshCart Market**, a simple grocery e-commerce website, where you can search for products, add to a cart, and pay for the products.   

The store also has a membership reward program: based on what you spend, you get points that you can use to get discounts.   

For the sake of this assignment, let's focus on creating the **customer** part instead of the **admin** part ( which handles all the products and their available quantities): the **admin** part can be directly manipulated in the database.   

Do not consider authentication,sign in or multiple users: for simplicity, imagine the user that is interacting with the system is always the same.

#### Challenge #1: Available Products

Design an API to get the list of the available products. Each product should have a name, an image, a price and the available quantity, and a category.   
The frontend of FreshCart Market (which you don't need to develop) will use this API directly: consider the possible heavy load that receiving a large list of product can generate and propose a solution.

#### Challenge #2: Categories and Search

The FreshCart website can be also explored by category: there is a left panel where the user can see all the categories and the number of products available in that category.  
When users click on the category, they can see all the products for that category. There is also an input that can be used to search for a specific product. 
Design an API (or multiple APIs) to allow these features.

#### Challenge #3: Order & Payment

It's time to implement the order and payment part. The user can add products to the cart and then place the order. The order should contain the list of products and the quantity.   
For simplicity, the API receives all this info together with the credit card details. If the user has enough money, the API will return a success message, otherwise, it will return an error message.
An external service must be used to get the money from the user: you can find the swagger documentation in the file `payment-service.yaml`.

#### Challenge #4: Reward Program

For every euro spent, the user receives 1 reward point. 25 points equals 1 euro discount.   
Update the order placement API (Challenge #3) to update points on every placed order.  
Also update such API to allow the user to use the points to get a discount on the order.  
Moreover, there are some special products that increase the amount of points earned: such property must be set in the product catalog.

#### Challenge #5: Discounts
Every grocery store has some temporary discounts. FreshCart Market needs to consider that the administrator will insert in a table a list of products together with a percentage discount that will be valid only for a specific date range.   
Update the system to include this information in the whole process.

## How to run

<img src="https://github.com/GiuseppeViscoBe/interviews-back-end-assignment/assets/101564368/b31918cf-b1f9-4ed0-bbdc-265a1b31bb37" width="200" height="200" />

#### FreshCart Market Backend Documentation

To run the FreshCart Market backend, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.

2. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/GiuseppeViscoBe/interviews-back-end-assignment.git
   cd interviews-back-end-assignment
   cd interviews-back-end-assignment
   cd interviews-back-end-assignment
```

## Environment Variables

- `PORT`: Specifies the port number on which the server will listen. Default value is `8000`.

- `CONNECTION_STRING`: Specifies the MongoDB connection string used to connect to the database. It should be in the format `mongodb+srv://<username>:<password>@<cluster>/<database>`.
  

Make sure to set these environment variables appropriately before running the server. You can set them in a `.env` file in the project root directory or as system environment variables.

### Overview
The FreshCart Market backend provides the necessary functionality to support a grocery e-commerce website. Users can browse available products, search by category or product name, add products to their cart, place orders, and make payments. Additionally, the backend incorporates a membership reward program where users earn points based on their purchases.

API Endpoints
## Product Controller Documentation

### Overview

The Product Controller provides endpoints to retrieve product data from the FreshCart Market backend.

### Endpoints

#### Get all products

- **Description**: Retrieves all available products from the database.
- **Route**: GET /api/getAllProducts
- **Access**: Public
- **Request Parameters**:
  - `page` (optional): Specifies the page number for paginated results (default: 1).
  - `limit` (optional): Specifies the number of products per page (default: 10).
- **Response**:
  - `products`: Array of Product objects.
  - `pagination`: Pagination information including total pages, total products, current page, and limit.

#### Get products by name and/or category

- **Description**: Retrieves products matching the specified name and/or category from the database.
- **Route**: GET /api/products
- **Access**: Public
- **Request Parameters**:
  - `pName` (optional): Specifies the product name to search for.
  - `cName` (optional): Specifies the category name to filter products by.
  - `page` (optional): Specifies the page number for paginated results (default: 1).
  - `limit` (optional): Specifies the number of products per page (default: 10).
- **Response**:
  - `products`: Array of Product objects matching the search criteria.
  - `pagination`: Pagination information including total pages, total products, current page, and limit.

### Error Handling

- If no products are found, the API returns a 404 status with an appropriate error message.
- If an error occurs during processing, the error is passed to the error handling middleware for centralized error handling.

### Example Usage

```javascript
// Retrieve all products
GET /api/getAllProducts

// Retrieve products by name and/or category
GET /api/getProductsByNameAndOrCategory?pName=mouse&cName=electronics&page=1&limit=10

```

### Example Response

```json
{
  "products": [
    {
      "_id": "6602d09f5df1646ece7aad53",
      "id": 1,
      "name": "mouse",
      "image": "url_immagine_1",
      "price": 10.99,
      "quantity": 940,
      "category": "electronics",
      "extraPoints": 1
    }
  ],
  "pagination": {
    "totalProducts": 15,
    "totalPages": 2,
    "currentPage": 1,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "nextPage": 2,
    "previousPage": null
  }
}

```

## Categories Controller Documentation

### Overview

The Categories Controller provides an endpoint to retrieve category names and the number of products per category from the FreshCart Market backend.

### Endpoint

#### Get categories name and number of products per category

- **Description**: Retrieves the names of all categories along with the number of products in each category.
- **Route**: GET /api/categories
- **Access**: Public
- **Response**:
  - Array of objects containing category names and product counts.

### Example Usage

```javascript
// Retrieve all categories
GET /api/getCategoriesNameAndNumber

```
### Example Response

```json
[
  {
    "productCount": 4,
    "categoryName": "Categoria 3"
  },
  {
    "productCount": 5,
    "categoryName": "Categoria 1"
  },
  {
    "productCount": 6,
    "categoryName": "Categoria 2"
  }
]
```
## Cart Controller Documentation

### Overview

The Cart Controller provides endpoints to manage the shopping cart functionality in the FreshCart Market backend.

### Endpoints

#### Add product to cart

- **Description**: Adds a product to the user's shopping cart.
- **Route**: POST /api/addProductsToCart
- **Access**: Public
- **Request Body**:
  - `productId`: The ID of the product to add to the cart.
  - `quantity`: The quantity of the product to add.
- **Response**:
  - If successful, returns a 200 status with a message indicating that the product was added to the cart.
  - If the product is not found, returns a 404 status with an appropriate error message.

#### Get products in the cart

- **Description**: Retrieves the products currently in the user's shopping cart.
- **Route**: GET /api/GetCart
- **Access**: Public
- **Response**:
  - If the cart is not empty, returns a 200 status with the contents of the cart.
  - If the cart is empty, returns a 404 status with an appropriate error message.

### Error Handling

- If the requested product is not found when adding to the cart, the API returns a 404 status with an appropriate error message.
- If no products are found in the cart when retrieving the cart contents, the API returns a 404 status with an appropriate error message.
- If an error occurs during processing, the error is passed to the error handling middleware for centralized error handling.

### Usage

- Ensure the backend server is running and accessible.
- Send HTTP requests to the specified endpoints to add products to the cart or retrieve the cart contents.

### Example Usage

```javascript
// Add product to cart
POST /api/addProductsToCart
Request Body:
{
  "productId": "123456",
  "quantity": 2
}

// Get products in the cart
GET /api/GetCart
```
### Example Response

```json
{
  "cart": [
    {
      "_id": "66032cdcb5be892fdfb53025",
      "product": {
        "_id": "6602d09f5df1646ece7aad54",
        "id": 2,
        "name": "Prodotto 2",
        "image": "url_immagine_2",
        "price": 5.99,
        "quantity": 10,
        "category": "Categoria 2",
        "extraPoints": 10
      }
    }
  ]
}


```


## Order Placement Controller Documentation

### Overview

The Order Placement Controller handles the process of placing orders in the FreshCart Market backend.

### Endpoint

#### Place the Order

- **Description**: Places an order with the specified products, quantities, and payment details.
- **Route**: POST /api/placeOrder
- **Access**: Public
- **Request Body**:
  - `usePoints` (boolean): Specifies whether the user wants to use reward points for the order.
- **Response**:
  - Success:
    - Status: 200 OK
    - Message: "The order was placed successfully"
  - Cart Empty:
    - Status: 400 Bad Request
    - Message: "The cart is empty"
  - Payment Declined:
    - Status: 401 Unauthorized
    - Message: "The payment method was declined"
  - Payment Error:
    - Status: 500 Internal Server Error
    - Message: "There was an unidentified error with the payment"
  - Some Items Unavailable:
    - Status: 400 Bad Request
    - Message: "Some items quantity are not available"
    - `unavailableItems`: Array of IDs of unavailable items

### Error Handling

- If the cart is empty, the API returns a 400 status with an appropriate error message.
- If the payment method is declined, the API returns a 401 status with an appropriate error message.
- If there is an unidentified error with the payment, the API returns a 500 status with an appropriate error message.
- If some items' quantity is not available, the API returns a 400 status with an appropriate error message and the IDs of unavailable items.

### Usage

- Ensure the backend server is running and accessible.
- Send an HTTP POST request to the specified endpoint with the required parameters to place an order.

### Example Request

```json
POST /api/placeOrder
Content-Type: application/json

{
  "usePoints": false
}
```

## Testing


To run automated tests (developer with Jest), use the following command:

```javascript
    npm run test
```

## Additional Information

- **Contact**: For questions or support, please contact [visco.giuseppe93@gmail.com](visco.giuseppe93@gmail.com) .

- **License**: This project is licensed under the [MIT License](link_to_license_file).

