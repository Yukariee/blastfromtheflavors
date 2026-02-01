# Blast from the Flavors - Website Setup Guide

## 📁 File Structure
Your project should have this structure:
```
your-project-folder/
├── index.html
├── style.css
├── script.js
├── logo.png          ← Add your logo here
└── Pics/
    ├── Nasi Goreng.png
    ├── Popiah.png
    ├── Dimsum.png
    ├── Limauice.png
    ├── Tehbeng.png
    └── Milodino.png
```

## 🎨 Adding Your Logo

### Step 1: Prepare Your Logo
- Recommended size: 500x500 pixels (or any square size)
- Supported formats: PNG (recommended), JPG, SVG
- Transparent background (PNG) works best
- Name your logo file: `logo.png`

### Step 2: Add Logo to Project
- Place your logo file in the **same folder** as `index.html`
- Make sure it's named `logo.png` (or update the filename in `index.html` line 13)

### To Change Logo Size:
Edit `style.css` and find the `.logo` section (around line 36):
```css
.logo {
    width: 120px;      /* Change this */
    height: 120px;     /* Change this */
    object-fit: contain;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;  /* Makes it circular - remove for square */
    padding: 0.5rem;
}
```

## 🚀 Uploading to GitHub and GitHub Pages

### YES, the redeem system WILL work on GitHub Pages! ✅

**Important Notes:**
1. ✅ localStorage works perfectly on GitHub Pages
2. ✅ All JavaScript functionality will work
3. ⚠️ **BUT**: localStorage is browser-specific, meaning:
   - Each student's browser tracks redemptions independently
   - The 500 total redemptions count is shared ONLY between users who use the SAME browser on the SAME device
   - Different browsers/devices start their own count

### For School Projects, This Means:
- **Single Device Setup**: If all students scan the QR and access from their own phones → Each phone tracks separately (NOT IDEAL)
- **Shared Device Setup**: If you use one tablet/computer for redemptions → Works perfectly (IDEAL)

### Recommended Setup for School:
**Option 1 - Controlled Redemption (Best)**
- Set up 1-2 tablets/computers at your booth
- Students show you their QR codes
- You (or a helper) enter the promo code on YOUR device
- This way, all 500 redemptions and 5 winners are tracked properly

**Option 2 - Self-Service (Works but not perfect)**
- Students scan and redeem on their own phones
- You won't reach exactly 500 total (since each phone tracks separately)
- But each student can only redeem once on their phone

## 📤 How to Upload to GitHub

### Step 1: Create a GitHub Account
- Go to https://github.com
- Sign up for a free account

### Step 2: Create a New Repository
1. Click the "+" icon (top right) → "New repository"
2. Repository name: `blast-from-flavors` (or any name you want)
3. Make it **Public**
4. ✅ Check "Add a README file"
5. Click "Create repository"

### Step 3: Upload Your Files
1. In your repository, click "Add file" → "Upload files"
2. Drag and drop ALL your files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `logo.png`
   - The entire `Pics` folder
3. Click "Commit changes"

### Step 4: Enable GitHub Pages
1. Go to your repository Settings
2. Scroll down to "Pages" (left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes
6. Your site will be live at: `https://your-username.github.io/blast-from-flavors/`

## 🔧 Testing Locally

Before uploading to GitHub, test on your computer:

### Option 1: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

### Option 2: Python Simple Server
```bash
# In your project folder:
python -m http.server 8000
# Then open: http://localhost:8000
```

## 🎮 Testing the Promo System

### To test winners quickly:
1. Open `script.js`
2. Change line 11 to: `const MAX_WINNERS = 5;` (already set)
3. Change line 8 to: `const MAX_REDEMPTIONS = 10;` (for quick testing)
4. This gives you 5 winners in 10 redemptions instead of 500

### To reset redemptions while testing:
1. Open browser DevTools (F12)
2. Go to Console
3. Type: `localStorage.clear()`
4. Refresh the page

### Current Configuration:
- Promo Code: `BLAST2024`
- Max Redemptions: 500
- Winners: 5
- Win Probability: Fairly distributed (increases as more people redeem)

## 🎯 QR Code Generation

After deploying to GitHub Pages:
1. Copy your live URL
2. Go to https://www.qr-code-generator.com/
3. Paste your URL
4. Download the QR code
5. Add it to your flyers

## ⚠️ Important Reminders

1. **Logo File**: Must be in the same folder as `index.html`
2. **Image Paths**: Make sure your `Pics` folder is uploaded with all images
3. **Testing**: Always test locally before deploying
4. **Promo Code**: Change `BLAST2024` in `script.js` if needed
5. **For School Use**: Consider using a controlled redemption setup with 1-2 devices

## 📝 Editing Content

### Change Promo Code:
`script.js` - Line 6: `const PROMO_CODE = "BLAST2024";`

### Change Max Redemptions:
`script.js` - Line 8: `const MAX_REDEMPTIONS = 500;`

### Change Number of Winners:
`script.js` - Line 11: `const MAX_WINNERS = 5;`

### Change Menu Prices:
`index.html` - Find the price tags like `<p class="menu-price">₱80</p>` and edit them

## 🆘 Troubleshooting

**Logo not showing?**
- Check filename matches exactly: `logo.png`
- Check it's in the same folder as `index.html`
- Try a different image format

**Promo not working?**
- Open DevTools Console (F12) to check for errors
- Clear localStorage: `localStorage.clear()`
- Make sure JavaScript is enabled in browser

**GitHub Pages not loading?**
- Wait 2-5 minutes after enabling
- Check repository is Public
- Make sure `index.html` is in the root folder

## 📞 Need Help?
- Check GitHub Pages documentation: https://pages.github.com/
- Test locally first before deploying
- Make sure all files are uploaded correctly

---
Good luck with your school bazaar! 🎉
