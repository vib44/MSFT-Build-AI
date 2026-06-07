# AI 
## Problem statements

All solutions must leverage the Microsoft AI stack(Azure AI, Foundry, GitHub Copilot, AI/ML, Power Platform, etc.)
* AI Meets Data: From Noise to Insight
* AI-Powered Production Function 
* Agent swarms Autonomous browser agents
* Pure AI security frameworks
* AI at Work

## DESIGN AND ARCHITECTURE
Logs uploaded
      ↓
Backend processing
      ↓
Azure OpenAI analyzes incidents
      ↓
AI returns:
- summary
- severity
- probable root cause
- suggested remediation
      ↓
Dashboard displays insights

## Frontend
React+Vite
Tailwind
## Backend
Node.js
Express
TypeScript
DB
MongoDB
## Cache
Redis (optional initially)
## AI
Azure OpenAI

## Set Up

// Fast modern light weight react setup 
npm create vite@latest 

### Folder structure
project-root/
│
├── client/
│
├── server/
│
└── README.md

### STEP 1 — Create frontend
In root folder
npm create vite@latest client

Choose:

React
TypeScript

Then:

cd client
npm install

### STEP 2 — Install Tailwind

Use official docs:
Tailwind CSS Docs

Commands:

npm install tailwindcss @tailwindcss/vite

Update vite.config.ts.

Add Tailwind import to CSS.

### STEP 3 — Create backend

From root:

mkdir server

cd server

npm init -y

<!-- npm init is the command used to create a new NPM project. 
Used for- creating package.json, dependency management, defining scripts, standardized scaffolding 

When you run this command, NPM will prompt you to provide some information about your project, such as its name, version, description, main file, test command, Git repository, keywords, author, and license. These details are then used to create a package.
-->

**Install dependencies:**

npm install express cors dotenv mongoose openai

**Dev dependencies:**

npm install -D typescript ts-node-dev @types/node @types/express

<!--
* typescript : typescript compiler
* ts-node-dev: a development server runner for typescript(like nodemon+ts-node
so during development-
save file
    ↓
server restarts automatically
* types/node: This provides TypeScript type definitions for Node.js APIs.
* types/express: Provides TypeScript typings for Express.
)>-->
**Initialize TypeScript:**
<!-- configures ts compiler and creates/initializes tsconfig.json-->
npx tsc --init
### STEP 4 — Basic backend setup

Create:

server/
│
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   └── services/
|   └── models/
│
├── .env
└── tsconfig.json
### STEP 5 — First Express server

Create index.ts 

Run:

npx ts-node-dev src/index.ts

** make sure few things for better TS-Node.js support :**

__package.json__
      "type": "module"
      "scripts":{
            "dev": "tsx watch src/index.ts"
      } <!-- to enable npm run dev -->

__tsconfig.json__

      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "esModuleInterop": true,

### STEP 6 — MongoDB

Simplest option:

MongoDB Atlas free tier

MongoDB Atlas

Just:

create cluster
get connection string
connect via mongoose

Do NOT optimize schema yet.

### STEP 7 — Azure OpenAI

Azure account
Azure OpenAI resource
API key
endpoint
Explore and Deploy: Deploy a model

Then install OpenAI SDK.

Minimal AI flow

Create endpoint:
<!-- to compile and debug the ts code in node-->
npx ts-node logAnalyzer.ts 


POST /analyze

Request:

{
  "logs": "Database connection timeout..."
}

Response:

{
  "summary": "...",
  "severity": "High",
  "suggestedFix": "..."
}
IMPORTANT:

### STEP 8 — Frontend connection

dependencies needed: tailwind css, axios, react


### STEP 9 - Create MVP

ingestion - text area, file upload
routes - limited analyze route for analyzing the text area string via openai

module required - 

server/ npm i multer
<!-- install type script dev dependency for project to utilize multer-->
server/ nmp i --save -dev @type/multer 