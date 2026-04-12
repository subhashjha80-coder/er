# ExamReady — Ad Manager Fix Notes

## Root Causes Found & Fixed

### Bug 1 — `const adMgr` not accessible from inline onclick handlers (CRITICAL)
**File:** admin.html  
**Problem:** `const adMgr = {...}` in a `<script>` tag does NOT create a `window.adMgr` property. 
Inline `onclick="adMgr.saveSlot(...)"` handlers run in global scope and look up `window.adMgr`, 
so clicking "Save Slot" **silently did nothing** in many browsers.  
**Fix:** Changed to `window.adMgr = { ... }` and also used `data-ad-key` attributes on buttons 
instead of embedding the key in the inline JS string — avoids single-quote escaping issues.

### Bug 2 — `DEFAULT_AD_SLOTS` in shared.js only had 7 keys (CRITICAL)
**File:** shared.js  
**Problem:** Admin configures 17 slots (top_banner, inline_1/2/3, between_sections, pre_footer, 
results_banner, solution_mid, quiz_sidebar, sidebar_sticky, etc.) but `getAdSlots()` in shared.js 
only merged and returned the original 7 defaults. Admin-configured values for the other 10 slots 
were stored in localStorage but **never read back** by `insertSmartAds()`.  
**Fix:** Replaced `DEFAULT_AD_SLOTS` with `AD_SLOT_REGISTRY` covering all 17 slots. 
`getAdSlots()` now merges all registry keys + any extra keys admin may have added.

### Bug 3 — Double-injection of sticky / mobile-bottom ads
**File:** shared.js + ads.js  
**Problem:** Both `shared.js` (insertSmartAds) and `ads.js` tried to inject sticky sidebar and 
mobile bottom bar. First one injected successfully; second one saw the element already existed and 
skipped, but sometimes race conditions caused duplicates.  
**Fix:** `shared.js` now uses `data-er-ad-slot` attribute guards. 
`ads.js` should check for `document.getElementById('er-sticky-sidebar')` / 
`document.getElementById('er-mobile-bottom')` (already does via its own IDs — they differ, so 
coexistence is fine as long as only one is enabled per slot pair).

### Bug 4 — Ad slot key inconsistency between admin and injection systems
**File:** shared.js, admin.html  
**Problem:** Admin stored values under `top_banner` but `insertSmartAds` only read `top`. 
Admin stored values under `sidebar_sticky` but shared.js only injected `sticky`.  
**Fix:** Injection functions now check the canonical key first and fall back to the alias:
- Top: uses `top` (shared), ads.js uses `top_banner` — both read from same storage
- Sticky: uses `sticky` if it has code, otherwise `sidebar_sticky`  
- Between: uses `between` if it has code, otherwise `between_sections`

## How to Apply

### 1. Replace shared.js
Replace your current `shared.js` with the new `shared.js` file.

### 2. Patch admin.html
In `admin.html`, find the section comment:
```
// ============================================================
// ====== AD MANAGER — FULLY INTEGRATED ======
// ============================================================
```
Delete everything from that comment down to (but NOT including):
```
// ============================================================
// INIT
// ============================================================
```
Paste the contents of `admin_ad_patch.js` in that spot.

Also in admin.html, in the `renderDashboard()` function, replace the old `loadAdSlots()` call section.
The `loadAdSlots` function is now defined in the ad patch and is hoisted, so it will be available.

### 3. No changes needed to ads.js
`ads.js` reads directly from `er_ad_slots` localStorage key using its own `getSlot()` function.
Since all systems write to the same `er_ad_slots` key, no changes needed.

### 4. No changes needed to any page HTML files
`shared.js` is already included on all pages and `insertSmartAds()` runs automatically.

## Slot Key Reference (admin ↔ injection mapping)

| Admin Key        | Injected by     | Where                          |
|-----------------|-----------------|--------------------------------|
| top             | shared.js       | After hero, all pages          |
| top_banner      | ads.js          | After hero, all pages          |
| footer          | shared.js       | Before footer, all pages       |
| pre_footer      | ads.js          | Before footer, all pages       |
| inline          | shared.js       | Between sections, all pages    |
| inline_1        | ads.js          | First break, all pages         |
| inline_2        | ads.js          | Second break, long pages       |
| inline_3        | ads.js          | Third break, long pages        |
| between         | shared.js       | After 2nd class-section block  |
| between_sections| ads.js          | After 2nd class-section block  |
| results         | shared.js       | After quiz/article, high-intent|
| results_banner  | ads.js          | After quiz result card         |
| solution_mid    | ads.js          | Mid-way through solution post  |
| quiz_sidebar    | ads.js          | Quiz page sidebar              |
| sticky          | shared.js       | Fixed right sidebar, desktop   |
| sidebar_sticky  | ads.js          | Fixed right sidebar, desktop   |
| mobile_bottom   | shared.js+ads.js| Fixed bottom bar, mobile       |
