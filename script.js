// --- 1. 3D DNA CANVAS ANIMATION ---
const canvas = document.getElementById('dnaCanvas');
const dCtx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth || document.documentElement.clientWidth;
  height = canvas.height = window.innerHeight || document.documentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas); 
resizeCanvas();

let time = 0;
function drawDNA() {
  dCtx.clearRect(0, 0, width, height); 
  time += 0.02;
  const centerX = width / 2; 
  const centerY = height / 2;
  const strandLength = Math.max(width, height) + 600;

  for(let i = -strandLength/2; i < strandLength/2; i += 40) {
    const angle = i * 0.005 + time; 
    const offset = Math.sin(angle) * 130; 
    const depth = Math.cos(angle);
    const x = centerX + i * 0.7 + offset * 0.4; 
    const y = centerY - i * 0.3;
    const y1 = y + Math.sin(angle) * 110; 
    const y2 = y + Math.sin(angle + Math.PI) * 110;

    dCtx.beginPath(); dCtx.moveTo(x, y1); dCtx.lineTo(x, y2);
    dCtx.strokeStyle = `rgba(56, 189, 248, ${0.4 + depth * 0.3})`; 
    dCtx.lineWidth = 2.5; dCtx.stroke();
    
    dCtx.beginPath(); dCtx.arc(x, y1, 5 + depth * 2, 0, Math.PI*2);
    dCtx.fillStyle = `rgba(6, 182, 212, ${0.8 + depth * 0.2})`; 
    dCtx.fill();
    
    dCtx.beginPath(); dCtx.arc(x, y2, 5 - depth * 2, 0, Math.PI*2);
    dCtx.fillStyle = `rgba(168, 85, 247, ${0.8 - depth * 0.2})`; 
    dCtx.fill();
  }
  requestAnimationFrame(drawDNA);
}
drawDNA(); // Start DNA loop

// --- 2. TRANSITIONS & BOOT SEQUENCE ---
const startBtn = document.getElementById('start-btn');
const disconnectBtn = document.getElementById('disconnect-btn');
const landingPage = document.getElementById('landing-page');
const bootSequence = document.getElementById('boot-sequence');
const dashboardView = document.getElementById('dashboard-view');
const terminalOutput = document.getElementById('terminal-output');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');

let radarChartInstance = null; // Declare globally

const bootLogs = [
  "Initiating secure handshake...",
  "Bypassing local firewalls...",
  "Loading OCEAN cognitive matrices...",
  "Calibrating Neural NLP Engine v2.0...",
  "Establishing deep-vector embeddings...",
  "Verifying structural integrity...",
  "ACCESS GRANTED."
];

startBtn.addEventListener('click', () => {
  landingPage.classList.add('fade-out');
  setTimeout(() => {
    landingPage.classList.add('hidden-state');
    bootSequence.classList.remove('hidden-state');
    setTimeout(() => {
      bootSequence.classList.add('fade-in');
      startBootSequence();
    }, 50);
  }, 800);
});

function startBootSequence() {
  let progress = 0;
  let logIndex = 0;
  terminalOutput.innerHTML = ''; 
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 4; 
    if (progress > 100) progress = 100;
    
    const displayNum = Math.floor(progress).toString().padStart(2, '0');
    progressPercent.textContent = `${displayNum}%`;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      finishBoot();
    }
  }, 60);

  const typeLog = () => {
    if (logIndex < bootLogs.length) {
      const p = document.createElement('p');
      p.innerHTML = `<span class="text-emerald-400">></span> ${bootLogs[logIndex]} <span class="cursor-blink"></span>`;
      const prevCursor = terminalOutput.querySelector('.cursor-blink');
      if (prevCursor) prevCursor.remove();

      terminalOutput.appendChild(p);
      logIndex++;
      const delay = (logIndex === bootLogs.length) ? 0 : Math.random() * 250 + 150;
      if (logIndex < bootLogs.length) setTimeout(typeLog, delay);
    }
  };
  setTimeout(typeLog, 200);
}

