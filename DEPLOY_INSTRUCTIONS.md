# 🚀 How to Publish Your SparkPlugged Website

To make `sparkplugged.com` real, we need two things:
1.  **The Name** (Domain Registration) - You buy this.
2.  **The House** (Hosting) - You put the files here (Netlify).

---

## Step 1: Buy the Domain (The Name)
*You need to purchase the rights to "sparkpluggedts.com".*

1.  Go to a **Domain Registrar**.
    *   **Namecheap** (Recommended for price/ease).
    *   **Cloudflare** (Best for tech/security).
    *   **GoDaddy** (Common, but upsells a lot).
2.  Search for `sparkpluggedts.com`.
3.  Purchase it. (Usually $10-$15/year).

---

## Step 2: Host the Site (The House)
*We need a place to put these HTML files so the world can see them.*

### Option A: Netlify Drop (Easiest)
*Best for: Getting live in 30 seconds.*

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag and drop the entire `SparkPlugged-Website` folder onto the page.
3.  **Boom.** You are live with a temporary link (e.g., `sparkling-unicorn-123456.netlify.app`).

### Option B: GitHub Pages (Developer Standard)
*Best for: Keeping code and hosting together.*

1.  Create a new Public Repository on GitHub named `sparkplugged-website`.
2.  Upload the contents of this folder to that repository.
3.  Go to **Settings > Pages**.
4.  Under "Source", select `main` branch and `/root` folder.
5.  Click **Save**.

---

## Step 3: Connect Them
*Point your new Name to your new House.*

1.  Log in to **Netlify** (or GitHub).
2.  Go to **Domain Settings**.
3.  Click **"Add Custom Domain"**.
4.  Type `sparkpluggedts.com`.
5.  Netlify will give you "DNS Records" (usually `nameservers`).
6.  Go back to where you bought the domain (Namecheap/etc.).
7.  Paste those "nameservers" into the settings.
8.  Wait ~1 hour. **Done.**

---

## 💡 Recommendation
1.  **Buy the domain first.** (Secure the name).
2.  **Use Netlify Drop** to host the files.
3.  **Connect them.**
