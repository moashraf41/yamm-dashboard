🛒 Yamm Dashboard
A refund management dashboard built with Next.js 15, TypeScript, Redux Toolkit, and Tailwind CSS.

📌 Features
Dynamic Sidebar with collapsible navigation.
Reusable Table Component with pagination & filtering.
State Management using Redux Toolkit.
REST API Integration using Axios & json-server.
Order Actions (Toggle status, Change decision, View details).

🚀 Installation & Running:

1️⃣ Clone the repository
To download the project, use the following command:
git clone https://github.com/YOUR_GITHUB_USERNAME/yamm-dashboard.git
cd yamm-dashboard

2️⃣ Install dependencies
Run the following command to install all required packages:

npm install

3️⃣ Start the JSON server
The project uses json-server to serve mock API data. You need to start it before running the Next.js app:
npx json-server --watch data/db.json --port 5000
This will start a local server at http://localhost:5000.

4️⃣ Start the Next.js app
Now, you can start the dashboard:
npm run dev
The application will be available at http://localhost:3000.
