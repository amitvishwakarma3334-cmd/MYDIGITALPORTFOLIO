# Amit — Personal Digital Portfolio

A static, frontend-only personal portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Why Not Double-Click `index.html` Directly?

This project uses React, TypeScript (`.tsx`), and Vite. Modern browsers cannot run `.tsx` files directly via `file://` by double-clicking `index.html` (doing so causes a blank screen). Run it with Node.js using the commands below, or deploy the repository to Vercel, Netlify, or GitHub Pages.

## How to Run Locally (After Downloading Zip)

1. Install [Node.js (LTS)](https://nodejs.org/).
2. Open a terminal / Command Prompt inside this extracted project folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open **http://localhost:3000** in your browser.

To build static production files into `dist/`:

```bash
npm run build
```

## Asset Folders (Replace Dummy Files with Your Real Files)

All dummy placeholder files are pre-created in `public/assets/` so the portfolio runs out of the box. Replace them with your actual files (keeping the exact same filenames):

- **Profile Photo**: `public/assets/Profile/profile.png`
- **Certificates**:
  - `public/assets/Certificates/NASSCOM_Front.png` — Domestic Data Entry Operator Front Side (IT-ITeS Sector Skills Council NASSCOM, NSQF Level 2)
  - `public/assets/Certificates/NASSCOM_Back.png` — Domestic Data Entry Operator Back Side (IT-ITeS Sector Skills Council NASSCOM, NSQF Level 2)
  - `public/assets/Certificates/C1.png` — Front-end Web Development (240 Hours, Reliance Foundation Skilling Academy)
  - `public/assets/Certificates/C2.png` — Microsoft Excel Self Learning (Skill Course)
  - `public/assets/Certificates/C3.png` — 5-Day AI Agents Intensive Course with Google (Kaggle)
  - `public/assets/Certificates/C4.png` — 7 Day Login Streak (Kaggle)
  - `public/assets/Certificates/C5.png` — Agent of Discord (Kaggle)
  - `public/assets/Certificates/C6.png` — Code Uploader (Kaggle)
  - `public/assets/Certificates/C7.png` — Python Coder (Kaggle)
- **Resume PDF**: `public/assets/MYRESUME/MYRESUME.pdf`
- **CV PDF**: `public/assets/MYCV/MYCV.pdf`

## Optional Links Configuration

Open `src/data/defaultPortfolio.ts` and update `WORKINDIA_PROFILE_URL` (or `WHATSAPP_NUMBER`) when you want those buttons to appear on the site.
