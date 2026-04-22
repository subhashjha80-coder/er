/**
 * adfix_patch.js — ExamReady Ad Manager Fix (Drop-in)
 * =====================================================
 * PROBLEM: admin.html declares  const adMgr = { … }
 * const is block-scoped → window.adMgr is undefined → every
 * onclick="adMgr.saveSlot(…)"  silently throws ReferenceError.
 *
 * DROP THIS FILE in your project root, then add ONE line at the
 * very bottom of admin.html just before </body>:
 *
 *   <script src="adfix_patch.js"></script>
 *
 * That's all — no other changes needed to any file.
 */

(function () {
  'use strict';

  var AD_SLOT_KEYS = [
    'top','top_banner','footer','pre_footer',
    'inline','inline_1','inline_2','inline_3','between','between_sections',
    'results','results_banner','solution_mid','quiz_sidebar','pdf_viewer',
    'sticky','sidebar_sticky','mobile_bottom'
  ];

  function loadSlots() {
    try {
      var saved = JSON.parse(localStorage.getItem('er_ad_slots') || '{}');
      var out = {};
      AD_SLOT_KEYS.forEach(function(k) {
        out[k] = Object.assign({ enabled: true, adCode: '' }, saved[k] || {});
      });
      return out;
    } catch (e) { return {}; }
  }

  function saveSlots(slots) {
    localStorage.setItem('er_ad_slots', JSON.stringify(slots));
  }

  function toast(msg, type) {
    if (typeof window.showToast === 'function') window.showToast(msg, type || 'success');
    else alert(msg);
  }

  function refresh() {
    if (typeof window.renderAdManager === 'function') window.renderAdManager();
    if (typeof window.renderDashboard  === 'function') window.renderDashboard();
  }

  window.adMgr = {

    saveSlot: function (key) {
      var slots    = loadSlots();
      var codeEl   = document.getElementById('adcode-'   + key);
      var toggleEl = document.getElementById('adtoggle-' + key);
      if (!codeEl) { toast('Slot "' + key + '" not found.', 'error'); return; }
      slots[key] = {
        enabled: toggleEl ? toggleEl.classList.contains('on') : true,
        adCode:  codeEl.value
      };
      saveSlots(slots);
      toast('"' + key + '" saved!');
      refresh();
    },

    saveAll: function () {
      var slots = loadSlots();
      AD_SLOT_KEYS.forEach(function (k) {
        var codeEl   = document.getElementById('adcode-'   + k);
        var toggleEl = document.getElementById('adtoggle-' + k);
        if (!codeEl) return;
        slots[k] = {
          enabled: toggleEl ? toggleEl.classList.contains('on') : true,
          adCode:  codeEl.value
        };
      });
      saveSlots(slots);
      toast('All ' + AD_SLOT_KEYS.length + ' slots saved!');
      refresh();
    },

    clearSlot: function (key) {
      if (!confirm('Clear ad code for "' + key + '"?\nThis placement will stay hidden until new AdSense code is saved.')) return;
      var slots = loadSlots();
      if (slots[key]) { slots[key].adCode = ''; slots[key].enabled = true; }
      saveSlots(slots);
      toast('Slot cleared.', 'warn');
      refresh();
    },

    enableAll: function () {
      var slots = loadSlots();
      AD_SLOT_KEYS.forEach(function (k) { if (slots[k]) slots[k].enabled = true; });
      saveSlots(slots);
      toast('All slots enabled.');
      refresh();
    },

    disableAll: function () {
      if (!confirm('Disable all ad slots?')) return;
      var slots = loadSlots();
      AD_SLOT_KEYS.forEach(function (k) { if (slots[k]) slots[k].enabled = false; });
      saveSlots(slots);
      toast('All slots disabled.', 'warn');
      refresh();
    },

    clearAll: function () {
      if (!confirm('Clear ALL ad code from every slot?')) return;
      var slots = loadSlots();
      AD_SLOT_KEYS.forEach(function (k) { if (slots[k]) slots[k].adCode = ''; });
      saveSlots(slots);
      toast('All ad code cleared.', 'warn');
      refresh();
    },

    exportConfig: function () {
      var cfg  = loadSlots();
      var blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href = url;
      a.download = 'examready-ads-' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
      toast('Ad config exported!');
    },

    importConfig: function (input) {
      var f = input.files[0]; if (!f) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          var data = JSON.parse(e.target.result);
          if (typeof data !== 'object' || Array.isArray(data)) { toast('Invalid format.', 'error'); return; }
          localStorage.setItem('er_ad_slots', JSON.stringify(data));
          toast('Ad config imported!');
          refresh();
        } catch (err) { toast('Could not parse JSON.', 'error'); }
      };
      reader.readAsText(f);
      input.value = '';
    }
  };

  console.log('[adfix_patch.js] window.adMgr ready — all Ad Manager buttons are now functional.');
})();
