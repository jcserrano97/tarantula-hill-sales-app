# Product Requirements Document (PRD)

## Project:  
**Tarantula Hill Brewing Co. Sales Lead Web App**

## Author:  
[Your Name]

## Date:  
[Today's Date]

---

## 1. Purpose

To empower the Tarantula Hill Brewing Co. sales team with a web application that streamlines the process of finding, contacting, and tracking potential leads (businesses likely to buy beer) in specific geographic areas, using zip codes and venue types.

---

## 2. Background & Problem Statement

The sales team currently relies on manual research and outdated lists to find new accounts. This is time-consuming, inconsistent, and often misses high-potential leads. There is a need for a centralized, easy-to-use tool that leverages real-time business data to identify and contact new prospects efficiently.

---

## 3. Goals & Objectives

- **Quickly find potential leads** by zip code and venue type.
- **Display actionable business information** (name, phone, email).
- **Enable direct outreach** via templated emails from within the app.
- **Track outreach activity** for each lead and sales team member.
- **Provide a simple, modern, and mobile-friendly UI.**

---

## 4. Scope

### In Scope
- Search for businesses by zip code and venue type.
- Display business name, phone number, email, and address.
- Allow users to send templated emails to leads.
- Track which leads have been contacted and by whom.
- User authentication and basic team management.
- Notes and status tracking for each lead.

### Out of Scope (for MVP)
- Bulk email campaigns.
- Deep CRM features (e.g., deal tracking, pipeline management).
- Mobile app (web app should be mobile-friendly).
- Advanced analytics dashboard.

---

## 5. User Stories

### Sales Rep
- As a sales rep, I want to search for leads by zip code and venue type so I can find new accounts in my territory.
- As a sales rep, I want to see business names, phone numbers, and emails so I can contact them easily.
- As a sales rep, I want to send a templated sales pitch email from the app so I can save time.
- As a sales rep, I want to add notes and update the status of each lead so I can track my outreach.
- As a sales rep, I want to see which leads I've already contacted so I don't duplicate efforts.

### Sales Manager
- As a manager, I want to see which leads have been contacted and by whom so I can track team activity.
- As a manager, I want to add or remove team members.

---

## 6. Functional Requirements

### 6.1 Lead Search
- Input: Zip code (required), venue type (required, multi-select: Bar, Restaurant, Brewery, Stadium, etc.)
- Output: List of businesses with:
  - Name
  - Address
  - Phone number
  - Email address (if available)
  - Website (if available)

### 6.2 Lead Details
- View more info about a business (map, website, social links, etc.)
- Add notes and update lead status (e.g., Contacted, Interested, Not Interested)

### 6.3 Outreach
- Send templated email to business from within the app
- Edit template before sending
- Log outreach activity (who, when, what template)

### 6.4 User Management
- Login/logout (Google, email, or SSO)
- Basic team management (add/remove users, assign roles)

### 6.5 Tracking & History
- See which leads have been contacted and by whom
- View notes and status history for each lead

---

## 7. Non-Functional Requirements

- **Performance:** Search results should load within 3 seconds.
- **Security:** User authentication required; only authorized users can access lead data.
- **Scalability:** Should support up to 50 concurrent users.
- **Mobile-Friendly:** Responsive design for use on phones/tablets.
- **Data Privacy:** Do not store sensitive business data beyond what is publicly available.

---

## 8. Data Sources & Integrations

- **Google Places API** (primary for business info)
- **Yelp Fusion API** (supplemental for bars/restaurants)
- **Hunter.io/Clearbit** (for email enrichment, if needed)
- **SendGrid/Mailgun** (for sending emails)

---

## 9. UI/UX Requirements

- Clean, modern, and intuitive interface (inspired by tools like Airtable, Notion, or Google Maps).
- Simple search form on landing page.
- Results displayed in a list (with optional map view in future).
- Easy access to contact actions and notes.

---

## 10. Success Metrics

- Time to find and contact a new lead reduced by 50%.
- At least 80% of sales team actively using the app within 1 month.
- Positive feedback from sales team (survey NPS > 8).

---

## 11. Risks & Mitigations

- **Incomplete business data:** Use multiple APIs and allow manual entry.
- **Email deliverability:** Use reputable email service providers.
- **API costs/limits:** Monitor usage and optimize queries.

---

## 12. Milestones & Timeline (MVP)

1. **Week 1-2:** Requirements, wireframes, and technical design
2. **Week 3-4:** Core search and display functionality
3. **Week 5:** Email sending and activity tracking
4. **Week 6:** User management and notes
5. **Week 7:** Testing, bug fixes, and polish
6. **Week 8:** Launch MVP

---

## 13. Appendix

### Venue Types
- Bars & Pubs
- Restaurants
- Breweries
- Stadiums & Arenas
- Hotels
- Event Venues
- Golf Courses
- Music Venues
- Liquor Stores
- Sports Clubs 