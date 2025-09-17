Restaurant Analytics Dashboard


A web application built with Next.js 14 (App Router) to analyze restaurant data, featuring a paginated list of restaurants with filters and sorting, and detailed analytics for individual restaurants with interactive charts and tables. The application uses MongoDB Atlas for data storage, Tailwind CSS for styling, Framer Motion for animations, and Recharts for data visualization, with a premium aesthetic using the Poppins font and a restaurant-themed background image.
Features

Homepage:
Displays a paginated list of restaurants (up to 7 per page).
Supports filtering by name, location, and cuisine.
Allows sorting by name, location, or cuisine.
Responsive design with Tailwind CSS and Framer Motion animations.
Includes a restaurant-themed background image for a premium look.


Restaurant Details Page:
Shows detailed analytics for a specific restaurant, including:
Daily Orders Count (Line Chart)
Daily Revenue (Line Chart)
Average Order Value (Line Chart)
Peak Order Hour per Day (Bar Chart)


Collapsible tables for raw data.
Filters for date range, order amount, and hour range.
Responsive and animated UI.


Backend:
MongoDB Atlas database storing restaurants (ID, name, location, cuisine) and orders (ID, restaurant_id, order_amount, order_time).
API endpoints for fetching paginated restaurant data and trends.


Data Import:
Script to import data from restaurants.json and orders.json into MongoDB Atlas.



Note: The “Browse Top Restaurants” link on the homepage was intended to navigate to a page showing the top 3 restaurants by revenue. Since this feature has been removed, the link is non-functional. You may remove it from /src/app/page.js or redirect it to another page.
Prerequisites

Node.js: Version 18.x or higher.
MongoDB Atlas: A free-tier cluster for data storage.
Git: For cloning the repository.

Setup Instructions

Clone the Repository:
git clone <repository-url>
cd restaurant-analytics-dashboard


Install Dependencies:Install required Node.js packages:
npm install

Dependencies include:

next: 14.x (Next.js framework)
react, react-dom: React dependencies
mongoose: MongoDB ORM
framer-motion: Animations
recharts: Charts
date-fns: Date formatting


Set Up MongoDB Atlas:

Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
Create a cluster and note the connection string (e.g., mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net).
Whitelist your IP address in Network Access (or use 0.0.0.0/0 for testing).
Create a database user in Database Access.


Configure Environment Variables:Create a .env.local file in the project root:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net/restaurant_analytics?retryWrites=true&w=majority

Replace <username> and <password> with your MongoDB Atlas credentials.

Import Data:

Ensure restaurants.json and orders.json are in the project root. Example restaurants.json:[
  { "id": 101, "name": "Tandoori Treats", "location": "Bangalore", "cuisine": "North Indian" },
  { "id": 102, "name": "Spice Hub", "location": "Mumbai", "cuisine": "South Indian" },
  ...
]

Example orders.json:[
  { "id": 1, "restaurant_id": 101, "order_amount": 500, "order_time": "2025-01-01T10:00:00Z" },
  ...
]


Run the import script:node import-data.js

Expected output:Connected to MongoDB Atlas
Cleared restaurants collection
Cleared orders collection
Imported restaurants
Imported orders
Data import completed
MongoDB connection closed




Add Background Image:

Place a restaurant-themed image (e.g., from Unsplash) in /public/images/restaurant-bg.jpg.


Run the Application:Start the development server:
npm run dev

Open http://localhost:3000 in your browser.


Usage

Homepage (http://localhost:3000):
View a paginated list of restaurants (7 per page).
Use filters to search by name, location, or cuisine.
Click column headers to sort.
Navigate pages using “Previous” and “Next” buttons.
Click “View Details” to visit a restaurant’s analytics page.


Restaurant Details Page (http://localhost:3000/restaurant/101):
View charts for Daily Orders Count, Daily Revenue, Average Order Value, and Peak Order Hour.
Apply filters for date range, order amount, and hour range.
Toggle tables to view raw data.


Note on “Browse Top Restaurants” Link:
The link in the homepage header is currently non-functional as the top restaurants page was removed. To remove it, edit /src/app/page.js and delete:<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
  <Link href="/restaurant" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base">
    Browse Top Restaurants
  </Link>
</motion.div>





Project Structure
restaurant-analytics-dashboard/
├── public/
│   └── images/
│       └── restaurant-bg.jpg        # Restaurant-themed background image
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── restaurants/
│   │   │   │   └── route.js         # API for paginated restaurant data
│   │   │   ├── orders/
│   │   │   │   └── trends/
│   │   │   │       └── route.js     # API for restaurant trends
│   │   ├── restaurant/
│   │   │   └── [id]/
│   │   │       └── page.js          # Restaurant details page
│   │   ├── globals.css              # Global styles (Tailwind CSS)
│   │   ├── layout.js                # Root layout with Poppins font
│   │   └── page.js                  # Homepage
│   └── lib/
│       └── db.js                    # MongoDB connection and schemas
├── restaurants.json                  # Restaurant data
├── orders.json                      # Order data
├── import-data.js                   # Data import script
├── .env.local                       # Environment variables
├── package.json                     # Project dependencies
└── README.md                        # This file

Dependencies

Next.js: Framework for server-side rendering and routing.
React: UI library.
Mongoose: MongoDB ORM for Node.js.
Framer Motion: Animations for smooth UI transitions.
Recharts: Charting library for data visualization.
date-fns: Date formatting utilities.
Tailwind CSS: Utility-first CSS framework for styling.

Install with:
npm install next react react-dom mongoose framer-motion recharts date-fns

Debugging Tips

Database Issues:
Verify MongoDB Atlas connection:mongosh "mongodb+srv://<username>:<password>@cluster0.iq9mbzl.mongodb.net/restaurant_analytics"
db.restaurants.countDocuments()

Expect the number of entries in restaurants.json (e.g., 8).
Re-run node import-data.js if data is missing.


API Errors:
Test the API:curl http://localhost:3000/api/restaurants?page=1&limit=7


Check server logs (npm run dev) for errors.


Pagination:
Ensure the homepage shows 7 restaurants per page. If fewer, verify the database or API response.


Image:
Ensure /public/images/restaurant-bg.jpg exists, or replace with another image.



Notes

The application is responsive, with filters and tables stacking vertically on mobile and aligning horizontally on desktop.
The “Browse Top Restaurants” link is non-functional due to the removal of the top restaurants page. Consider removing it or redirecting to another page.
For production, add more error handling, accessibility (ARIA attributes), and environment-specific configurations.

License
MIT License. Feel free to use and modify this project.
