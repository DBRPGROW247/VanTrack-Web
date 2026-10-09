# VanTrack — Google Play Account & Data Deletion Web Portal

This folder contains the **official standalone web portal** for VanTrack account and personal data deletion, built specifically to satisfy:
1. **Google Play Store Policy:** Mandatory Account Deletion & User Data Deletion URL.
2. **India DPDP Act 2023 (Section 12):** Statutory Right to Correction and Erasure.

---

## 📁 File Structure

```
account_deletion_web/
├── index.html     # Semantic, mobile-responsive webpage with in-app guides & web form
├── styles.css     # Clean modern design system matching VanTrack branding
├── script.js      # Form validation, unique ticket generation, clipboard & email actions
└── README.md      # Deployment and Play Console submission guide
```

---

## 🚀 How to Deploy / Host This Website

Google Play Console requires this page to be **publicly accessible without login or payment**. You can host these static files for free using any of the following services:

### Option A: GitHub Pages (Fastest & Free)
1. In your GitHub repository, create a branch (e.g. `gh-pages`) or go to **Settings > Pages**.
2. Select the directory (`/account_deletion_web` or a custom subfolder).
3. Your live URL will look like:
   `https://<your-username>.github.io/<repo-name>/account_deletion_web/`

### Option B: Vercel / Netlify / Cloudflare Pages (Free)
1. Drag and drop the `account_deletion_web` folder into [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop).
2. It assigns an instant public HTTPS URL, e.g.:
   `https://vantrack-delete-account.vercel.app`

### Option C: Custom Domain
Point your domain path:
`https://vantrack.app/delete-account`

---

## 📱 Submitting in Google Play Console

1. Log into your [Google Play Console](https://play.google.com/console).
2. Select your app **VanTrack** (`com.vantrack.app`).
3. Under **Policy and programs** in the left sidebar, click **App Content**.
4. Locate the **Data Safety** form.
5. In the **Account Deletion** section:
   - Select **"Yes, users can create an account in the app"**.
   - Check **"Yes, the app provides a link for users to request account deletion"**.
   - Paste your hosted deletion URL (e.g., `https://vantrack.app/delete-account`).
   - Check the box confirming users can delete their accounts from within the app as well.
6. Save and submit your update for review.
