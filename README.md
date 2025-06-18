# Student Codeforces dashboard

A MERN stack application that helps track and visualize students' programming progress using Codeforces data. Includes features like student table view, profile analysis, rating graphs, and CSV export.

---

##  Features

- 🔍 View a list of all students and their Codeforces data.
- 📈 Visualize contest performance (rating over time).
- 🧮 Problem-solving statistics (with date-based filters).
- 🧑‍💻 View detailed student profiles.
- ➕ Add new students with handle and personal details.
- 🗑️ Delete students.
- ⬇️ Export student list as CSV.
- 🌙 Dark mode toggle.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: Axios for HTTP requests

---

##  Getting Started
# 📚 API Documentation
Base URL: http://localhost:3001

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/students`      | Fetch all students    |
| POST   | `/students`      | Add a new student     |
| PUT    | `/students/:id`  | Update a student      |
| DELETE | `/students/:id`  | Delete a student      |

### 1. Clone the Repository

```bash
git clone https://github.com/skr42/TLE_intern_assignment.git
cd TLE_intern_assignment
cd backend
npm install
cd ../frontend
npm install
# In one terminal
cd backend
npm run dev

# In another terminal
cd ../frontend
npm run dev

```