function finishBoot() {
  setTimeout(() => {
    bootSequence.classList.remove('fade-in');
    bootSequence.classList.add('fade-out');

    setTimeout(() => {
      bootSequence.classList.add('hidden-state');
      dashboardView.classList.remove('hidden-state');
      
      setTimeout(() => {
        dashboardView.classList.remove('fade-out');
        dashboardView.classList.add('fade-in');
        
        // Re-render/Resize chart so it fits properly once visible
        if(radarChartInstance) radarChartInstance.resize();
      }, 50);
    }, 800);
  }, 800);
}

disconnectBtn.addEventListener('click', () => {
  dashboardView.classList.remove('fade-in');
  dashboardView.classList.add('fade-out');
  setTimeout(() => {
    dashboardView.classList.add('hidden-state');
    landingPage.classList.remove('hidden-state', 'fade-out');
    setTimeout(() => {
      landingPage.classList.add('fade-in');
      progressBar.style.width = '0%';
      progressPercent.textContent = '00%';
    }, 50);
  }, 800);
});

// --- 3. PROTOTYPE LOGIC (SOS, CHART, INFERENCE) ---

// Clock
function updateClock() { 
  const ts = document.getElementById('timestamp');
  if(ts) ts.innerText = new Date().toLocaleTimeString(); 
}
setInterval(updateClock, 1000); 
updateClock();

// Chart Initialization
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('radarChart').getContext('2d');
  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: { 
      labels: ['Openness', 'Conscientious', 'Extraversion', 'Agreeable', 'Stability'], 
      datasets: [{ 
        data: [72, 69, 58, 75, 61], 
        backgroundColor: 'rgba(6, 182, 212, 0.4)', 
        borderColor: '#38bdf8', 
        borderWidth: 2, 
        pointBackgroundColor: '#818cf8', 
        pointHoverBackgroundColor: '#ffffff', 
        pointBorderColor: '#fff' 
      }] 
    },
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { 
        r: { 
          min: 0,
          max: 100,
          angleLines: { color: 'rgba(255, 255, 255, 0.25)' }, 
          grid: { color: 'rgba(255, 255, 255, 0.2)' }, 
          pointLabels: { font: { family: 'JetBrains Mono', size: 10, weight: 'bold' }, color: '#cbd5e1' }, 
          ticks: { 
            display: false,
            stepSize: 20
          } 
        } 
      }, 
      plugins: { legend: { display: false } } 
    }
  });
});

// Audio Siren
let audioCtx = null;
let sirenOscillator = null;
let sirenGain = null;
let sirenInterval = null;

function playSiren() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  sirenOscillator = audioCtx.createOscillator();
  sirenGain = audioCtx.createGain();
  sirenOscillator.connect(sirenGain);
  sirenGain.connect(audioCtx.destination);
  sirenOscillator.type = 'square';
  sirenGain.gain.value = 0.1;
  sirenOscillator.start();

  let isHigh = true;
  sirenInterval = setInterval(() => {
    sirenOscillator.frequency.setValueAtTime(isHigh ? 600 : 800, audioCtx.currentTime);
    isHigh = !isHigh;
  }, 400);
}

function stopSiren() {
  if (sirenOscillator) {
    sirenOscillator.stop(); sirenOscillator.disconnect(); sirenGain.disconnect();
    sirenOscillator = null;
  }
  if (sirenInterval) { clearInterval(sirenInterval); sirenInterval = null; }
}

function resetSOS() {
  stopSiren();
  document.getElementById('sosAlert').classList.add('hidden');
  document.getElementById('sosAlert').classList.remove('flex');
  document.getElementById('consoleLog').innerText = "> Safety Override Accepted. System Ready.";
}

