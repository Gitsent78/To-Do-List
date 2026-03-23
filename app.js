let tasks = JSON.parse(localStorage.getItem('taskr') || '[]');
let filter = 'all';

const form     = document.getElementById('task-form');
const input    = document.getElementById('task-input');
const dateInput= document.getElementById('due-date');
const list     = document.getElementById('task-list');
const empty    = document.getElementById('empty');
const countEl  = document.getElementById('count');

function save() { localStorage.setItem('taskr', JSON.stringify(tasks)); }

function render() {
  list.innerHTML = '';
  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' done' : '');

    const isOverdue = t.due && !t.done && new Date(t.due) < new Date();
    li.innerHTML = `
      <button class="check-btn" data-id="${t.id}">${t.done ? '✓' : ''}</button>
      <div class="task-info">
        <span class="task-text">${t.text}</span>
        ${t.due ? `<span class="task-due ${isOverdue ? 'overdue' : ''}">📅 ${t.due}${isOverdue ? ' — overdue' : ''}</span>` : ''}
      </div>
      <button class="del-btn" data-id="${t.id}">✕</button>
    `;
    list.appendChild(li);
  });

  const total = tasks.length;
  countEl.textContent = `${total} task${total !== 1 ? 's' : ''}`;
  empty.classList.toggle('visible', filtered.length === 0);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  tasks.unshift({ id: Date.now(), text: input.value.trim(), due: dateInput.value, done: false });
  input.value = ''; dateInput.value = '';
  save(); render();
});

list.addEventListener('click', e => {
  const id = +e.target.dataset.id;
  if (e.target.classList.contains('check-btn')) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  } else if (e.target.classList.contains('del-btn')) {
    tasks = tasks.filter(t => t.id !== id);
  }
  save(); render();
});

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

render();
