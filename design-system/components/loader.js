// Dev loader: exposes the component library as window.DS917.
// Uses the compiled _ds_bundle.js namespace when present; otherwise transpiles the .jsx sources in place.
(function () {
  const base = document.currentScript.src.replace(/loader\.js.*$/, '');
  const files = ['core/FacetMark', 'core/Button', 'core/MetricCard', 'core/VerdictChip', 'core/Badge',
    'forms/TextField', 'forms/Select', 'forms/Checkbox', 'forms/Switch',
    'navigation/SiteHeader', 'navigation/Tabs', 'navigation/Pagination', 'navigation/Sidebar', 'feedback/Toast', 'feedback/Dialog'];
  window.DS917Ready = (async () => {
    let found = null;
    for (const k of Object.keys(window)) {
      try { const v = window[k]; if (v && typeof v === 'object' && v !== window && v.Button && v.FacetMark) { found = v; break; } } catch (e) {}
    }
    if (found) return (window.DS917 = found);
    const srcs = await Promise.all(files.map(f => fetch(base + f + '.jsx').then(r => r.text())));
    const body = srcs.map(s => s.replace(/^import .*$/gm, '').replace(/^export /gm, '')).join('\n');
    const names = [...body.matchAll(/^function ([A-Z]\w*)/gm)].map(m => m[1]);
    const code = Babel.transform('(function(React){' + body + '\nreturn {' + names.join(',') + '};})', { presets: ['react'] }).code;
    return (window.DS917 = (0, eval)(code)(React));
  })();
})();
