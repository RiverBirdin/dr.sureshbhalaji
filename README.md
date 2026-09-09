# Dr. S. Sureshbhalaji — Personal Medical Portfolio Website

A premium, minimal personal website for **Dr. S. Sureshbhalaji**, Consultant Urologist & Andrologist. Built with HTML5, CSS3, and vanilla JavaScript — no frameworks or dependencies.

## Project Overview

This static website helps patients understand who Dr. Sureshbhalaji is, what he specializes in, and how to book a consultation. The design prioritizes trust, clarity, and accessibility over generic hospital-template aesthetics.

**Pages:**
- `index.html` — Home
- `about.html` — About the doctor
- `blog.html` — Blog (WordPress-ready)
- `bookings.html` — Appointment request form
- `contact.html` — Contact information and locations

## Technology

- HTML5 (semantic markup)
- CSS3 (custom properties, mobile-first responsive design)
- Vanilla JavaScript (ES modules)
- Google Fonts: Manrope (headings), Inter (body)

No React, Bootstrap, Tailwind, jQuery, or build tools required.

## Folder Structure

```
/
├── index.html
├── about.html
├── blog.html
├── bookings.html
├── contact.html
├── css/
│   ├── variables.css      # Design tokens
│   ├── base.css           # Reset, typography, utilities
│   ├── components.css     # Buttons, cards, forms, etc.
│   ├── layout.css         # Header, footer, page sections
│   ├── responsive.css     # Breakpoints
│   └── animations.css     # Scroll reveal, reduced motion
├── js/
│   ├── main.js            # Site config, images, contact placeholders
│   ├── navigation.js      # Mobile menu, sticky header
│   ├── booking.js         # Form validation, WhatsApp integration
│   ├── blog.js            # WordPress blog bridge
│   └── contact.js         # Contact page enhancements
└── assets/
    └── images/            # Placeholder SVG images (replace before launch)
```

## How to Run

### Option 1: Open directly
Double-click `index.html` in your file browser.

> Note: ES modules require a local server in some browsers when opening files directly. If scripts don't load, use Option 2.

### Option 2: Local static server (recommended)

**Python:**
```bash
cd doctor_portfolio
python -m http.server 8080
```
Visit `http://localhost:8080`

**Node.js (npx):**
```bash
npx serve .
```

**VS Code / Cursor:** Use the "Live Server" extension.

## How to Replace Images

All image paths are centralized in `js/main.js`:

```javascript
images: {
  doctor: "assets/images/doctor-placeholder.svg",
  consultation: "assets/images/consultation-placeholder.svg",
  // ...
}
```

### Quick replacement

1. Add your real photograph to `assets/images/` (e.g. `doctor.jpg`)
2. Update the path in `js/main.js`:
   ```javascript
   doctor: "assets/images/doctor.jpg",
   ```
3. Also update the `src` attribute on the hero `<img>` in HTML if needed (the `data-image="doctor"` attribute auto-applies via JS)

**Important:** The current doctor image is clearly marked as a placeholder. Do not use stock photos as the doctor's portrait.

## How to Update Doctor Information

Edit the `siteConfig.doctor` object in `js/main.js`:

```javascript
doctor: {
  displayName: "Dr. S. Sureshbhalaji",
  brandName: "Dr. Sureshbhalaji",
  qualifications: "MS, DNB, MCh – Urology",
  title: "Consultant Urologist & Andrologist",
  subtitle: "Laparoscopic & Renal Transplant Surgeon",
}
```

Page content is in the HTML files. Search for placeholder text like `[Hospital Name]` and replace with verified information.

## How to Update Contact Information

Edit `siteConfig.contact` in `js/main.js`:

```javascript
contact: {
  phone: "+91 9876543210",
  whatsapp: "919876543210",    // Country code, no + or spaces
  email: "clinic@example.com",
  address: "123 Clinic Road, City",
  timings: "Mon–Sat, 9 AM – 5 PM",
}
```

Once updated, all `[Phone Number]`, `[Email Address]`, and `[WHATSAPP_NUMBER]` placeholders across the site will automatically become working `tel:`, `mailto:`, and WhatsApp links.

Also update `siteConfig.locations` for hospital/clinic cards and the booking form dropdown.

## How Booking Works

The booking page is a **front-end only** form. On submit:

1. Client-side validation runs (name, phone, hospital, date required)
2. A WhatsApp message is composed from the form data
3. If `whatsapp` is configured in `siteConfig.contact`, it opens WhatsApp with the pre-filled message
4. If still a placeholder, a preview message is shown with instructions to configure WhatsApp

