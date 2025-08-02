let lastPrediction = "";
let lastText = "";

function submitJob() {
  const jobDesc = document.getElementById("jobInput").value;
  if (!jobDesc.trim()) {
    alert("Please enter a job description.");
    return;
  }

  
  const checkBtn = document.getElementById("checkBtn");
  const resultDiv = document.getElementById("result");
  const reasoningDiv = document.getElementById("reasoning");
  const explainBtn = document.getElementById("explainBtn");

  checkBtn.classList.add("loading");
  checkBtn.innerHTML = `
    <div class="spinner"></div>
    <span>Analyzing...</span>
  `;

  
  resultDiv.style.display = "none";
  reasoningDiv.style.display = "none";
  explainBtn.style.display = "none";

  
  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ description: jobDesc })
  })
  .then(res => res.json())
  .then(data => {
    lastPrediction = data.prediction;
    lastText = jobDesc;
    showResult(data.prediction);
  })
  .catch(error => {
    console.log("Some error has occurred. Please try again later");

  })
  .finally(() => {
    
    checkBtn.classList.remove("loading");
    checkBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>Check Job</span>
    `;
  });
}

function showResult(prediction) {
  const resultDiv = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const explainBtn = document.getElementById("explainBtn");

  resultText.textContent = `Prediction: ${prediction}`;
  resultDiv.style.display = "block";
  explainBtn.style.display = "flex";

  
  setTimeout(() => {
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function getReasoning() {
  const explainBtn = document.getElementById("explainBtn");
  const reasoningDiv = document.getElementById("reasoning");
  const reasoningText = document.getElementById("reasoningText");

 
  explainBtn.classList.add("loading");
  explainBtn.innerHTML = `
    <div class="spinner"></div>
    <span>Generating Explanation...</span>
  `;

  reasoningText.textContent = "Generating explanation...";
  reasoningDiv.style.display = "block";

  
  fetch("/reason", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description: lastText,
      prediction: lastPrediction
    })
  })
  .then(res => res.json())
  .then(data => {
    reasoningText.textContent = `Reason: ${data.reasoning}`;
  })
  .catch(error => {
    console.log("Some error has occurred. Please try again");
  })
  .finally(() => {
    
    explainBtn.classList.remove("loading");
    explainBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      <span>Explain Why</span>
    `;

    
    setTimeout(() => {
      reasoningDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });
}

function resetForm() {
  document.getElementById("jobInput").value = "";
  document.getElementById("result").style.display = "none";
  document.getElementById("reasoning").style.display = "none";
  document.getElementById("explainBtn").style.display = "none";
  lastPrediction = "";
  lastText = "";
  document.getElementById("jobInput").focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.getElementById("jobInput").addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key === "Enter") {
    submitJob();
  }
});


document.getElementById("jobInput").addEventListener("focus", function() {
  this.parentElement.style.transform = "scale(1.02)";
});

document.getElementById("jobInput").addEventListener("blur", function() {
  this.parentElement.style.transform = "scale(1)";
});