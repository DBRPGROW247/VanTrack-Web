# VanTrack — Legal & Compliance Web Portal

This repository contains the **official standalone web portal** for VanTrack, built specifically to satisfy:
1. **Google Play Store Policies:**
   - Mandatory **Privacy Policy URL** (Data Safety & User Privacy).
   - Mandatory **Account & Personal Data Deletion URL**.
2. **India Statutory Compliance:**
   - **Digital Personal Data Protection (DPDP) Act, 2023** (Sections 5, 6, 9, 11 & 12).
   - **Information Technology Rules, 2021** (Grievance Redressal Mechanism).
   - **Survey of India & National Geospatial Policy, 2022** (Civilian telemetry & boundary depiction).

---

## 📁 File Structure

```
VanTrack-Web/
├── index.html            # Official Account & Personal Data Deletion Portal
├── privacy_policy.html   # Official Privacy Policy (DPDP Act 2023, GPS Telemetry & Child Safety)
├── terms_conditions.html # Official Terms & Conditions of Service (DPDP Act 2023 & IT Rules 2021)
├── styles.css            # Responsive design system with prominent cross-navigation buttons
├── script.js             # Form validation, unique ticket generation, clipboard & email dispatch
└── README.md             # Git push guide, deployment, and Play Console compliance
```

---

## 🚀 Easy Step-by-Step Guide: Pushing Changes to GitHub

To push the new Privacy Policy, Terms & Conditions, and updated responsive navigation buttons to your live repository (`DBRPGROW247/VanTrack-Web`), follow these simple steps:

### Step 1: Open Terminal in the Web Folder
Open **PowerShell** or **Command Prompt** and navigate to this folder:
```powershell
cd c:\Praj\DBRP\Application\VanTrack\VanTrack\account_deletion_web
```

### Step 2: Check Status
Verify which files were modified and created:
```powershell
git status
```
*You will see `index.html`, `styles.css`, `README.md` under modified files, and `privacy_policy.html`, `terms_conditions.html` under untracked files.*

### Step 3: Stage All Changes
Add all modified and new files to git staging:
```powershell
git add .
```

### Step 4: Commit the Changes
Create a clear commit message:
```powershell
git commit -m "Add Privacy Policy, Terms & Conditions, and cross-page navigation buttons"
```

### Step 5: Push to GitHub
Push your commit to the `main` branch on GitHub:
```powershell
git push origin main
```

*(If you are hosting via Cloudflare Pages or GitHub Pages, your live website updates automatically within 30–60 seconds of pushing!)*

---

## 🌐 Live Webpage URLs

Once pushed, your three compliance pages will be live at:

| Page | Path / URL | Purpose |
| :--- | :--- | :--- |
| **Account Deletion** | `https://vantrack.pages.dev/index.html` (or `/`) | Google Play Account Deletion URL |
| **Privacy Policy** | `https://vantrack.pages.dev/privacy_policy.html` | Google Play App Content & Privacy Policy URL |
| **Terms & Conditions** | `https://vantrack.pages.dev/terms_conditions.html` | Statutory Terms of Service |

*(Note: Replace `vantrack.pages.dev` with your custom domain or Cloudflare/GitHub Pages URL if different).*

---

## 📱 Submitting URLs in Google Play Console

### 1. Privacy Policy Submission
1. Go to [Google Play Console](https://play.google.com/console) &rarr; select **VanTrack**.
2. In the left menu, scroll down to **Policy and programs** &rarr; click **App content**.
3. Under **Privacy Policy**, click **Manage** / **Start**.
4. Paste your live Privacy Policy URL:
   ```
   https://<your-domain>/privacy_policy.html
   ```
5. Click **Save**.

### 2. Account & Data Deletion URL Submission
1. In **App content**, locate **Data safety** &rarr; click **Manage**.
2. In the **Account Deletion** section:
   - Select **"Yes, users can create an account in the app"**.
   - Select **"Yes, the app provides a link for users to request account deletion"**.
   - Paste your deletion URL:
     ```
     https://<your-domain>/index.html
     ```
   - Check the box confirming users can delete their accounts directly from inside the app (`Profile -> Settings -> Delete Account`).
3. Click **Next** &rarr; **Save**.
