# 🌐 Uday Kiran Nakka - Personal Portfolio Website

A modern, high-performance personal developer portfolio website designed for **Uday Kiran Nakka** (Software Development Engineer & Data Science Graduate).

---

## 🚀 Features & Highlights

- ⚡ **Sleek, Modern Aesthetics**: Clean obsidian dark-mode first design with customizable light mode toggle, glassmorphism cards, and glowing gradient accents.
- 💻 **Interactive Developer Terminal Simulator**: Real-time CLI widget where recruiters and visitors can test commands (`skills`, `projects`, `experience`, `certifications`, `education`, `contact`, `hire`).
- 📁 **Featured Projects Showcase**:
  - **Road Accident Protocol System** (Python, TensorFlow, CNN, Twilio, GPS) — 85% Accuracy audio-based crash detection.
  - **Modular Banking Application** (Python, SQL) — Secure account operations & transaction logs.
  - **Flipkart Product Review Scraper** (Python, BeautifulSoup, Pandas) — Automated dynamic web scraping & sentiment dataset generation.
- 💼 **Career & Internship Timeline**: Highlights Brainovision Solutions Data Visualization internship (Power BI, DAX, KPIs, ETL).
- 🎓 **Education & Certifications**: B.Tech in CS & Data Science (7.82 CGPA) + Python for Data Science, Java Full Stack, Power BI.
- 📱 **100% Responsive & Mobile Ready**: Clean layout on smartphones, tablets, laptops, and ultra-wide screens.
- 📋 **1-Click Copy & Direct Contact**: Instant clipboard copy for email/phone with toast alerts, plus direct messaging integration.
- 📄 **Integrated Resume Download**: Directly connected to `assets/Uday_Resume.pdf`.

---

## 📂 Project Structure

```
portfolio-website/
├── index.html              # Main HTML5 semantic file
├── css/
│   └── style.css           # Styling, dark/light theme, animations, responsive media queries
├── js/
│   └── main.js             # Particle canvas, terminal simulator, filters, modal popups, toast notifications
├── assets/
│   └── Uday_Resume.pdf     # Embedded PDF resume for instant download & viewing
└── README.md               # Documentation & deployment guide
```

---

## 🛠️ How to View Locally

Simply double-click `index.html` in file explorer to open it in any web browser (Chrome, Edge, Firefox, Safari).

Or start a local preview server with Python:
```bash
# In the portfolio directory:
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🚀 Free Hosting & Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Initialize git and create a repository on GitHub (e.g. `uday-portfolio` or `<your-username>.github.io`):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to repository **Settings** > **Pages** > Select Branch `main` > Save.
3. Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`!

### Option 2: Vercel / Netlify
1. Drag and drop the `portfolio-website` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
2. Live in less than 30 seconds with a free `.vercel.app` or `.netlify.app` domain.
