
# Routine Planner

Welcome to the Routine Planner project! This application serves as a comprehensive routine planner, allowing users to manage their part-time job, class schedule, and study plans effectively. The main highlight of this project is its ability to generate an optimized study planner for the upcoming 5-7 days based on study plan priorities, durations, and available time after part-time job and class commitments.

## Features

### 1. Part-Time Job & Class To-Do List

Users can create and manage to-do lists specifically for their part-time job and class commitments. This helps in organizing tasks and responsibilities related to work and academics.

### 2. Study Plan To-Do List

A dedicated to-do list for study plans is available, allowing users to outline and track tasks related to their academic studies. This feature aids in effective planning and execution of study goals.

### 3. Optimized Study Planner

The core feature of this project is the ability to generate an optimized study planner for the next 5-7 days. The planner takes into consideration study plan priorities, durations, and the available time after part-time job and class commitments. This ensures a balanced and efficient study schedule.

## Getting Started

Follow these steps to get started with the Routine Planner project run locally:

1. **Clone the Project:**
   ```bash
   git clone https://github.com/tanvir084/routine-planner-be.git
   ```

2. **Resolve Dependencies:**
   ```bash
   npm install
   # or
   yarn 
   ```

3. **Add Secret:**
   ```bash
   make .env file
   copy .env variable from example.env
   replace your secret value in variable
   ```

4. **Start the Project:**
   ```bash
   npm start
   # or
   yarn start
   ```
## Run in Docker:
1. **Add Secret:**
   ```bash
   make .env file
   copy .env variable from example.env
   replace your secret value in variable
   ```

4. **Run the Docker Command:**
   ```bash
   docker build -t myapp .
   docker run --name myapp -p 8080:8080 -d myapp
   ```


## API Documentation:
Learn more about API routes [Click Here](https://documenter.getpostman.com/view/19524228/2sA2xjyBB5).