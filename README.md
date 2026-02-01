# StudyBuddy

StudyBuddy is a one-page web application designed to help students manage their academic lives by organizing tasks, tracking weekly habits, and saving useful learning resources.

### 🏠 Dashboard
- Task Summary:

- Tasks Due Soon
- Tasks Completed

- Habits Series (This Week)
- Progress Bar Showing Task Completion Percentage
- List of Tasks Due Today or in the Next 2 Days

---

### ✅ Task Management
- Full CRUD Operations:

- Create, Read, Update, Delete Tasks
- Task Fields:

- Title (Mandatory)

- Description (Optional)

- Due Date (Mandatory)

- Priority (Low/Medium/High)

- Category
- Features:

- Completed/Incomplete Tasks

- Edit Tasks

- Delete with Confirmation
- Filter by Status (All/Active/Completed)

- Filter by Category

- Sort by Due Date or Priority
- Save Data Using `localStorage`

---

### 🔁 Habits Tracker
- Add Weekly Habits with a Goal (1 to 7 days a week)
- Track progress using daily switches (Saturday - Friday)
- Prevent selecting more days than the weekly target
- Weekly summary of completed habits
- Display the habit sequence on the dashboard
- Save progress to local storage

---

### ⭐ Resources
- Load resources asynchronously from `resources.json` using `fetch`
- View resources:

- Title
- Category
- Description
- External link
- Search by title
- Filter by category
- Add resources to favorites ⭐
- Save favorites to local storage
- Handle uploads and errors

---

### ⚙️ Settings
- Toggle light/dark mode
- Save appearance preferences to local storage
- Reset all stored data with confirmation
- "About" section describing the application and student information

---

## 🛠 Technologies used
- HTML5
- CSS3 (Flexbox, Grid) Responsive Design
- Core JavaScript (ES6)
- Local Storage API
- Data Fetching API (Asynchronous/Waiting)

---

## 📱 Responsive Design
- Mobile-Friendly Design
- Single-Column Design on Mobile Devices
- Grid and Card Design on Large Screens
- Interactive State of Events When Hovering and Focusing

## How to Run
- Download the website files from GitHub
- Run the index.html file in your browser