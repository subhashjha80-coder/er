# ExamReady — Ad Fix Instructions

## Files in this folder

| File | Purpose |
|---|---|
| `adfix.js` | Fixes the broken Ad Manager buttons in admin.html |
| `native-ads.js` | Makes ads visible on all public pages (native placeholders + real code) |

---

## Step 1 — Fix the Admin Panel buttons

The root cause: `const adMgr = { … }` in admin.html is block-scoped, so
`onclick="adMgr.saveSlot(…)"` always throws `ReferenceError: adMgr is not defined`.

**Option A — Quick fix (recommended, 2 minutes)**

1. Copy `adfix.js` to your project root (same folder as `admin.html`).
2. Open `admin.html` and find the very last `</body>` tag.
3. Add one line just before it:

```html
    <script src="adfix.js"></script>
  </body>
</html>
```

That's it. All Ad Manager buttons (Save Slot, Save All, Enable All, etc.) will work immediately.

**Option B — One-line code edit**

Open `admin.html`, find this line (around line 850 in the inline `<script>`):

```js
// Ad Manager public API
const adMgr = {
```

Change `const adMgr` to `window.adMgr`:

```js
// Ad Manager public API
window.adMgr = {
```

Save. Done.

---

## Step 2 — Make ads visible on all public pages

1. Copy `native-ads.js` to your project root.
2. Add this line to **every public HTML page** (index.html, class9.html, quizzes.html, etc.)
   just before the `</body>` tag, after `animations.js`:

```html
    <script src="animations.js"></script>
    <script src="native-ads.js"></script>   ← add this
  </body>
```

**What this does:**
- When no ad code is saved → shows polished native promotion cards for your own pages
- When real AdSense code IS saved in Admin → Ad Manager → injects that code instead
- Shows a top strip, inline break, between-sections mini card, pre-footer banner, and mobile sticky bar
- Fully dismissable mobile sticky bar
- Works alongside your existing `ads.js` without conflicts

---

## Step 3 — Add real ads (when ready)

1. Go to **Admin Panel → Ad Manager**
2. Paste your AdSense `<script>` or `<ins>` code into any slot
3. Click **Save Slot**
4. That slot immediately shows real ads on the live site

---

## Quick patch script (optional)

If you want to patch all HTML files at once, run this from your project root:

```bash
for f in *.html; do
  [[ "$f" == "admin.html" ]] && continue
  grep -q 'native-ads.js' "$f" && continue
  grep -q 'animations.js' "$f" || continue
  sed -i 's|<script src="animations.js"></script>|<script src="animations.js"></script>\n    <script src="native-ads.js"></script>|g' "$f"
  echo "Patched: $f"
done
```
