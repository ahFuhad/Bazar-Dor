# Bazar Dor (বাজার দর) 🛒

Bazar Dor is a simple market price tracking website made with Next.js. It helps people see the prices of daily necessary products in Bangladesh. Users can check product prices, compare market prices, and see which products have increasing or decreasing prices.

## Live Website

- GitHub Repository: https://github.com/ahFuhad/Bazar-Dor
- Live Demo: (https://bazar-dor-z1ui.vercel.app/).

## Features

- Users can see different products and their current prices.
- Users can see products with increasing and decreasing prices.
- Users can browse products by category.
- Users can sort products by price from low to high or high to low.
- Users can view product details and compare prices from different markets.
- Users can create an account and sign in with email and password.
- Users can view their profile and update their name.
- Users need to sign in before viewing product details.
- The website uses Bengali text and Bengali number formatting.
- The website is responsive and works on mobile and desktop screens.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- Sonner
- Lucide React

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/ahFuhad/Bazar-Dor.git
```

### 2. Go to the project folder

```bash
cd Bazar-Dor
```

### 3. Install the packages

```bash
npm install
```

### 4. Set up environment variables

Create a `.env.local` file in the project root and add your own configuration:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

Replace the example values with your actual configuration. Do not upload this file to GitHub because it contains private information.

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Check the Project

To check TypeScript errors, run:

```bash
npx tsc --noEmit
```

To build the project for production, run:

```bash
npm run build
```

Both commands completed successfully during my project development.

## Important Note

The prices shown on this website are for reference only. Actual prices may change depending on the market and location.

## Author

This project was created as part of my Programming Hero web development assignment.

Thank you for visiting my project!
