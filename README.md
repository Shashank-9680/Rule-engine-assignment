# Rule Engine Application with AST 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful 3-tier rule engine application that determines user eligibility based on various attributes using Abstract Syntax Tree (AST) for rule processing. Built with React (Vite), Node.js, and MongoDB.

## ✨ Features

- 🌳 Dynamic rule creation using Abstract Syntax Tree (AST)
- 🔄 Rule combination with logical operators (AND/OR)
- ⚡ Real-time rule evaluation
- 🎨 Visual rule builder interface
- 📊 Rule management dashboard
- 🔌 RESTful API integration


## 🛠️ Tech Stack

### Frontend
```json
{
  "framework": "React 18+ (Vite)",
  "styling": "TailwindCSS",
  "ui-components": "shadcn/ui",
  "visualization": "React Flow"
}
```

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB",
  
}
```



## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- MongoDB >= 5.0
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shashank-9680/Rule-engine-assignment.git
cd rule-engine
```

2. **Frontend Setup**
```bash
cd frontend_app
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend_app
npm install
node app.js
```





### Rule Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  ruleString: String,
  ast: {
    type: String,
    left: Object,
    right: Object,
    value: Mixed
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

