# ChatQL

ChatQL is an AI-powered application that allows users to **query
databases using natural language**.\
Instead of writing SQL manually, users can ask questions in plain
English and the system converts them into SQL queries using an AI agent and return results from database.

------------------------------------------------------------------------

# Features

-   Query databases using natural language
-   Upload CSV files
-   Upload SQLite databases
-   Connect Google Sheets
-   Connect GitHub CSV files
-   Connect MySQL and PostgreSQL
-   AI automatically generates results without SQL query

------------------------------------------------------------------------

# Tech Stack

`Frontend` Next.js - React

`Backend` FastAPI - LangChain

------------------------------------------------------------------------

# Backend Setup

Move to backend
``` bash
cd backend
```

Install dependencies

``` bash
pip install -r requirements.txt
```

Run backend server

``` bash
uvicorn main:app --reload
```

Backend will run at

    http://localhost:8000

------------------------------------------------------------------------

# Frontend Setup

Move to frontend
``` bash
cd frontend
```


Install dependencies

``` bash
npm install
```

Create `.env.local`

    NEXT_PUBLIC_API_URL=http://localhost:8000

Run frontend

``` bash
npm run dev
```

Frontend will run at

    http://localhost:3000

------------------------------------------------------------------------

# Backend Working Architecture

The backend processes user queries through several steps:

    User (Frontend UI)
            │
            │ HTTP Request (Question / File Upload)
            ▼
    FastAPI Backend (API Endpoints)
            │
            │ Handles file upload or database connection
            ▼
    Database Layer (SQLite / CSV / MySQL / PostgreSQL)
            │
            │ Database schema is provided to
            ▼
    LangChain SQL Agent
            │
            │ Converts natural language → SQL query
            ▼
    SQL Execution
            │
            │ Query runs on connected database
            ▼
    Query Result
            │
            ▼
    FastAPI Response → Frontend

------------------------------------------------------------------------

# How Query Processing Works

1.  User connects a data source (CSV, SQLite, Google Sheet, etc).
2.  Backend loads the data into a database.
3.  User asks a question in natural language.
4.  LangChain SQL Agent reads the database schema.
5.  AI generates the correct SQL query.
6.  SQL query runs on the database.
7.  Results are returned to the frontend.

Example:

User asks

    Top 5 customers by revenue


------------------------------------------------------------------------

# Supported Data Sources

-   SQLite
-   CSV
-   Google Sheets
-   GitHub CSV
-   MySQL
-   PostgreSQL

------------------------------------------------------------------------

# Author

[S Victor Kumar](https://github.com/ictorv)
