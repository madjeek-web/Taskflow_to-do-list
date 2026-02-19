/**
 * @fileoverview Reactive store — gestion d'état centralisée avec localStorage
 * Pattern: mini event-emitter + proxy-based reactivity
 */

const STORAGE_KEY = 'taskflow-v2';

/** @type {Map<string, Set<Function>>} */
const _listeners = new Map();

/** État interne */
const _state = {
  todos: [],
  filter: 'all',       // 'all' | 'active' | 'completed'
  priorityFilter: 'all', // 'all' | 'high' | 'medium' | 'low'
  categoryFilter: 'all',
  searchQuery: '',
  sortBy: 'createdAt',  // 'createdAt' | 'priority' | 'alpha' | 'dueDate'
  sortDir: 'desc',      // 'asc' | 'desc'
  darkMode: true,
};

// ─────────────────────────────────────────────
// Persistence
// ─────────────────────────────────────────────

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.todos) _state.todos = saved.todos;
    if (saved.sortBy) _state.sortBy = saved.sortBy;
    if (saved.sortDir) _state.sortDir = saved.sortDir;
    if (typeof saved.darkMode === 'boolean') _state.darkMode = saved.darkMode;
  } catch (e) {
    console.warn('[store] Load failed:', e);
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      todos:   _state.todos,
      sortBy:  _state.sortBy,
      sortDir: _state.sortDir,
      darkMode: _state.darkMode,
    }));
  } catch (e) {
    console.warn('[store] Save failed:', e);
  }
}

// ─────────────────────────────────────────────
// Event emitter
// ─────────────────────────────────────────────

function on(event, cb) {
  if (!_listeners.has(event)) _listeners.set(event, new Set());
  _listeners.get(event).add(cb);
  return () => _listeners.get(event)?.delete(cb); // unsubscribe
}

function emit(event, data) {
  _listeners.get(event)?.forEach(cb => cb(data));
  _listeners.get('*')?.forEach(cb => cb({ event, data }));
}

// ─────────────────────────────────────────────
// Selectors
// ─────────────────────────────────────────────

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function getFilteredTodos() {
  let todos = [..._state.todos];

  // Status filter
  if (_state.filter === 'active') todos = todos.filter(t => !t.completed);
  if (_state.filter === 'completed') todos = todos.filter(t => t.completed);

  // Priority filter
  if (_state.priorityFilter !== 'all') {
    todos = todos.filter(t => t.priority === _state.priorityFilter);
  }

  // Category filter
  if (_state.categoryFilter !== 'all') {
    todos = todos.filter(t => t.category === _state.categoryFilter);
  }

  // Search
  if (_state.searchQuery.trim()) {
    const q = _state.searchQuery.toLowerCase().trim();
    todos = todos.filter(t =>
      t.text.toLowerCase().includes(q) ||
      (t.category || '').toLowerCase().includes(q)
    );
  }

  // Sort
  todos.sort((a, b) => {
    let diff = 0;
    switch (_state.sortBy) {
      case 'priority':
        diff = (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
        break;
      case 'alpha':
        diff = a.text.localeCompare(b.text, 'fr');
        break;
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) diff = 0;
        else if (!a.dueDate) diff = 1;
        else if (!b.dueDate) diff = -1;
        else diff = a.dueDate.localeCompare(b.dueDate);
        break;
      default: // createdAt
        diff = a.createdAt - b.createdAt;
    }
    return _state.sortDir === 'asc' ? diff : -diff;
  });

  return todos;
}

function getStats() {
  const all = _state.todos;
  const done = all.filter(t => t.completed).length;
  return {
    total:   all.length,
    done,
    pending: all.length - done,
    pct:     all.length ? Math.round((done / all.length) * 100) : 0,
  };
}

