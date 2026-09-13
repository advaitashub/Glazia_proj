# Visual Editor

A Canva-like full-stack visual editor built using **Next.js, React Konva, Express.js, and MongoDB**.

## Live Demo

**[Visual Canva Editor](https://visualcanva.vercel.app/)**

## Features

- Create and edit visual canvases
- Add text elements
- Add rectangle and circle shapes
- Upload and add images
- Drag elements around the canvas
- Resize elements using transformation handles
- Rotate elements
- Edit element properties
- Delete selected elements
- Delete elements using `Delete` / `Backspace` keys
- Undo and redo editing actions
- Undo using `Ctrl + Z`
- Redo using `Ctrl + Y` or `Ctrl + Shift + Z`
- Save canvases to MongoDB
- Open previously saved canvases
- Update existing canvases
- Delete saved canvases
- Canvas name validation
- Error handling for failed API operations
- Responsive editor layout

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- React Konva
- Konva
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```text
CanvaAss/

├── frontend/
│   ├── app/
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── CanvasEditor/
│   │   ├── CanvasList/
│   │   ├── PropertiesPanel/
│   │   └── Toolbar/
│   │
│   ├── hooks/
│   │   └── useCanvas.js
│   │
│   └── services/
│       └── canvasApi.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── canvasController.js
│   ├── models/
│   │   └── Canvas.js
│   ├── routes/
│   │   └── canvasRoutes.js
│   └── server.js
│
├── .env.example
├── .gitignore
└── README.md
```

## Architecture

The frontend follows a separation of responsibilities:

```text
page.js
   ↓
UI composition

useCanvas.js
   ↓
Canvas state + editing logic + undo/redo

canvasApi.js
   ↓
REST API communication

Express Backend
   ↓
Controllers + Routes + Models

MongoDB Atlas
```

The `useCanvas` custom hook keeps the main canvas state and editing operations separate from the UI.

## Setup

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>

cd CanvaAss
```

### 2. Install Frontend Dependencies

Open a terminal and run:

```bash
cd frontend

npm install
```

### 3. Install Backend Dependencies

Open another terminal and run:

```bash
cd backend

npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

The `.env` file should **not** be committed to GitHub.

A `.env.example` file is included in the project to show the required environment variables.

For the deployed frontend, configure:

```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com/api/canvases
```

### 5. Start the Backend

From the `backend` folder:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal:

```bash
cd frontend

npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

Open `http://localhost:3000` in your browser.

## API Endpoints

| Method   | Endpoint            | Description               |
| -------- | ------------------- | ------------------------- |
| `POST`   | `/api/canvases`     | Create a new canvas       |
| `GET`    | `/api/canvases`     | Get all saved canvases    |
| `GET`    | `/api/canvases/:id` | Get a canvas by ID        |
| `PUT`    | `/api/canvases/:id` | Update an existing canvas |
| `DELETE` | `/api/canvases/:id` | Delete a canvas           |

## How It Works

The editor maintains canvas elements in React state and communicates with the Express backend through REST APIs.

### Canvas State

The main editor state is managed through the `useCanvas` custom hook.

It manages:

- Canvas elements
- Selected element
- Canvas name
- Saved canvases
- Canvas ID
- Error messages
- Undo history
- Redo history

### Saving a Canvas

When the user saves a canvas:

```text
React State
    ↓
Frontend API
    ↓
Express Backend
    ↓
MongoDB Atlas
```

A new canvas is created using the `POST` API.

If an existing canvas is open, the `PUT` API is used to update it.

### Opening a Canvas

When the user opens a saved canvas:

```text
MongoDB Atlas
    ↓
Express Backend
    ↓
Frontend API
    ↓
React State
    ↓
Canvas Editor
```

### Updating a Canvas

When the user modifies an existing canvas and saves it:

```text
Updated React State
    ↓
PUT API Request
    ↓
Express Backend
    ↓
MongoDB Atlas
```

### Deleting a Canvas

When the user deletes a saved canvas:

```text
Delete Button
    ↓
DELETE API Request
    ↓
Express Backend
    ↓
MongoDB Atlas
```

## Undo and Redo

The editor maintains a history of canvas element states.

When an editing action is performed, the previous state is stored in the history.

```text
Previous State
      ↓
   History
      ↓
 Current State
```

### Undo

Undo restores the previous canvas state.

```text
Current State
      ↓
   Undo
      ↓
Previous State
```

### Redo

Redo restores a state that was previously undone.

```text
Previous State
      ↓
    Redo
      ↓
Next State
```

Keyboard shortcuts are also supported:

- `Ctrl + Z` → Undo
- `Ctrl + Y` → Redo
- `Ctrl + Shift + Z` → Redo

Creating a new editing action after an undo clears the redo history, following the expected behavior of common visual editors.

## Editor Functionality

The editor supports the following element types.

### Text

- Add text
- Edit text content
- Change font size
- Drag
- Resize
- Rotate
- Delete

### Rectangle

- Add rectangle
- Drag
- Resize
- Rotate
- Change position
- Delete

### Circle

- Add circle
- Drag
- Resize
- Rotate
- Change position
- Delete

### Image

- Upload an image from the device
- Drag
- Resize
- Rotate
- Change position
- Delete

## Canvas Management

Saved canvases are displayed in the **Saved Canvases** section.

Each saved canvas provides:

- Canvas name
- Canvas dimensions
- Open button
- Delete button

Saving an already opened canvas updates the existing canvas instead of creating a duplicate.

## Error Handling

The application handles common errors such as:

- Empty canvas name
- Failed canvas creation
- Failed canvas update
- Failed canvas loading
- Failed canvas deletion
- Invalid canvas ID
- Canvas not found
- Invalid canvas dimensions
- MongoDB connection errors

User-friendly error messages are displayed in the frontend where applicable.

## Security

Sensitive environment variables are stored in `.env`.

The `.env` file is excluded from Git using `.gitignore`.

Example environment variables are provided in:

```text
.env.example
```

Never commit real MongoDB credentials or other secrets to the repository.

## Deployment

The application is deployed as a full-stack application.

### Frontend

The Next.js frontend is deployed on Vercel.

**Live Application:**

https://visualcanva.vercel.app/

### Backend

The Express.js backend is deployed on Render.

### Database

MongoDB Atlas is used as the production database.

The frontend communicates with the deployed backend using the `NEXT_PUBLIC_API_URL` environment variable.

Example:

```env
NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com/api/canvases
```

## Known Limitation

Images uploaded through the browser currently use temporary browser object URLs.

Because these URLs are temporary, uploaded images may not persist after a complete browser refresh or when accessing the canvas from another device.

Permanent image storage can be added in the future using cloud storage or a dedicated file-upload service.

## Future Improvements

- Permanent image storage
- Multiple canvas sizes
- Additional shapes and design elements
- Layer ordering
- Advanced text formatting
- User authentication
- Export canvas as PNG/PDF
- More advanced Canva-style editing tools
- Collaborative editing

## License

This project was created as part of a software engineering internship assignment.
