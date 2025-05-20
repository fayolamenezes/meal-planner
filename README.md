# Recipe and Meal Planner Web App (React Version)

This is a fully functional React-based web application that allows users to manage recipes, plan weekly meals, and generate grocery lists based on selected recipes and meal plans. The app features a responsive design and persists data using the browser’s local storage.

## 🔗 Live Site
[View Live Demo](https://meal-planner-henna-zeta.vercel.app/)

---

## Features

### 1. Home Page
- Overview of the app with navigation to all major sections.

### 2. Recipe Manager
- Add, edit, and delete personal recipes using modals.
- Filter recipes by category or search by name.
- Upload and preview images for each recipe.
- View recipe details in a modal.
- Manage recipe categories dynamically.
- Combines default recipes (from JSON) with user-added recipes.

### 3. Meal Planner
- Plan meals for each day of the week (Breakfast, Lunch, Dinner, Snacks).
- Select recipes from the recipe manager for each meal.
- Data automatically saved in local storage.
- Export meal plans as JSON files.
- Clear all meal plans with one click.

### 4. Grocery List
- Generate grocery list by selecting recipes from planner or recipe manager.
- Add custom grocery items manually.
- Check off items as you shop.
- Print the grocery list.
- Clear all items easily.

---

## Technologies Used

- React 18
- React Hooks & Context API for state management
- React Router for SPA navigation
- Local Storage API for data persistence
- CSS Modules / Custom CSS for styling
- JSON for default recipe data
- Vercel for deployment

---

## Project Structure
## Folder Structure
<pre> meal-planner/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── LICENSE
├── README.md
├── package-lock.json
└── package.json


---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fayolamenezes/meal-planner.git
   cd meal-planner
