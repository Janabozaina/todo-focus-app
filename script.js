let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const tagInput = document.getElementById('tagInput').value.trim();
  if (!taskInput) return;
  const timestamp = new Date().toLocaleString();
  tasks.push({ text: taskInput, tag: tagInput, time: timestamp, done: false });
  document.getElementById('taskInput').value = '';
  document.getElementById('tagInput').value = '';
  renderTasks();
}

function renderTasks() {
  const tbody = document.querySelector('#taskTable tbody');
  const counter = document.getElementById('taskCounter');
  tbody.innerHTML = '';
  tasks.forEach((task, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td> 
   <td class="${task.done ? 'completed' : ''}">${task.text}</td>

      <td>${task.tag}</td>
      <td>${task.time}</td>
      <td>
        
        ${!task.done ? '<button onclick="markDone(' + i + ')">Done</button>' : ''}

        <button onclick="editTask(${i})">Edit</button>
        <button onclick="deleteTask(${i})">Delete</button>
      </td>`;
      
    tbody.appendChild(row);
  });
  counter.innerText = "Total: " + tasks.length;
}

function editTask(i) {
  let newText = prompt("Edit task:", tasks[i].text);
  if (newText) {
    tasks[i].text = newText.trim();
    renderTasks();
  }
}

function markDone(i) {
  tasks[i].done = true;
  renderTasks();
}


function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

function filterTasks() {
  const filter = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#taskTable tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
  });
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('modeToggle');

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    toggleBtn.innerHTML = "🌞"; // Light mode
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    toggleBtn.innerHTML = "🌙"; // Dark mode
  }
}


let timer;
let seconds = 1500; // 25 minutes
let isRunning = false;

// تشغيل صوت البداية
function playStartSound() {
  const startSound = document.getElementById("startSound");
  if (startSound) startSound.play();
}

// تشغيل صوت النهاية
function playAlarm() {
  const alarmSound = document.getElementById("alarmSound");
  if (alarmSound) alarmSound.play();
}

// تحديث عرض الوقت
function updateDisplay() {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `${min}:${sec}`;
}

// بدء المؤقت
function startPomodoro() {
  playStartSound(); // ✅ جرس البداية
  timer = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timer);
      playAlarm(); // ✅ جرس النهاية
      isRunning = false;
      document.getElementById('pomodoroBtn').textContent = "Start";
      alert("⏰ Time's up!");
      return;
    }
    seconds--;
    updateDisplay();
  }, 1000);
}

// إيقاف المؤقت
function stopPomodoro() {
  clearInterval(timer);
}

// تبديل بين Start و Stop
function togglePomodoro() {
  if (isRunning) {
    stopPomodoro();
    isRunning = false;
    document.getElementById('pomodoroBtn').textContent = "Start";
  } else {
    startPomodoro();
    isRunning = true;
    document.getElementById('pomodoroBtn').textContent = "Stop";
  }
}

// إعادة ضبط المؤقت
function resetPomodoro() {
  stopPomodoro();
  seconds = 1500;
  updateDisplay();
  document.getElementById('pomodoroBtn').textContent = "Start";
  isRunning = false;
}
window.onload = function () {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${theme}-mode`);
  const toggleBtn = document.getElementById('modeToggle');
  toggleBtn.innerHTML = theme === "dark" ? "🌙" : "🌞";
};
