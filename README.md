<h1>💻 Personal Web Portfolio - Jethro P. Moleño</h1>

This repository contains the source code for my personal web portfolio, a single-page application (SPA) designed to showcase my skills, projects, and contact information to potential recruiters, collaborators, and employers. Built with modern web technologies, the site emphasizes clean design, optimal performance, and a professional user experience.

The live website is continuously deployed and available here: https://myportfolio-jethromoleno.netlify.app



<h2>🔍 Project Overview</h2>

- The primary goal of this project is to serve as a professional digital resume and exhibit my capabilities as a graduating Computer Engineering student and aspiring developer.

- Key aspects of the portfolio include:

- Project Showcase: Dedicated sections to highlight practical work, emphasizing the technologies used and the solutions developed.

- Contact Management: A fully functional, serverless contact form that routes inquiries directly to a Google Sheet for reliable lead tracking.

- Modern UI/UX: Leveraging utility-first CSS (Tailwind CSS) to ensure a fully responsive, mobile-first design and accessibility.

- Iterative Development: Designed for Continuous Deployment (CD), allowing for rapid updates, such as the future integration of a video CV.



<h2>🧠 Key Features</h2>

- Component-Based Architecture: Built using React to ensure modularity, scalability, and easy maintenance of UI elements.

- Fully Responsive Design: The layout adapts seamlessly to desktop, tablet, and mobile screens.

- Serverless Contact Form: Utilizes Google Apps Script as a backend to securely receive form submissions without requiring a dedicated server or database.

- Smooth Scrolling Navigation: Implements efficient scroll behavior for anchor links, such as the "Contact Me" button in the Hero section, providing a polished user experience.

- Professional Footer Links: Integrated links for GitHub, LinkedIn, and mailto: for instant professional contact.

- Fast Deployment: Deployed via Netlify for blazing-fast loading speeds and automatic deployments upon every commit to the main branch.



<h2>🏗️ Tech Stack</h2>

This project is built using the following core technologies, chosen for their efficiency, speed, and modern web development standards:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React (with Hooks)** | Building the interactive user interface and ensuring component modularity. |
| **Build Tool** | **Vite** | Provides a lightning-fast development server and highly optimized production bundling. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid, responsive, and maintainable styling. |
| **Icons** | **Lucide React** | Lightweight, consistent vector icons for UI elements and social links. |
| **Serverless Backend** | **Google Apps Script** | Handles asynchronous POST requests from the contact form and securely logs data to a Google Sheet. |
| **Deployment** | **Netlify** | Continuous Deployment (CD) and global Content Delivery Network (CDN) hosting. |



<h2>⚙️ Setup and Deployment</h2>

Prerequisites

- Node.js (LTS version)

- A Git client

- A GitHub repository and a Netlify account

<h3>1. Local Development</h3>

Clone the repository and install dependencies:

```
git clone https://github.com/jethromoleno/MyWebfolio.git
cd MyWebfolio
npm install 
# or 
yarn install
```

Start the local development server:

```
npm run dev
# or 
yarn dev
```

<h3>2. Contact Form Setup (Crucial)</h3>
To make the contact form functional:

- Set up a Google Apps Script Web App to receive the form data and link it to a Google Sheet.

- Replace the placeholder URL in the Contacts.jsx component's form submission logic with your own Google Apps Script Web App URL.

<h3>3. Production Build</h3>
To create the production-ready static assets:

```
npm run build
# or 
yarn build
```

The compiled files will be placed in the dist directory, which is the folder used for hosting.

<h3>4. Continuous Deployment (Netlify)</h3>

- Connect your GitHub repository to your Netlify account.

- Configure Netlify settings:

- Build command: npm run build

- Publish directory: dist

- Netlify will automatically build and deploy the site upon every push to your main branch.



<h2>🧑‍💻 Author</h2>

<h4>Jethro P. Moleño

Computer Engineering – Mapúa University

Website: https://myportfolio-jethromoleno.netlify.app

Email: jethromoleno@gmail.com

LinkedIn: www.linkedin.com/in/jethromoleno</h4>