function getCategories() {
  const map = new Map();
  for (const t of _state.todos) {
    if (!t.category) continue;
    map.set(t.category, (map.get(t.category) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

// ─────────────────────────────────────────────
// Actions
// ─────────────────────────────────────────────

function addTodo({ text, priority = 'medium', category = '', dueDate = '' }) {
  const todo = {
    id:        crypto.randomUUID(),
    text:      text.trim(),
    completed: false,
    priority,
    category:  category.trim(),
    dueDate:   dueDate || '',
    createdAt: Date.now(),
  };
  _state.todos.unshift(todo);
  saveToStorage();
  emit('change', { action: 'add', todo });
  return todo;
}

function deleteTodo(id) {
  const idx = _state.todos.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [todo] = _state.todos.splice(idx, 1);
  saveToStorage();
  emit('change', { action: 'delete', todo });
}

function toggleTodo(id) {
  const todo = _state.todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveToStorage();
  emit('change', { action: 'toggle', todo });
}

function updateTodo(id, patch) {
  const todo = _state.todos.find(t => t.id === id);
  if (!todo) return;
  Object.assign(todo, patch);
  saveToStorage();
  emit('change', { action: 'update', todo });
}

function clearCompleted() {
  const before = _state.todos.length;
  _state.todos = _state.todos.filter(t => !t.completed);
  const removed = before - _state.todos.length;
  if (removed > 0) {
    saveToStorage();
    emit('change', { action: 'clearCompleted', removed });
  }
  return removed;
}

function reorderTodos(fromId, toId) {
  const todos = _state.todos;
  const fromIdx = todos.findIndex(t => t.id === fromId);
  const toIdx   = todos.findIndex(t => t.id === toId);
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;
  const [item] = todos.splice(fromIdx, 1);
  todos.splice(toIdx, 0, item);
  saveToStorage();
  emit('change', { action: 'reorder' });
}

function importTodos(data) {
  const parsed = Array.isArray(data) ? data : JSON.parse(data);
  _state.todos = parsed.map(t => ({
    id:        t.id || crypto.randomUUID(),
    text:      t.text || '(sans titre)',
    completed: Boolean(t.completed),
    priority:  ['high','medium','low'].includes(t.priority) ? t.priority : 'medium',
    category:  t.category || '',
    dueDate:   t.dueDate || '',
    createdAt: t.createdAt || Date.now(),
  }));
  saveToStorage();
  emit('change', { action: 'import', count: _state.todos.length });
  return _state.todos.length;
}

function exportTodos() {
  return JSON.stringify(_state.todos, null, 2);
}

function setFilter(filter) {
  _state.filter = filter;
  emit('filterChange');
}

function setPriorityFilter(p) {
  _state.priorityFilter = p;
  emit('filterChange');
}

function setCategoryFilter(c) {
  _state.categoryFilter = c;
  emit('filterChange');
}

function setSearch(q) {
  _state.searchQuery = q;
  emit('filterChange');
}

function setSort(sortBy) {
  if (_state.sortBy === sortBy) {
    _state.sortDir = _state.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    _state.sortBy = sortBy;
    _state.sortDir = 'desc';
  }
  saveToStorage();
  emit('filterChange');
}

function toggleSortDir() {
  _state.sortDir = _state.sortDir === 'asc' ? 'desc' : 'asc';
  saveToStorage();
  emit('filterChange');
}

function toggleDarkMode() {
  _state.darkMode = !_state.darkMode;
  saveToStorage();
  emit('themeChange', _state.darkMode);
}

function setDarkMode(dark) {
  _state.darkMode = dark;
  saveToStorage();
  emit('themeChange', dark);
}

function getState() { return _state; }

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────
loadFromStorage();

export const store = {
  // State
  getState,
  getFilteredTodos,
  getStats,
  getCategories,

  // Actions
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
  clearCompleted,
  reorderTodos,
  importTodos,
  exportTodos,

  // Filters
  setFilter,
  setPriorityFilter,
  setCategoryFilter,
  setSearch,
  setSort,
  toggleSortDir,

  // Theme
  toggleDarkMode,
  setDarkMode,

  // Events
  on,
  emit,
};
