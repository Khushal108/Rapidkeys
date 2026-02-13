# RapidKeys – Speed Typing Game

A web-based typing speed game built using the MERN stack where users can test their typing speed, view leaderboard rankings, and track their performance history.

---

## Features

* User Signup and Login
* Typing speed test
* Words Per Minute (WPM) and Accuracy calculation
* Leaderboard
* User profile with score history

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (planned)
* Bcrypt (password hashing)

---

## Project Structure

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js

---

## Installation

1. Clone the repository

```
git clone https://github.com/your-username/rapidkeys.git
```

2. Navigate to backend

```
cd backend
```

3. Install dependencies

```
npm install
```

4. Create a .env file in backend folder

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Run the server

```
npm run dev
```

---

## API Endpoints

### User Routes

* POST /api/users/signup
* POST /api/users/login
* GET /api/users/profile (planned)

### Score Routes

* POST /api/scores (planned)
* GET /api/scores/leaderboard (planned)
* GET /api/scores/history (planned)

---

## Future Improvements

* Multiplayer typing race
* Dark mode
* JWT authentication
* Real-time leaderboard

---

## Author

Khushal Mishra
