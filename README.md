# Visual Editor

A Canva-like visual editor built as a full-stack web application using **Next.js, React Konva, Express.js, and MongoDB**.

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
- React Konva
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
CanvaAss/
├── frontend/
│   ├── app/
│   │   └── page.js
│   ├── components/
│   │   ├── CanvasEditor/
│   │   ├── CanvasList/
│   │   ├── PropertiesPanel/
│   │   └── Toolbar/
│   └── services/
│       ├── canvasApi.js
│       └── storageService.js
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

### 5. Start the Backend

From the `backend` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

Open the frontend in your browser:

```text
http://localhost:3000
```

## API Endpoints

| Method   | Endpoint            | Description               |
| -------- | ------------------- | ------------------------- |
| `POST`   | `/api/canvases`     | Create a new canvas       |
| `GET`    | `/api/canvases`     | Get all saved canvases    |
| `GET`    | `/api/canvases/:id` | Get a canvas by ID        |
| `PUT`    | `/api/canvases/:id` | Update an existing canvas |
| `DELETE` | `/api/canvases/:id` | Delete a canvas           |

## How It Works

The editor maintains canvas elements in React state.

### Saving a Canvas

When the user saves a canvas:

```text
React State
    ↓
Frontend API
    ↓
Express Backend
    ↓
MongoDB
```

### Opening a Canvas

When the user opens a saved canvas:

```text
MongoDB
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
MongoDB
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
MongoDB
```

## Editor Functionality

The editor supports the following element types:

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

Never commit real MongoDB credentials to the repository.

## Known Limitation

Images uploaded through the browser currently use temporary browser object URLs.

Because these URLs are temporary, uploaded images may not persist after a complete browser refresh.

Permanent image storage can be added in the future using a cloud storage or dedicated file-upload service.

## Future Improvements

- Permanent image storage
- Undo/redo functionality
- Multiple canvas sizes
- Additional shapes and design elements
- Layer ordering
- Advanced text formatting
- User authentication
- Cloud deployment
- Export canvas as PNG/PDF
- More advanced Canva-style editing tools

## License

This project was created as part of a software engineering internship assignment.
