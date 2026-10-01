# OpsWired Dispatch OS (Speedoo Fleet Edition)
> **Logistics Dispatch & Payout Engine engineered by OpsWired / Kareem Kreations — Deployed for Speedoo Qatar**

An enterprise-grade, high-density courier operations and fleet dispatch platform built with Next.js 14/16 (App Router), Tailwind CSS, TypeScript, and Lucide React.

---

## 🌟 Key Features

1. **Operations Hub (`/`)**:
   - Real-time fleet metrics (Total, New Requisitions, In-Transit, Delivered, Deferred, Cancelled).
   - Financial Treasury Grid (QNB Corporate Account, Lusail Cash Vault, Driver Cash Floats, Net Movement).
   - Recent Shipments Table with click-to-open dispatch drawer.
   - On-Road Courier status cards with live drop counts.

2. **Orders Workspace (`/orders`)**:
   - High-density operational table with multi-criteria filtering (Status, Merchant Store, Driver, Zone, Search).
   - Interactive slide-over dispatch drawer:
     - Real-time status mutations (persisted in client state).
     - Live driver allocation with vehicle and zone awareness.
     - Cash collection status updating (Pending, Collected, Remitted).
     - Direct WhatsApp dispatch link with localized Arabic/English notification templates.
     - Instant print waybill and customer tracking shortcuts.
   - Bulk selection actions (Mark In-Transit, Mark Delivered, Bulk Assign).
   - "New Order +" modal with instant validation and waybill generation.

3. **Public Customer Tracking (`/track`)**:
   - Customer-facing consignment tracker with 4-milestone visual stepper:
     - Order Ingested ➔ Driver Allocated ➔ Out for Delivery ➔ Delivered & Signed.
   - Support for direct search or query parameters (`/track?order=SPD-2024-8841`).
   - Detailed delivery window, assigned courier card, and customer support shortcut.

4. **Printable A4 / Thermal 4x6 Waybill (`/invoice/[id]`)**:
   - Minimalist official waybill layout engineered for dispatch thermal printers.
   - QR code pointing to live digital tracking verification.
   - High-density barcode graphic.
   - Itemized fee breakdown (Goods COD + Courier Fee).
   - Driver & Recipient signature boxes.
   - Perforated merchant settlement tear-off receipt slip.

5. **Fleet Drivers Directory (`/drivers`)**:
   - Full driver profile roster with license plates, vehicles, assigned zones, customer ratings, and active on-road cash floats.

6. **Merchant Stores (`/stores`)**:
   - Partner merchant profiles, contracted delivery tariffs, pending payout balances, and active shipment counts.

7. **Treasury & Settlements Ledger (`/treasury`)**:
   - Wallets breakdown (Main Treasury Vault, QNB Corporate Bank, Driver Floats).
   - Transaction audit log of inflows (COD remittances) and outflows (merchant settlement payouts).

8. **Bilingual Arabic (RTL) & English (LTR)**:
   - Instant language switcher in the navbar that flips document direction (`ltr` / `rtl`), font styles (Cairo & Inter), and translates all operational terms into authentic GCC logistics terminology.

9. **Zero-Maintenance Interactive Sandbox**:
   - In-memory and `localStorage` reactive state. Clients can test changing statuses, assigning drivers, creating orders, and printing waybills without touching real databases or backend servers.

10. **Persistent Floating Agency Watermark**:
    - Floating pill: `Engineered by Kareem Kreations ↗` linking to `https://kareemkreations.com/proposal/`.

---

## 🚀 Free Forever Vercel Deployment Instructions

Follow these simple steps to deploy this sandbox live to Vercel for free with zero monthly maintenance:

### Step 1: Initialize Git and Commit
In the project directory (`c:\Users\hanyk\.gemini\antigravity-ide\scratch\opswired-dispatch-os`):
```bash
git init
git add .
git commit -m "feat: initial commit for OpsWired Dispatch OS sandbox"
```

### Step 2: Push to Your GitHub Account
Create a new public or private repository on GitHub (e.g., `opswired-dispatch-os` or `speedoo-dispatch-os`), then run:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/opswired-dispatch-os.git
git push -u origin main
```

### Step 3: Connect to Vercel (Free Hobby Tier)
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub (100% Free).
2. Click **"Add New Project"** and select **"Import"** next to your `opswired-dispatch-os` repository.
3. Vercel automatically detects **Next.js**.
4. Leave all build settings as default (`npm run build`).
5. Click **"Deploy"**.

Within ~45 seconds, your live interactive sandbox will be live at:
`https://opswired-dispatch-os.vercel.app` (or custom domain).
