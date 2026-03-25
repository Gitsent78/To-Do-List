// 1. Initialize Supabase
const SUPABASE_URL = 'https://sgwajegseuzxzeblffar.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnd2FqZWdzZXV6eHplYmxmZmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MjAyNTgsImV4cCI6MjA4OTk5NjI1OH0.unMtsCMg7WqNeMQ1mCEplQTJnva1_36It7LW8W4tb_A';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let tasks = [];
let filter = 'all';

const form     = document.getElementById('task-form');
const input    = document.getElementById('task-input');
const dateInput= document.getElementById('due-date');
const list     = document.getElementById('task-list');
const empty    = document.getElementById('empty');
const countEl  = document.getElementById('count');

// 2. Fetch tasks from Supabase on load
async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    tasks = data;
    render();
  }
}

// 3. Render function
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

// 4. Add new task to Supabase
form.addEventListener('submit', async e => {
  e.preventDefault();
  
  const text = input.value.trim();
  const due = dateInput.value || null;

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ text, due, done: false }])
    .select();

  if (error) {
    console.error('Error adding task:', error);
  } else {
    tasks.unshift(data[0]); 
    input.value = ''; dateInput.value = '';
    render();
  }
});

// 5. Update (Check) or Delete tasks
list.addEventListener('click', async e => {
  const checkBtn = e.target.closest('.check-btn');
  const delBtn = e.target.closest('.del-btn');

  if (checkBtn) {
    const id = checkBtn.dataset.id;
    const task = tasks.find(t => String(t.id) === String(id));
    if (!task) return; 

    const newDoneStatus = !task.done;

    // Optimistic UI update
    task.done = newDoneStatus;
    render();

    // Send update to Supabase
    const { error } = await supabase
      .from('tasks')
      .update({ done: newDoneStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating task:', error);
      task.done = !newDoneStatus; 
      render();
    }

  } else if (delBtn) {
    const id = delBtn.dataset.id;
    
    // Optimistic UI update
    tasks = tasks.filter(t => String(t.id) !== String(id));
    render();

    // Send delete to Supabase
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting task:', error);
  }
});

// 6. Filtering logic
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// Initialize app
fetchTasks();