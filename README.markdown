# 🍽️ Restaurant Analytics Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?style=flat-square&logo=tailwind-css) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-orange?style=flat-square)

Welcome to the **Restaurant Analytics Dashboard**, a premium web application built with **Next.js 14** (App Router) for analyzing restaurant performance. Featuring a sleek, responsive design with **Tailwind CSS**, smooth **Framer Motion** animations, and interactive **Recharts** visualizations, this app delivers a sophisticated user experience. Powered by **MongoDB Atlas**, it offers a paginated restaurant list and detailed analytics with a restaurant-themed aesthetic, enhanced by the elegant **Poppins** font.

---

## ✨ Features

- **📋 Homepage**:
  - Displays up to **7 restaurants per page** with pagination.
  - Filter by **name**, **location**, or **cuisine** with real-time updates.
  - Sort by any column (name, location, cuisine) with ascending/descending options.
  - Premium design with a restaurant-themed background image and smooth animations.
  - Responsive layout for mobile and desktop.

- **📊 Restaurant Details**:
  - Interactive charts for:
    - **Daily Orders Count** (Line Chart)
    - **Daily Revenue** (Line Chart)
    - **Average Order Value** (Line Chart)
    - **Peak Order Hour** (Bar Chart)
  - Collapsible tables for raw data, toggled with animated transitions.
  - Filters for **date range**, **order amount**, and **hour range**.
  - Elegant, responsive UI with a premium look.

- **🗄️ Backend**:
  - MongoDB Atlas stores `restaurants` (ID, name, location, cuisine) and `orders` (ID, restaurant_id, order_amount, order_time).
  - API endpoints for efficient data retrieval and analytics.

- **📥 Data Import**:
  - Script to populate MongoDB with data from `restaurants.json` and `orders.json`.