**No data is stored** in localStorage or sent to a backend.

Example WhatsApp message:
```
Hello, I would like to request a consultation with Dr. S. Sureshbhalaji.

Name: ...
Phone: ...
Preferred Hospital: ...
Preferred Date: ...
```

## WhatsApp Integration

1. Set the WhatsApp number in `js/main.js`:
   ```javascript
   whatsapp: "919876543210",
   ```
   Use international format without `+` or spaces (India: `91` + 10-digit number).

2. Submit the booking form — it opens `https://wa.me/919876543210?text=...`

3. The clinic team receives the message and confirms availability manually.

## WordPress Blog Integration

The **Blog** page (`blog.html`) is ready to connect to WordPress. Configure in `js/main.js`:

```javascript
blog: {
  wordpressUrl: "https://yourdomain.com/blog",
  redirectOnVisit: false,
  navOpensWordPress: false,
  openInNewTab: false,
  embedWordPress: false,
},
```

### Integration options

| Option | Setting | Result |
|--------|---------|--------|
| **Bridge page** (default) | `wordpressUrl` only | Hides placeholders, shows “Visit the Blog” button |
| **Direct redirect** | `redirectOnVisit: true` | `blog.html` redirects to WordPress |
| **Navbar → WordPress** | `navOpensWordPress: true` | “Blog” in navbar opens WordPress directly |
| **Embed** | `embedWordPress: true` | WordPress loads in an iframe on `blog.html` |

### Typical WordPress setup

1. Install WordPress at `yourdomain.com/blog/` (subdirectory) or `blog.yourdomain.com` (subdomain)
2. Set `blog.wordpressUrl` to that URL
3. Choose bridge, redirect, or embed mode above
4. Optionally remove placeholder article cards once WordPress is live

**Note:** For best SEO and styling, subdirectory WordPress with matching header/footer (WordPress theme) is recommended. The static site navbar can link directly to WordPress when `navOpensWordPress` is enabled.

## Production Checklist

Before deploying to production:

- [ ] Replace all `[placeholder]` content with verified information
- [ ] Replace doctor placeholder image with professional photograph
- [ ] Update contact phone, WhatsApp, email, and address in `js/main.js`
- [ ] Update hospital locations in `js/main.js` and HTML
- [ ] Verify academic titles and institutional affiliations
- [ ] Verify statistics (800+ transplants, 1 Lakh+ kidney stone procedures)
- [ ] Add Google Maps embed on contact page
- [ ] Update `<link rel="canonical">` and Open Graph URLs
- [ ] Test booking form on mobile with real WhatsApp number
- [ ] Test all pages at 320px, 768px, 1024px, 1440px
- [ ] Run accessibility audit (keyboard nav, screen reader, contrast)
- [ ] Review medical disclaimer with legal/compliance if needed

## CONTENT TO VERIFY BEFORE PRODUCTION

The following content uses placeholders or draft information and **must be verified** before publication:

| Item | Status |
|------|--------|
| Doctor qualifications (MS, DNB, MCh – Urology) | Draft — verify exact format |
| Professional designations (Professor, Associate Professor) | Draft — verify current titles |
| Hospital affiliations | Placeholder — verify names and spellings |
| Dhanalakshmi Srinivasan Medical College, Siruvachur | Draft — verify |
| Srinivasan Medical College, Samayapuram | Draft — verify |
| Hospital addresses | Placeholder |
| Phone number | Placeholder |
| WhatsApp number | Placeholder |
| Email address | Placeholder |
| Consultation days and hours | Placeholder |
| 800+ renal transplantation cases | Provided — verify exact figure |
| 10+ years renal transplant experience | Provided — verify |
| 1 Lakh+ kidney stone procedures | **Unverified** — marked with asterisk |
| Doctor photographs | Placeholder only |
| Awards / certifications | Not included — do not add without verification |
| Publications | Not included — do not add without verification |
| Patient reviews / testimonials | Not included — do not fabricate |
| Social media links | Not included |

## Medical Content Safety

This website intentionally avoids:
- Guaranteed treatment outcomes
- Fabricated testimonials or reviews
- Fear-based marketing language
- Unverified statistics presented as confirmed facts

The "1 Lakh+ Kidney Stone Procedures" statistic is marked with `*` and includes a verification note.

## License

© 2026 Dr. S. Sureshbhalaji. All Rights Reserved.

---

Built as a static, maintainable website for easy updates by a developer or clinic staff member.
#   d r . s u r e s h b h a l a j i  
 