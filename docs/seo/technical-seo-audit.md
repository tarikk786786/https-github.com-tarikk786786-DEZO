# DEZO Technical SEO Audit & Search Visibility Roadmap

**Domain:** `https://dezo.in`  
**Target Canonical Host:** `https://dezo.in` (Strict HTTPS, apex domain)  
**Primary Region:** Bhubaneswar, Odisha, India (Pan-India delivery)  

---

## 1. Technical Health & Directives

### A. Robots.txt
- File generated dynamically via `app/robots.ts`.
- Directives:
  - `User-Agent: *`
  - `Allow: /`
  - `Disallow: /api/`
  - `Sitemap: https://dezo.in/sitemap.xml`
- **Assessment:** Clean, standards-compliant, correctly disallowing sensitive API endpoints while allowing full crawl of marketing pages.

### B. Sitemap Architecture
- File generated dynamically via `app/sitemap.ts`.
- Covers all 51 core routes, programmatic service pages (`/services/[slug]`), solutions (`/solutions/[slug]`), industries (`/industries/[slug]`), and local SEO hubs (`/locations/bhubaneswar`, `/locations/odisha`).
- Priorities:
  - Homepage: 1.0 (daily)
  - Work / Services / Start a Project / Local Hubs: 0.95 (weekly)
  - Legal & Privacy: 0.2 (yearly)
- **Assessment:** Excellent sitemap hygiene.

### C. Structured Data (JSON-LD)
Structured schemas active across the site:
1. **Organization / ProfessionalService:** On root layout (`lib/seo/jsonld.ts`), declaring name, logo, phone, founder (*Tarik Islam*), studio coordinates (*Bhubaneswar*), price range, and official social handles.
2. **WebSite Schema:** Declares canonical search authority and publisher ID.
3. **LocalBusiness Schema:** Implemented on `/locations/bhubaneswar` and `/locations/odisha` targeting local enterprise queries.
4. **FAQPage Schema:** Embedded dynamically on high-intent service and pricing pages.
5. **BreadcrumbList Schema:** Implemented on nested service and solution routes.

---

## 2. On-Page Keyword & Search Intent Architecture

| Target Route | Primary Search Intent | Target Query Cluster | Primary Entity |
| :--- | :--- | :--- | :--- |
| `/` | Commercial / Branded | digital infrastructure india, growth company odisha, modern web agency | DEZO |
| `/services/web-development` | Transactional | next.js web development company india, custom headless ecommerce | Web Development |
| `/services/seo` | Transactional | seo agency bhubaneswar, organic search growth india | SEO Services |
| `/services/amazon` | Commercial | amazon sp-api agency india, amazon seller marketing agency | Marketplace Acceleration |
| `/locations/bhubaneswar` | Local Commercial | website development company in bhubaneswar, digital marketing agency odisha | DEZO Bhubaneswar Studio |
| `/work` | Proof / Navigational | live ecommerce portfolio, agency website showcase 180+ sites | DEZO Portfolio |

---

## 3. Generative Engine Optimization (GEO) & AI Search Plan

To ensure DEZO is cited as a prime authority in AI search engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews):
1. **Direct-Answer Definitions:** Every service page opens with a factual 35-word definition explaining the deliverable, tech stack, and timeline.
2. **Founder & Brand Knowledge Graph:** Tarik Islam as Founder & CEO linked to `https://tarikislam.in` and GitHub `https://github.com/tarikk786786`.
3. **Verifiable Proof Density:** Highlight the 181 live website archive, proprietary DEZO Growth OS telemetry, and marketplace SP-API integration capabilities.
