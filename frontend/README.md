# Sajilo Sahayata – Real-Time Disaster Management & Coordination System

**Sajilo Sahayata** is a multilingual, real-time disaster management and citizen coordination platform designed to help citizens report emergencies, and enable government or response teams to manage, visualize, and act swiftly using location-based intelligence.

A full-stack application built using React, Tailwind CSS, Node.js, Express, MongoDB. Designed to help communities in Nepal report and coordinate responses to incidents like fire, flood, landslides, accidents, and more — swiftly and effectively.

---

## Features

- Submit incident reports with **live geolocation** and **photo evidence**
- Real-time incident broadcast to connected dashboards
- Filter and sort incident feed by **status** (Pending / Reported / Working / Solved)
- **Notification bar** for urgent incidents
- **Admin/SOS panel** for emergency escalation
- Multilingual support via **i18next**
- Responsive, mobile-first UI powered by **Tailwind CSS**

---

## ⚙️ Tech Stack

**Frontend:**  
• React (CRA)  
• Tailwind CSS  
• i18next (translations)

**Backend:**  
• Node.js + Express  
• MongoDB (Mongoose ODM)  
• Multer for file uploads  
• Real-time with WebSockets / Socket.io (optional)

**Dev Tools:**  
• Axios for API calls  
• React Router for navigation  
• dotenv for configuration  
• ESLint / Prettier for code consistency

---

## 🚀 Quick Start

### 1. Clone:

````bash
git clone https://github.com/arundada9000/Sajilo-Sahayata.git
cd Sajilo-Sahayata
cd frontend
npm install
npm run dev

---

## Repository Structure
<pre lang="plaintext"> ```
sajilo-sahayata-frontend/
📁 src
  📄 App.jsx
  📄 i18n.js
  📄 index.css
  📄 main.jsx
  📄 Socket.jsx
  📁 stores
    📄 localGovStore.js
    📄 useAuth.js
    📄 useAuthStore.js
    📄 UsePreference.jsx
    📄 useRegistration.js
  📁 services
    📄 api.js
    📄 firebase.js
  📁 routes
    📄 AppRoutes.jsx
  📁 pages
    📄 Unauthorized.jsx
    📁 Reports
      📄 ReportForm.jsx
    📁 Dashboard
      📄 Alerts.jsx
      📄 EmergencyTypeSelection.jsx
      📄 Home.jsx
      📄 MapPage.jsx
      📄 Profile.jsx
      📄 Reports.jsx
    📁 Auth
      📄 ForgotPassword.jsx
      📄 Login.jsx
      📄 Signup.jsx
      📄 VerifyOTP.jsx
      📄 Welcome.jsx
    📁 Alerts
      📄 AlertsFeed.jsx
    📁 Admin
      📄 Dashboard.jsx
  📁 locales
    📁 ne
      📄 translation.json
    📁 en
      📄 translation.json
  📁 layouts
    📄 AdminLayout.jsx
    📄 Navigation.jsx
  📁 hooks
    📄 useLocalGovernment.js
  📁 data
    📄 dummyReports.js
  📁 contactInfo
    📁 Tillotama
      📄 Accident.jsx
      📄 Fire.jsx
      📄 Flood.jsx
      📄 Landslide.jsx
      📄 Other.jsx
      📄 Police.jsx
    📁 Siddharthanagar
      📄 Accident.jsx
      📄 Fire.jsx
      📄 Flood.jsx
      📄 Landslide.jsx
      📄 Other.jsx
      📄 Police.jsx
    📁 Omsatiya
      📄 Accident.jsx
      📄 Fire.jsx
      📄 Flood.jsx
      📄 Landslide.jsx
      📄 Other.jsx
      📄 Police.jsx
    📁 Butwal
      📄 Accident.jsx
      📄 Fire.jsx
      📄 Flood.jsx
      📄 Landslide.jsx
      📄 Other.jsx
      📄 Police.jsx
  📁 components
    📄 AdminSidebar.jsx
    📄 AlertModal.jsx
    📄 ReportCard.jsx
    📄 ReportDetailModal.jsx
    📄 ReportEditModal.jsx
    📄 SummaryCard.jsx
    📁 charts
      📄 ReportsByStatusChart.jsx
  📁 Auth
    📄 ForgotPassword.jsx
    📄 Login.jsx
    📄 Logout.jsx
    📄 RequireAdmin.jsx
    📄 Signup.jsx
    📄 VerifyOTP.jsx
    📄 Welcome.jsx
  📁 assets
    📄 react.svg
  📁 api
    📄 axios.js
  📁 Admin
    📄 Dashboard.jsx
    📄 Manage-Reports.jsx
    📄 Manage-Users.jsx
    📄 SendAlerts.jsx

``` </pre>

## Features

- **Multilingual UI** (English, Nepali)
- **OTP-based login** via phone number (Not implemented yet)
- **Live map** with disaster reports (fire, flood, landslide, etc.)
- **Incident reporting** with real-time location, photo/video capture
- **Admin dashboard** for viewing, filtering, and managing reports
- **Notification system** (real-time alerting)
- **Profile drawer** with user settings (theme, font, language)
- Modular and scalable frontend with Zustand-based state management

---
````

**Need Help?**

- Contact me on WhatsApp: **+977 9811420975**
