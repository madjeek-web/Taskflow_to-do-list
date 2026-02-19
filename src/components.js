/**
 * @fileoverview Composants UI — TodoItem, Sidebar sections
 */
import { store } from './store.js';
import { toastSuccess, toastError } from './toast.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Format date ISO to French display */
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function getDueClass(iso) {
  if (!iso) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const due   = new Date(iso + 'T00:00:00');
  const diff  = Math.round((due - today) / 86400000);
  if (diff < 0)  return 'overdue';
  if (diff <= 2) return 'soon';
  return 'upcoming';
}

/** Highlight search query in text */
function highlightText(text, query) {
  if (!query) return escHtml(text);
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escHtml(text).replace(
    new RegExp(`(${esc})`, 'gi'),
    '<mark class="highlight">$1</mark>'
  );
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─────────────────────────────────────────────
// TaskItem component
// ─────────────────────────────────────────────

/**
 * Crée un élément li pour une tâche
 * @param {Object} todo
 * @param {string} searchQuery
 * @returns {HTMLElement}
 */
export function createTodoItem(todo, searchQuery = '') {
  const li = document.createElement('li');
  li.className = `task-item${todo.completed ? ' done' : ''}`;
  li.dataset.id = todo.id;
  li.dataset.priority = todo.priority;
  li.draggable = true;

  // ── Priority tag HTML
  const priorityLabels = { high: 'Haute', medium: 'Moyenne', low: 'Basse' };

  // ── Due date tag
  const dueClass = getDueClass(todo.dueDate);
  const dueLabel = todo.dueDate ? formatDate(todo.dueDate) : '';
  const dueSvg = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''}
      aria-label="Marquer comme ${todo.completed ? 'non ' : ''}terminé"
      id="chk-${todo.id}"/>

    <div class="task-body">
      <div class="task-text-wrap">
        <label for="chk-${todo.id}" class="task-text" title="Double-clic pour modifier">
          ${highlightText(todo.text, searchQuery)}
        </label>
      </div>
      <div class="task-tags">
        <span class="tag-priority ${todo.priority}">${priorityLabels[todo.priority]}</span>
        ${todo.category ? `<span class="tag-category">${escHtml(todo.category)}</span>` : ''}
        ${dueLabel ? `<span class="tag-due ${dueClass}">${dueSvg} ${dueLabel}</span>` : ''}
      </div>
    </div>

    <div class="task-actions" role="group" aria-label="Actions">
      <button class="task-action-btn edit-btn" title="Modifier (double-clic)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="task-action-btn danger delete-btn" title="Supprimer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </button>
    </div>
  `;

  // ── Checkbox toggle
  const checkbox = li.querySelector('.task-checkbox');
  checkbox.addEventListener('change', () => {
    store.toggleTodo(todo.id);
  });

  // ── Delete
  li.querySelector('.delete-btn').addEventListener('click', () => {
    // Animate out
    li.style.transition = 'all 200ms ease';
    li.style.opacity = '0';
    li.style.transform = 'translateX(20px)';
    setTimeout(() => store.deleteTodo(todo.id), 180);
    toastSuccess(`"${todo.text.slice(0,30)}" supprimé`);
  });

  // ── Inline edit (double-click on text)
  const textEl = li.querySelector('.task-text');
  const editBtn = li.querySelector('.edit-btn');

  function startEdit() {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = todo.text;
    textEl.replaceWith(input);
    input.focus();
    input.select();

    const commit = () => {
      const newText = input.value.trim();
      if (newText && newText !== todo.text) {
        store.updateTodo(todo.id, { text: newText });
        toastSuccess('Tâche modifiée');
      } else {
        input.replaceWith(textEl);
      }
    };

    input.addEventListener('blur', commit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); commit(); }
      if (e.key === 'Escape') { input.replaceWith(textEl); }
    });
  }

  textEl.addEventListener('dblclick', startEdit);
  editBtn.addEventListener('click', startEdit);

  // ── Drag & Drop
  li.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', todo.id);
    setTimeout(() => li.classList.add('dragging'), 0);
  });

  li.addEventListener('dragend', () => li.classList.remove('dragging'));

  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    li.classList.add('drag-over');
  });

  li.addEventListener('dragleave', () => li.classList.remove('drag-over'));

  li.addEventListener('drop', (e) => {
    e.preventDefault();
    li.classList.remove('drag-over');
    const fromId = e.dataTransfer.getData('text/plain');
    if (fromId && fromId !== todo.id) {
      store.reorderTodos(fromId, todo.id);
    }
  });

  return li;
}
