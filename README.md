# NovaCart

NovaCart is a premium frontend e-commerce storefront built with React, Vite, Tailwind CSS, and local mock data. The project simulates a realistic shopping experience for electronics, fashion, beauty, home essentials, and fitness products.

## Features

- Responsive storefront with sticky navigation and mobile menu
- Product listing and search across local mock products
- Category-based filtering and sorting
- Product detail pages with variant selection and quantity controls
- Persistent cart and wishlist using LocalStorage
- Demo checkout validation and order confirmation page
- Responsive 404 and invalid product handling

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Context API and useReducer
- Lucide React
- LocalStorage for persistence

## Screenshots

Add screenshots here after running the app locally and capturing the UI.

## Installation

Open PowerShell in the project folder and run:

```powershell
npm install
```

## Run the project

```powershell
npm run dev
```

## Production build

```powershell
npm run build
```

## Folder structure

```text
src/
  components/
  context/
  data/
  pages/
  utils/
  App.jsx
  main.jsx
  index.css
```

## State management

The app uses React Context API with reducer-based state for:

- Cart state: add, update quantity, remove, clear, and summary calculations
- Wishlist state: toggle, remove, and count tracking

## LocalStorage persistence

Data is persisted locally in the browser for:

- cart state via `novacart_cart`
- wishlist state via `novacart_wishlist`
- recent demo order via `novacart_order`

## Cart and shipping calculation rules

- Cart subtotal is computed as item price × quantity.
- Discount is based on original price minus sale price, aggregated across items.
- Shipping is free when subtotal is ₹999 or more; otherwise shipping is ₹149.
- If the subtotal is zero, shipping is zero.
- Final total is subtotal + shipping − discount.

## Demo checkout disclaimer

This project is a frontend-only demo. It does not collect real card data, process real payments, or integrate with a backend or payment gateway.

## Future improvements

- Add a backend API and real authentication
- Implement checkout with real payment integration
- Expand product data and advanced analytics
- Add CMS-driven product management
