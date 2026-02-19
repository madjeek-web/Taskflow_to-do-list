/**
 * @fileoverview Point d'entrée principal — orchestration de l'application Taskflow
 * Architecture: Store réactif → Render on change → DOM binding
 */
import './style.css';
import { store } from './store.js';
import { createTodoItem } from './components.js';
import { toastSuccess, toastError, toastInfo } from './toast.js';

// ─────────────────────────────────────────────
// DOM refs
// ─────────────────────────────────────────────
const $ = id => document.getElementById(id);

const $todoList      = $('todoList');
const $todoInput     = $('todoInput');
const $addBtn        = $('addBtn');
const $searchInput   = $('searchInput');
const $emptyState    = $('emptyState');
const $emptyTitle    = $('emptyTitle');
const $emptySub      = $('emptySub');

const $statTotal     = $('statTotal');
const $statPending   = $('statPending');
const $statDone      = $('statDone');
const $progressBar   = $('progressBar');
const $progressPct   = $('progressPct');
const $progressTrack = $('progressTrack');

const $dateDisplay   = $('dateDisplay');
const $categoriesList = $('categoriesList');
const $categoryDatalist = $('categoryDatalist');

const $clearCompleted = $('clearCompleted');
const $themeToggle   = $('themeToggle');
const $themeLabel    = $('themeLabel');
const $themeIcon     = $('themeIcon');

const $exportBtn     = $('exportBtn');
const $importBtn     = $('importBtn');
const $fileInput     = $('fileInput');

const $shortcutsBtn  = $('shortcutsBtn');
const $shortcutsModal= $('shortcutsModal');
const $closeShortcuts= $('closeShortcuts');

const $sortDirBtn    = $('sortDirBtn');

// ─────────────────────────────────────────────
// Date display
// ─────────────────────────────────────────────
function updateDateDisplay() {
  const now = new Date();
  $dateDisplay.textContent = now.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}
updateDateDisplay();

// ─────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────
let _prevIds = '';

function render() {
  const state = store.getState();
  const todos = store.getFilteredTodos();
  const stats = store.getStats();

  // Stats sidebar
  $statTotal.textContent   = stats.total;
  $statPending.textContent = stats.pending;
  $statDone.textContent    = stats.done;
  $progressBar.style.width = `${stats.pct}%`;
  $progressPct.textContent = `${stats.pct}%`;
  $progressTrack.setAttribute('aria-valuenow', stats.pct);

  // Categories
  renderCategories();

  // Datalist for autocomplete
  const cats = store.getCategories();
  $categoryDatalist.innerHTML = cats.map(([c]) => `<option value="${c}">`).join('');

  // Empty state
  if (todos.length === 0) {
    $emptyState.classList.remove('hidden');
    const hasFilters = state.filter !== 'all' ||
      state.priorityFilter !== 'all' ||
      state.categoryFilter !== 'all' ||
      state.searchQuery;

    if (hasFilters) {
      $emptyTitle.textContent = 'Aucun résultat';
      $emptySub.textContent   = 'Essayez d\'autres filtres ou effacez la recherche';
    } else {
      $emptyTitle.textContent = 'Aucune tâche';
      $emptySub.textContent   = 'Ajoutez votre première tâche ci-dessus';
    }
  } else {
    $emptyState.classList.add('hidden');
  }

  // Efficient DOM update — avoid full re-render if same items
  const newIds = todos.map(t => t.id + (t.completed?'1':'0') + t.text).join('|');
  if (newIds === _prevIds) return;
  _prevIds = newIds;

  // Rebuild list
  const searchQuery = state.searchQuery;
  const frag = document.createDocumentFragment();
  todos.forEach(todo => frag.appendChild(createTodoItem(todo, searchQuery)));

  $todoList.replaceChildren(frag);
}

// ─────────────────────────────────────────────
// Categories sidebar
// ─────────────────────────────────────────────
function renderCategories() {
  const state = store.getState();
  const cats = store.getCategories();

  if (cats.length === 0) {
    $categoriesList.innerHTML = '<span style="font-size:11px;color:var(--text-disabled);padding:4px 10px">Aucune catégorie</span>';
    return;
  }

  $categoriesList.innerHTML = cats.map(([name, count]) => `
    <button class="category-btn ${state.categoryFilter === name ? 'active' : ''}"
            data-category="${name}">
      ${name}
      <span class="category-count">${count}</span>
    </button>
  `).join('');

  $categoriesList.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      store.setCategoryFilter(state.categoryFilter === cat ? 'all' : cat);
    });
  });
}

// ─────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────
const moonSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunSvg  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  $themeLabel.textContent = dark ? 'Mode clair' : 'Mode sombre';
  $themeIcon.innerHTML = dark ? sunSvg : moonSvg;
}

store.on('themeChange', applyTheme);

// Init theme
applyTheme(store.getState().darkMode);