// Execute Neural Scan (CONNECTED TO AI BACKEND)
async function executeScan() {
  const btn = document.getElementById('execBtn');
  const btnLabel = document.getElementById('btnLabel');
  const consoleLog = document.getElementById('consoleLog');
  const textInput = document.getElementById('inputText').value;

  if (!textInput.trim()) {
    consoleLog.innerHTML = "<span class='text-yellow-400 font-bold'>> Error: Please write some text first!</span>";
    return;
  }

  btn.disabled = true; btn.classList.add('opacity-50');

  // --- SOS SAFETY TRIGGER ---
  const lowerInput = textInput.toLowerCase();
  if (lowerInput.includes("die") || lowerInput.includes("kill") || lowerInput.includes("suicide") || lowerInput.includes("harm")) {
    consoleLog.innerHTML = "<span class='text-red-500 font-bold'>> FATAL: SAFETY PROTOCOL VIOLATION DETECTED!</span>";
    btnLabel.innerText = "ENGAGING EMERGENCY OVERRIDE...";

    setTimeout(() => {
      document.getElementById('sosAlert').classList.remove('hidden');
      document.getElementById('sosAlert').classList.add('flex');
      playSiren(); // SOUND START
      btn.disabled = false; btn.classList.remove('opacity-50');
      btnLabel.innerText = "INITIALIZE TRAITFUSION NEURAL INFERENCE";
    }, 800);
    return;
  }

  // --- REAL AI SERVER CONNECTION (FLASK) ---
  btnLabel.innerText = "PROCESSING VECTOR EMBEDDINGS...";
  consoleLog.innerText = "> Sending data to AI Backend (Port 5000)...";

  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: textInput })
    });

    const data = await response.json();

    if (data.error) {
       consoleLog.innerHTML = `<span class='text-red-500'>> AI Error: ${data.error}</span>`;
       btn.disabled = false; btn.classList.remove('opacity-50');
       btnLabel.innerText = "INITIALIZE TRAITFUSION NEURAL INFERENCE";
       return;
    }

    consoleLog.innerText = "> INFERENCE COMPLETE. Radar visualization refreshed from Model.";

    // Score Formatting
    const formatScore = (val) => val <= 5.0 ? Math.round(val * 20) : Math.round(val);
    
    const nO = formatScore(data.Openness);
    const nC = formatScore(data.Conscientiousness);
    const nE = formatScore(data.Extraversion);
    const nA = formatScore(data.Agreeableness);
    const nS = formatScore(data.Neuroticism); 

    // Dynamic Archetype Selection
    let arch = "Balanced Persona";
    const maxScore = Math.max(nO, nC, nE, nA, nS);
    if (maxScore === nO) arch = "Creative Innovator";
    else if (maxScore === nC) arch = "Strategic Architect";
    else if (maxScore === nE) arch = "Charismatic Leader";
    else if (maxScore === nA) arch = "Harmonious Mediator";
    else if (maxScore === nS) arch = "Resilient Guardian";

    // Update Radar Chart (EKDUM PERFECT ORDER MEIN)
    radarChartInstance.data.datasets[0].data = [nO, nC, nE, nA, nS]; 
    radarChartInstance.update();

    // Update UI Progress Bars & Text
    document.getElementById('valO').innerText = nO + '%'; document.getElementById('barO').style.width = nO + '%';
    document.getElementById('valC').innerText = nC + '%'; document.getElementById('barC').style.width = nC + '%';
    document.getElementById('valE').innerText = nE + '%'; document.getElementById('barE').style.width = nE + '%';
    document.getElementById('valA').innerText = nA + '%'; document.getElementById('barA').style.width = nA + '%';
    document.getElementById('valS').innerText = nS + '%'; document.getElementById('barS').style.width = nS + '%';
    document.getElementById('archetypeText').innerText = arch;

  } catch (error) {
    consoleLog.innerHTML = "<span class='text-red-500 font-bold'>> CONNECTION FAILED: Server band hai. Please run 'python3 app.py' in terminal.</span>";
  }

  btn.disabled = false; 
  btn.classList.remove('opacity-50');
  btnLabel.innerText = "INITIALIZE TRAITFUSION NEURAL INFERENCE";
}