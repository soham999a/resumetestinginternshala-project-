Resume Editor – Internshala Assignment
A modern web-based Resume Editor that lets users:
Upload and edit their resumes (mocked parsing)
Enhance sections using a mock AI backend
Save and retrieve resume data via a FastAPI backend
Download the final resume as a .json file
Features
Upload Resume: Accepts .pdf or .docx files (mocked parsing to dummy content)
Edit Resume: Editable fields for name, experience, education, skills. Add/remove entries.
Enhance with AI: "Enhance with AI" button for each section, sends content to /ai-enhance and displays improved version.
Save Resume: Saves the complete resume JSON to backend via /save-resume.
Download: Allows downloading the final resume as a .json file.
Modern UI: Built with React and Chakra UI for a beautiful, responsive experience.
Folder Structure
Apply to .gitignore
Getting Started
1. Clone the Repository
Apply to .gitignore
2. Backend Setup (FastAPI)
Requirements: Python 3.8+
Apply to .gitignore
The backend will run at: http://localhost:8000
3. Frontend Setup (React)
Requirements: Node.js 16+
Apply to .gitignore
The frontend will run at: http://localhost:3000
Usage
Upload Resume: Click "Upload" and select a .pdf or .docx file (parsing is mocked).
Edit Resume: Modify fields, add/remove experience, education, or skills.
Enhance with AI: Click "Enhance with AI" next to any section to get a mocked improved version.
Save Resume: Click "Save Resume" to store your data on the backend.
Download: Click "Download JSON" to save your resume locally.
