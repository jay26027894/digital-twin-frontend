# DigiTwin

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://digital-twin-tau.vercel.app/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](/LICENSE)

## Overview

🔗 **Live Demo:** https://digital-twin-tau.vercel.app/

DigiTwin is an AI-powered productivity assistant that transforms user activity data into actionable insights. Built to make advanced analytics accessible, DigiTwin helps individuals optimize habits, track performance, and make smarter, faster decisions through intuitive AI-driven recommendations.

DigiTwin is an AI-powered productivity assistant that transforms user activity data into actionable insights. Built to make advanced analytics accessible, DigiTwin helps individuals optimize habits, track performance, and make smarter, faster decisions through intuitive AI-driven recommendations.

## Features

- **AI-Driven Recommendations**: Generates personalized action plans via Cohere’s NLP API.
- **Real-Time Analysis**: Single-click insights with dynamic loaders and feedback.
- **Expandable Insight Panels**: Collapsible UI panels to control information depth.
- **Modern UI/UX**: Responsive design using React, Vite, and Tailwind CSS.
- **Modular Architecture**: Reusable React components with a clear separation of concerns.



## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, JavaScript
- **Backend**: Node.js, MongoDB
- **AI Integration**: Cohere API
- **Development Tools**: Cursor, Claude, Windsurf for code refinement and prompt optimization

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay26027894/digital-twin-frontend.git
   cd digital-twin-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   Create a `.env` file in the root directory and add required variables:
   ```bash
   REACT_APP_API_URL=<your-backend-url>
   REACT_APP_COHERE_API_KEY=<your-cohere-api-key>
   ```

4. **Run the application**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser at `http://localhost:5173` to view the app.

## Usage

1. Navigate to the dashboard and upload or input your activity data.
2. Click **"Generate AI Suggestions"**.
3. View your personalized action plan in the expandable panel.

## Project Structure

```
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page-level components
│   ├── services/         # API & AI integration logic
│   ├── styles/           # Tailwind CSS config & globals
│   └── App.jsx           # Main app component
├── .env                  # Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## How It Works

1. User clicks **"Generate AI Suggestions"**.
2. A loading indicator (`"Analyzing Your Data..."`) is displayed.
3. Frontend sends data to the AI backend (Cohere API).
4. AI responds with structured recommendations.
5. Recommendations appear in an expandable, styled panel.

## Key Takeaway

This project demonstrates how AI agents (Cursor, Claude, Windsurf) can accelerate web development by automating code improvements, UI refinements, and prompt engineering—resulting in a faster, more efficient build process.

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Developed with 💡 and 🚀 by Jay Bontawar*
