const IMAGES_PATH = './files/images/';

// SVG placeholders for the 8 missing files
// Each is a simple illustrative SVG + dashed border + label
const PLACEHOLDERS = {
  'Coated%20tab.jpg':        { label: 'Coated Tablet',         svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80" cy="50" rx="55" ry="30" fill="#c084fc" opacity="0.25" stroke="#c084fc" stroke-width="2"/><ellipse cx="80" cy="50" rx="42" ry="21" fill="#c084fc" opacity="0.15" stroke="#c084fc" stroke-width="1" stroke-dasharray="4 2"/><text x="80" y="54" text-anchor="middle" font-size="11" fill="#c084fc" font-family="sans-serif">coated</text></svg>' },
  'effervescent%20tab.jpg':  { label: 'Effervescent Tablet',   svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="100" height="40" rx="8" fill="#38bdf8" opacity="0.2" stroke="#38bdf8" stroke-width="2"/><circle cx="55" cy="70" r="3" fill="#38bdf8" opacity="0.6"/><circle cx="75" cy="75" r="4" fill="#38bdf8" opacity="0.5"/><circle cx="95" cy="68" r="3" fill="#38bdf8" opacity="0.6"/><circle cx="65" cy="80" r="2" fill="#38bdf8" opacity="0.4"/><circle cx="85" cy="82" r="2.5" fill="#38bdf8" opacity="0.5"/><text x="80" y="52" text-anchor="middle" font-size="10" fill="#38bdf8" font-family="sans-serif">effervescent</text></svg>' },
  'enteric%20coated.jpg':    { label: 'Enteric Coated Tablet', svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80" cy="50" rx="52" ry="28" fill="#f59e0b" opacity="0.18" stroke="#f59e0b" stroke-width="2"/><ellipse cx="80" cy="50" rx="38" ry="19" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/><text x="80" y="46" text-anchor="middle" font-size="9" fill="#f59e0b" font-family="sans-serif">enteric</text><text x="80" y="58" text-anchor="middle" font-size="9" fill="#f59e0b" font-family="sans-serif">coated</text></svg>' },
  'hard%20gelatin%20cap.jpg':{ label: 'Hard Gelatin Capsule',  svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect x="28" y="38" width="52" height="26" rx="13" fill="#818cf8" opacity="0.35" stroke="#818cf8" stroke-width="2"/><rect x="76" y="38" width="52" height="26" rx="13" fill="#a78bfa" opacity="0.25" stroke="#a78bfa" stroke-width="2"/><line x1="78" y1="38" x2="78" y2="64" stroke="#818cf8" stroke-width="1" stroke-dasharray="3 2"/></svg>' },
  'scored%20tab.jpg':        { label: 'Scored Tablet',         svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80" cy="50" rx="52" ry="28" fill="#6ee7b7" opacity="0.18" stroke="#6ee7b7" stroke-width="2"/><line x1="80" y1="24" x2="80" y2="76" stroke="#6ee7b7" stroke-width="2" stroke-linecap="round"/><text x="80" y="54" text-anchor="middle" font-size="10" fill="#6ee7b7" font-family="sans-serif">scored</text></svg>' },
  'slow%20relaese%20tab.jpg':{ label: 'Slow Release Tablet',   svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80" cy="50" rx="52" ry="28" fill="#fb923c" opacity="0.18" stroke="#fb923c" stroke-width="2"/><ellipse cx="80" cy="50" rx="34" ry="16" fill="none" stroke="#fb923c" stroke-width="1" stroke-dasharray="5 3" opacity="0.7"/><text x="80" y="46" text-anchor="middle" font-size="9" fill="#fb923c" font-family="sans-serif">slow</text><text x="80" y="58" text-anchor="middle" font-size="9" fill="#fb923c" font-family="sans-serif">release</text></svg>' },
  'soft%20gelatin%20cap.jpg':{ label: 'Soft Gelatin Capsule',  svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="80" cy="50" rx="50" ry="30" fill="#f472b6" opacity="0.2" stroke="#f472b6" stroke-width="2"/><ellipse cx="80" cy="50" rx="34" ry="20" fill="#f472b6" opacity="0.12"/><text x="80" y="46" text-anchor="middle" font-size="9" fill="#f472b6" font-family="sans-serif">soft gelatin</text><text x="80" y="58" text-anchor="middle" font-size="9" fill="#f472b6" font-family="sans-serif">capsule</text></svg>' },
  'suppository.jpg':         { label: 'Suppository',           svg: '<svg width="160" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><path d="M65 75 Q80 20 95 75 Q80 85 65 75Z" fill="#34d399" opacity="0.25" stroke="#34d399" stroke-width="2"/><text x="80" y="82" text-anchor="middle" font-size="10" fill="#34d399" font-family="sans-serif">suppository</text></svg>' },
};

// Also handle URL-encoded variants with ?time= query strings
const PLACEHOLDER_KEYS_NORMALIZED = {};
Object.keys(PLACEHOLDERS).forEach(k => {
  PLACEHOLDER_KEYS_NORMALIZED[decodeURIComponent(k).replace(/\?.*$/, '').toLowerCase()] = k;
});

function resolveSrc(filename) {
  const decoded = decodeURIComponent(filename).replace(/\?.*$/, '');
  const lc = decoded.toLowerCase();
  // Check placeholders
  if (PLACEHOLDER_KEYS_NORMALIZED[lc]) {
    return { type: 'placeholder', key: PLACEHOLDER_KEYS_NORMALIZED[lc], name: decoded };
  }
  return { type: 'real', src: IMAGES_PATH + decoded };
}

function renderQuestionHTML(rawHtml) {
  // Replace @@PLUGINFILE@@/filename with either real img src or placeholder
  return rawHtml.replace(/@@PLUGINFILE@@\/([^"'<>\s]+)/g, (match, filename) => {
    const resolved = resolveSrc(filename);
    if (resolved.type === 'placeholder') {
      const ph = PLACEHOLDERS[resolved.key];
      return `" data-placeholder="${resolved.key}" style="display:none"/><span class="q-placeholder-img">${ph.svg}<div class="placeholder-label">⚠ PLACEHOLDER · ${ph.label}</div></span><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;
    }
    return resolved.src;
  });
}

// ---- STATE ----
let activeCat = null;
let activeType = 'all';
let searchQuery = '';

const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');

function typeBadge(t) {
  const labels = { multichoice: 'MCQ', essay: 'Essay', shortanswer: 'Short Ans', match: 'Matching' };
  return `<span class="type-badge badge-${t}">${labels[t] || t}</span>`;
}

function renderSidebar() {
  let html = `<div class="cat-item ${activeCat === null ? 'active' : ''}" data-cat="all">
    <span class="cat-name">📚 All Questions</span>
    <span class="cat-badge">${QDATA.reduce((s,c)=>s+c.questions.length,0)}</span>
  </div>
  <div class="sidebar-section">Categories</div>`;

  QDATA.forEach(cat => {
    if (!cat.questions.length) return;
    const isActive = activeCat === cat.id;
    html += `<div class="cat-item ${isActive ? 'active' : ''}" data-cat="${cat.id}">
      <span class="cat-name">📘 ${cat.name}</span>
      <span class="cat-badge">${cat.questions.length}</span>
    </div>`;
  });

  sidebar.innerHTML = html;
  sidebar.querySelectorAll('.cat-item').forEach(el => {
    el.addEventListener('click', () => {
      activeCat = el.dataset.cat === 'all' ? null : el.dataset.cat;
      renderSidebar();
      renderMain();
    });
  });
}

function getFilteredQuestions() {
  let cats = activeCat ? QDATA.filter(c => c.id === activeCat) : QDATA;
  let qs = [];
  cats.forEach(cat => cat.questions.forEach(q => qs.push({ ...q, catName: cat.name, catId: cat.id })));
  if (activeType !== 'all') qs = qs.filter(q => q.type === activeType);
  if (searchQuery) {
    const sq = searchQuery.toLowerCase();
    qs = qs.filter(q =>
      (q.text || '').toLowerCase().includes(sq) ||
      (q.name || '').toLowerCase().includes(sq) ||
      (q.answers || []).some(a => (a.text || '').toLowerCase().includes(sq))
    );
  }
  return qs;
}

function renderQuestionCard(q, idx) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let answersHtml = '';

  if (q.type === 'multichoice' && q.answers.length) {
    answersHtml = q.answers.map((a, i) => `
      <div class="answer-row ${a.correct ? 'correct' : ''}">
        <span class="answer-letter">${letters[i]}</span>
        <span class="answer-text">${a.text || '<em style="color:var(--muted)">—</em>'}</span>
        ${a.correct ? '<span class="correct-icon">✓</span>' : ''}
      </div>`).join('');

  } else if (q.type === 'shortanswer' && q.answers.length) {
    const correct = q.answers.filter(a => a.correct);
    const wrong   = q.answers.filter(a => !a.correct);
    answersHtml = `<div class="sa-block">
      <div class="sa-label">Correct answer${correct.length > 1 ? 's' : ''}</div>
      ${correct.map(a => `<div class="sa-answer correct"><span class="correct-icon">✓</span> ${a.text}</div>`).join('')}
      ${wrong.length ? `<div class="sa-label" style="margin-top:0.5rem">Also accepted</div>${wrong.map(a=>`<div class="sa-answer partial">◎ ${a.text}</div>`).join('')}` : ''}
    </div>`;

  } else if (q.type === 'match' && q.pairs && q.pairs.length) {
    answersHtml = `<div class="match-table">
      <div class="match-header"><span>Premise</span><span>Match</span></div>
      ${q.pairs.map(p => `
        <div class="match-row">
          <span class="match-q">${p.q}</span>
          <span class="match-arrow">→</span>
          <span class="match-a">${p.a}</span>
        </div>`).join('')}
    </div>`;

  } else if (q.type === 'essay') {
    answersHtml = `<div class="answer-row"><span class="answer-text" style="color:var(--muted);font-style:italic">Open-ended essay — no predefined answers</span></div>`;
  }

  const hasAnswers = !!answersHtml;
  const rawHtml = renderQuestionHTML(q.html || q.text || '');
  const processedHtml = DOMPurify.sanitize(rawHtml);

  return `<div class="q-card">
    <div class="q-card-head" onclick="toggleAnswers(this)">
      <span class="q-num">#${idx + 1}</span>
      <div class="q-body">
        <div class="q-text">${processedHtml}</div>
        <div class="q-meta">
          ${typeBadge(q.type)}
          <span class="mark-pill">⬡ ${q.mark} mark${q.mark !== 1 ? 's' : ''}</span>
          ${activeCat === null ? `<span class="mark-pill" style="opacity:0.5">${q.catName}</span>` : ''}
        </div>
      </div>
      ${hasAnswers ? `<button class="toggle-btn">▾</button>` : ''}
    </div>
    ${hasAnswers ? `<div class="q-answers">${answersHtml}</div>` : ''}
  </div>`;
}

function toggleAnswers(head) {
  const answers = head.closest('.q-card').querySelector('.q-answers');
  if (!answers) return;
  const btn = head.querySelector('.toggle-btn');
  answers.classList.toggle('open');
  if (btn) btn.textContent = answers.classList.contains('open') ? '▴' : '▾';
}

function renderMain() {
  const qs = getFilteredQuestions();
  document.getElementById('statQs').textContent = qs.length;
  document.getElementById('statCats').textContent = QDATA.filter(c=>c.questions.length).length;

  if (!qs.length) {
    mainContent.innerHTML = `<div class="no-results"><div class="icon">🔍</div><p>No questions match your filters.</p></div>`;
    return;
  }

  const catName = activeCat ? QDATA.find(c=>c.id===activeCat)?.name : 'All Questions';
  const typeCount = {};
  qs.forEach(q => typeCount[q.type] = (typeCount[q.type]||0)+1);
  const metaStr = Object.entries(typeCount).map(([t,n])=>`${n} ${t}`).join(' · ');

  let html = `<div class="section-header">
    <div class="section-title">${catName}</div>
    <div class="section-meta"><span>${qs.length} questions</span><span>${metaStr}</span></div>
  </div><div class="q-grid">` + qs.map((q,i) => renderQuestionCard(q, i)).join('') + '</div>';

  mainContent.innerHTML = html;
}

function selectCat(id) { activeCat = id; renderSidebar(); renderMain(); }
window.selectCat = selectCat;
window.toggleAnswers = toggleAnswers;

// ── DESKTOP TYPE FILTERS ──
document.querySelectorAll('.chip[data-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    activeType = btn.dataset.type;
    document.querySelectorAll('.chip[data-type]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-type="${activeType}"], [data-type-m="${activeType}"]`).forEach(b => b.classList.add('active'));
    renderMain();
  });
});

// ── MOBILE TYPE FILTERS (bottom nav) ──
document.querySelectorAll('.chip[data-type-m]').forEach(btn => {
  btn.addEventListener('click', () => {
    activeType = btn.dataset.typeM;
    document.querySelectorAll('[data-type-m]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-type="${activeType}"]`).forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`[data-type="${activeType}"], [data-type-m="${activeType}"]`).forEach(b => b.classList.add('active'));
    renderMain();
  });
});

// ── SEARCH ──
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery = searchInput.value.trim();
    
    // FIX: Force a global search across all categories when typing
    if (searchQuery !== '') {
      activeCat = null; 
    }
    
    renderSidebar();
    renderMain();
  }, 200);
});

// ── DRAWER (mobile sidebar) ──
const menuBtn       = document.getElementById('menuBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const sidebarDrawer = document.getElementById('sidebarDrawer');
const drawerClose   = document.getElementById('drawerClose');
const drawerContent = document.getElementById('drawerContent');

function openDrawer() {
  drawerOverlay.style.display = 'block';
  requestAnimationFrame(() => {
    drawerOverlay.classList.add('open');
    sidebarDrawer.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawerOverlay.classList.remove('open');
  sidebarDrawer.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { drawerOverlay.style.display = 'none'; }, 280);
}

menuBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Swipe-to-close on drawer
let touchStartX = 0;
sidebarDrawer.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
sidebarDrawer.addEventListener('touchend', e => {
  if (touchStartX - e.changedTouches[0].clientX > 60) closeDrawer();
}, { passive: true });

function syncDrawer() {
  drawerContent.innerHTML = sidebar.innerHTML;

  drawerContent.querySelectorAll('.cat-item').forEach(el => {
    el.addEventListener('click', () => {
      activeCat = el.dataset.cat === 'all' ? null : el.dataset.cat;
      closeDrawer();
      renderSidebar();
      renderMain();
    });
  });
}

const originalRenderSidebar = renderSidebar;

renderSidebar = function () {
  originalRenderSidebar();
  syncDrawer();
};

window.addEventListener('DOMContentLoaded', () => {
  activeCat = null;
  activeType = 'all';

  renderSidebar();
  renderMain();
});

// ── ANKI CSV EXPORT ──
document.getElementById('exportAnkiBtn').addEventListener('click', () => {
  const qs = getFilteredQuestions();
  
  if (!qs.length) {
    alert('No questions found to export!');
    return;
  }

  let csvContent = "Front,Back\n";
  
  qs.forEach(q => {
    let frontText = (q.text || '').replace(/"/g, '""'); 
    let backText = '';

    if (q.type === 'multichoice') {
      const correctAns = (q.answers || []).filter(a => a.correct).map(a => a.text).join(' | ');
      backText = correctAns.replace(/"/g, '""');
    } else if (q.type === 'shortanswer') {
      backText = (q.answers || []).filter(a => a.correct).map(a => a.text).join(' | ').replace(/"/g, '""');
    } else if (q.type === 'match' && q.pairs) {
      backText = q.pairs.map(p => `${p.q} → ${p.a}`).join(' | ').replace(/"/g, '""');
    } else if (q.type === 'essay') {
      backText = "Open-ended essay format.";
    }

    csvContent += `"${frontText}","${backText}"\n`;
  });

  // Use a Blob to safely download massive amounts of text
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `IPH_QBank_${activeCat ? 'Filtered' : 'All'}.csv`);
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up memory
});