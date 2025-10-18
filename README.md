# List Manager

Single-page application for managing lists with local persistence.

Site link: [Deployment List Manager](https://list-management-jose.vercel.app)

## Features

- **CRUD Operations**: Add, edit, toggle, and delete items
- **Filters**: View all, active, or completed items
- **Local Persistence**: All data saved to browser local storage
- **Validation**: Prevents empty items, trims whitespace
- **Toast Notifications**: Lightweight feedback for all actions
- **Accessible**: Keyboard navigation, focus states
- **Responsive**: Works on mobile and desktop

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

# Install dependencies
```bash
npm install
```

# Start development server
```bash
npm start
```

### Build for Production

```bash
npm run build:prod
```

Output will be in `dist/list-manager/browser/`

## Storage

All items are persisted to localStorage under the key:
```
list-manager:v1:items
```

Data is automatically loaded on app initialization and saved after every change.

## Toast Behavior

- Toast messages appear for: add, update, delete, and clear completed actions
- Auto-dismiss
- Accessible via ARIA live region
- Smooth slide-in and fade-out animations

## Keyboard Shortcuts

- **Enter**: Add new item or save edit
- **Escape**: Cancel edit mode
- **Tab**: Navigate between interactive elements
- All buttons and inputs have visible focus states

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── toast-host.component.ts
│   ├── models/
│   │   └── item.model.ts              # Item and FilterType interfaces
│   ├── services/
│   │   ├── storage.service.ts         # localStorage operations
│   │   └── toast.service.ts           # Toast notification logic
│   ├── app.component.ts               # Main app
│   ├── app.component.html             # Main template
│   └── app.component.css              # Component styles
├── main.ts                            # Bootstrap
├── index.html                         # HTML shell
└── styles.css                         # Global styles
```

## Technology Stack

- **Framework**: Angular 17+
- **Language**: TypeScript 5.2+
- **Styling**: CSS
- **Storage**: localStorage API
- **Build**: Angular CLI