> **Note**: The “Browse Top Restaurants” link on the homepage is currently non-functional due to the removal of the top restaurants page. See the **Usage** section for options to remove or redirect it.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher 🟢
- **MongoDB Atlas**: Free-tier cluster for data storage 📦
- **Git**: For cloning the repository 📂
- **Background Image**: A restaurant-themed image (e.g., from [Unsplash](https://unsplash.com/photos/HvF9kDGMu-k))

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd restaurant-analytics-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Installs:
   - `next`, `react`, `react-dom`: Next.js framework and React
   - `mongoose`: MongoDB ORM
   - `framer-motion`: Animations
   - `recharts`: Charts
   - `date-fns`: Date utilities

3. **Set Up MongoDB Atlas**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a cluster and note the connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net
     ```
   - In **Network Access**, whitelist your IP or use `0.0.0.0/0` (testing only).
   - In **Database Access**, create a user with a username and password.

4. **Configure Environment Variables**:
   Create a `.env.local` file in the project root:
   ```bash
   echo "MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net/restaurant_analytics?retryWrites=true&w=majority" > .env.local
   ```
   Replace `<username>` and `<password>` with your Atlas credentials.

5. **Import Data**:
   - Ensure `restaurants.json` and `orders.json` are in the project root. Example:
     ```json
     // restaurants.json
     [
       { "id": 101, "name": "Tandoori Treats", "location": "Bangalore", "cuisine": "North Indian" },
       { "id": 102, "name": "Spice Hub", "location": "Mumbai", "cuisine": "South Indian" },
       ...
     ]
     ```
     ```json
     // orders.json
     [
       { "id": 1, "restaurant_id": 101, "order_amount": 500, "order_time": "2025-01-01T10:00:00Z" },
       ...
     ]
     ```
   - Run the import script:
     ```bash
     node import-data.js
     ```
     Expected output:
     ```
     Connected to MongoDB Atlas
     Cleared restaurants collection
     Cleared orders collection
     Imported restaurants
     Imported orders
     Data import completed
     MongoDB connection closed
     ```

6. **Add Background Image**:
   - Download a restaurant-themed image and save it as `/public/images/restaurant-bg.jpg`.

7. **Run the Application**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖱️ Usage

### Homepage ([http://localhost:3000](http://localhost:3000))
- **View Restaurants**: Browse up to 7 restaurants per page with pagination controls.
- **Filter**: Search by name, location, or cuisine using the input fields.
- **Sort**: Click column headers (Name, Location, Cuisine) to sort ascending or descending.
- **Navigate**: Click “View Details” to access a restaurant’s analytics page.
- **Note on “Browse Top Restaurants” Link**:
  - This link is non-functional as the top restaurants page was removed. To fix:
    - **Remove the Link**: Edit `/src/app/page.js` and delete:
      ```jsx
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <Link href="/restaurant" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base">
          Browse Top Restaurants
        </Link>
      </motion.div>
      ```
      Replace with:
      ```jsx
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center justify-center px-6">
        <motion.h1 ...>Restaurant Analytics Dashboard</motion.h1>
      </div>
      ```
    - **Redirect**: Update `href="/restaurant"` to another route (e.g., `/`).

### Restaurant Details ([http://localhost:3000/restaurant/101](http://localhost:3000/restaurant/101))
- **View Analytics**: Explore four charts (Daily Orders Count, Daily Revenue, Average Order Value, Peak Order Hour).
- **Filter Data**: Adjust date range, order amount, or hour range to refine analytics.
- **Toggle Tables**: Click “Show Data”/“Hide Data” to view raw data for each chart.
- **Responsive Design**: Charts and tables adapt to mobile and desktop screens.

---

## 📂 Project Structure

| Path | Description |
|------|-------------|
| `public/images/restaurant-bg.jpg` | Restaurant-themed background image for headers |
| `src/app/api/restaurants/route.js` | API for paginated restaurant data |
| `src/app/api/orders/trends/route.js` | API for restaurant analytics trends |
| `src/app/restaurant/[id]/page.js` | Restaurant details page with charts and tables |
| `src/app/globals.css` | Global styles with Tailwind CSS |
| `src/app/layout.js` | Root layout with Poppins font |
| `src/app/page.js` | Homepage with paginated restaurant list |
| `src/lib/db.js` | MongoDB Atlas connection and schemas |
| `restaurants.json` | Restaurant data (ID, name, location, cuisine) |
| `orders.json` | Order data (ID, restaurant_id, order_amount, order_time) |
| `import-data.js` | Script to import JSON data into MongoDB |
| `.env.local` | Environment variables (MongoDB URI) |
| `package.json` | Project dependencies and scripts |
| `README.md` | Project documentation |

---

## 🛠️ Dependencies

- **Next.js** (14.x): Server-side rendering and routing
- **React**: UI components
- **Mongoose**: MongoDB ORM
- **Framer Motion**: Smooth animations
- **Recharts**: Interactive charts
- **date-fns**: Date formatting
- **Tailwind CSS**: Utility-first styling

Install with:
```bash
npm install next react react-dom mongoose framer-motion recharts date-fns
```

---

## 🔍 Debugging Tips

- **Database Issues** 🗄️:
  - Verify MongoDB connection:
    ```bash
    mongosh "mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net/restaurant_analytics"
    db.restaurants.countDocuments()
    ```
    Expect the number of entries in `restaurants.json` (e.g., 8).
  - Re-run `node import-data.js` if data is missing or incomplete.
  - Check for JSON syntax errors in `restaurants.json` or `orders.json`.

- **API Errors** 🌐:
  - Test the restaurant API:
    ```bash
    curl http://localhost:3000/api/restaurants?page=1&limit=7
    ```
    Expect up to 7 restaurants and the correct `total`.
  - Check server logs (`npm run dev`) for errors.

- **Pagination** 📄:
  - Ensure the homepage displays 7 restaurants per page. If fewer, verify the database or API response.

- **Background Image** 🖼️:
  - Confirm `/public/images/restaurant-bg.jpg` exists. Replace with another image if needed.

---

## 🌟 Premium Design Notes

- **Typography**: Uses **Poppins** font (weights: 400, 600, 700) for a modern, clean look.
- **Animations**: **Framer Motion** provides smooth transitions (fade-ins, slide-ups) for headers, tables, and filters.
- **Styling**: **Tailwind CSS** ensures a responsive, utility-first design with a gray background and blue accents.
- **Background Image**: A restaurant-themed header image with a gradient overlay creates a premium aesthetic.
- **Responsiveness**: Filters and tables stack vertically on mobile and align horizontally on desktop.

---

## 🛡️ License

MIT License. Free to use and modify.

---

## 📬 Contact

For issues or suggestions, open a GitHub issue or contact the maintainer at Rishi Dubey(mailto:dubeyrishi2002@gmail.com).