$themeToggle.addEventListener('click', store.toggleDarkMode);

// ─────────────────────────────────────────────
// Add todo
// ─────────────────────────────────────────────
function handleAdd() {
  const text = $todoInput.value.trim();
  if (!text) {
    $todoInput.classList.add('shake');
    $todoInput.addEventListener('animationend', () => $todoInput.classList.remove('shake'), { once: true });
    return;
  }

  store.addTodo({
    text,
    priority: document.getElementById('prioritySelect').value,
    category: document.getElementById('categoryInput').value.trim(),
    dueDate:  document.getElementById('dueDateInput').value,
  });

  $todoInput.value = '';
  document.getElementById('categoryInput').value = '';
  document.getElementById('dueDateInput').value = '';
  $todoInput.focus();
  toastSuccess('Tâche ajoutée !');
}

$addBtn.addEventListener('click', handleAdd);

$todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
});

// ─────────────────────────────────────────────
// Filters
// ─────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    store.setFilter(btn.dataset.filter);
  });
});

document.querySelectorAll('.priority-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.priority-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    store.setPriorityFilter(btn.dataset.priority);
  });
});

// ─────────────────────────────────────────────
// Search
// ─────────────────────────────────────────────
let searchTimer;
$searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => store.setSearch($searchInput.value), 150);
});

$searchInput.addEventListener('search', () => store.setSearch($searchInput.value));

// ─────────────────────────────────────────────
// Sort
// ─────────────────────────────────────────────
document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    store.setSort(btn.dataset.sort);
    updateSortDirBtn();
  });
});

function updateSortDirBtn() {
  const dir = store.getState().sortDir;
  $sortDirBtn.classList.toggle('flipped', dir === 'asc');
}

$sortDirBtn.addEventListener('click', () => {
  store.toggleSortDir();
  updateSortDirBtn();
});

// Sync active sort btn on load
const initSort = store.getState().sortBy;
document.querySelector(`.sort-btn[data-sort="${initSort}"]`)?.classList.add('active');
updateSortDirBtn();

// ─────────────────────────────────────────────
// Clear completed
// ─────────────────────────────────────────────
$clearCompleted.addEventListener('click', () => {
  const n = store.clearCompleted();
  if (n > 0) toastSuccess(`${n} tâche${n > 1 ? 's' : ''} supprimée${n > 1 ? 's' : ''}`);
  else toastInfo('Aucune tâche terminée à supprimer');
});

// ─────────────────────────────────────────────
// Export / Import
// ─────────────────────────────────────────────
$exportBtn.addEventListener('click', () => {
  const json = store.exportTodos();
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url,
    download: `taskflow-${new Date().toISOString().slice(0,10)}.json`,
  });
  a.click();
  URL.revokeObjectURL(url);
  toastInfo('Export téléchargé !');
});

$importBtn.addEventListener('click', () => $fileInput.click());

$fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const count = store.importTodos(evt.target.result);
      toastSuccess(`${count} tâche${count > 1 ? 's' : ''} importée${count > 1 ? 's' : ''} !`);
    } catch {
      toastError('Fichier JSON invalide');
    }
  };
  reader.readAsText(file);
  $fileInput.value = '';
});

// ─────────────────────────────────────────────
// Shortcuts modal
// ─────────────────────────────────────────────
$shortcutsBtn.addEventListener('click', () => $shortcutsModal.classList.remove('hidden'));
$closeShortcuts.addEventListener('click', () => $shortcutsModal.classList.add('hidden'));
$shortcutsModal.addEventListener('click', (e) => {
  if (e.target === $shortcutsModal) $shortcutsModal.classList.add('hidden');
});

// ─────────────────────────────────────────────
// Global keyboard shortcuts
// ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Escape — close modal or clear editing
  if (e.key === 'Escape') {
    if (!$shortcutsModal.classList.contains('hidden')) {
      $shortcutsModal.classList.add('hidden');
    }
    return;
  }

  // Don't interfere when typing in inputs
  const inInput = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  if (inInput) return;

  if (e.key === '?') {
    e.preventDefault();
    $shortcutsModal.classList.toggle('hidden');
    return;
  }

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'd') { e.preventDefault(); store.toggleDarkMode(); }
    if (e.key === 'f') { e.preventDefault(); $searchInput.focus(); }
    if (e.key === 'e') { e.preventDefault(); $exportBtn.click(); }
  }
});

// ─────────────────────────────────────────────
// Shake animation (add validation)
// ─────────────────────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}
.shake{animation:shake 320ms ease both}
`;
document.head.appendChild(shakeStyle);

// ─────────────────────────────────────────────
// Store subscriptions → re-render
// ─────────────────────────────────────────────
store.on('change', render);
store.on('filterChange', render);

// ─────────────────────────────────────────────
// Initial render
// ─────────────────────────────────────────────
render();
