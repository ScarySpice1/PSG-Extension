# 🔵⚪🔴 PSG Match Extension

A beautiful Chrome extension that displays **upcoming**, **live**, and **past** matches of Paris Saint-Germain (PSG) directly from your browser! 🏟️

---

## ✨ Features

- ⚽ Sleek, modern interface with PSG colors
- 🟢 Live match detection with animated indicator
- 📅 Upcoming and past matches with scores and dates
- 🖼️ PSG logo and visual effects
- 🕐 Auto-refreshes periodically
- 📱 Responsive design (even looks good on mobile popups!)



## 🚀 Installation

1. Download or clone the repo.
2. Open **Chrome** > `chrome://extensions/`
3. Enable **Developer Mode**
4. Click on **"Load unpacked"** and select the project folder.



## 🛠️ API Setup (Required)

This extension uses the [Football-Data.org](https://www.football-data.org/) API.

1. Create a free account at: https://www.football-data.org/client/register
2. Get your **API key**
3. Open `popup.js` and replace the line:

   ```js
   const API_KEY = 'YOUR_API_KEY_HERE';
