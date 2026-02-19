/**
 * @fileoverview Système de notifications toast
 */

const container = () => document.getElementById('toastContainer');
const DURATION = 3000;

/**
 * Affiche un toast
 * @param {string} message
 * @param {'success'|'danger'|'info'} [type='info']
 * @param {string} [icon]
 */
export function toast(message, type = 'info', icon) {
  const icons = { success: '✓', danger: '✕', info: 'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `
    <span class="toast-icon">${icon ?? icons[type]}</span>
    <span>${message}</span>
  `;
  container().appendChild(el);

  const remove = () => {
    el.classList.add('hiding');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  };

  const timer = setTimeout(remove, DURATION);
  el.addEventListener('click', () => { clearTimeout(timer); remove(); });
}

export const toastSuccess = (msg) => toast(msg, 'success');
export const toastError   = (msg) => toast(msg, 'danger');
export const toastInfo    = (msg) => toast(msg, 'info');
