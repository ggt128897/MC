let history = JSON.parse(localStorage.getItem("menstrualHistory")) || [];

document.getElementById("startDate").addEventListener("change", createDailyInputs);
document.getElementById("endDate").addEventListener("change", createDailyInputs);

function createDailyInputs() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const container = document.getElementById("dailyInputs");
  container.innerHTML = "";

  if (!start || !end) return;

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (endDate < startDate) return;

  const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    container.innerHTML += `
      <fieldset>
        <legend>${dateStr}</legend>
        分泌量：
        <select id="flow-${dateStr}">
          <option value="light">少量</option>
          <option value="moderate">中等</option>
          <option value="heavy">大量</option>
        </select>
        症狀：
        <input type="text" id="symptom-${dateStr}" placeholder="如腹痛、頭痛等"/>
        情緒：
        <input type="text" id="mood-${dateStr}" placeholder="如煩躁、悲傷等"/>
        體溫：
        <input type="number" step="0.1" id="temp-${dateStr}" placeholder="°C"/>
      </fieldset>
    `;
  }
}

function saveData() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const mode = document.getElementById("mode").value;
  if (!start || !end || mode === "none") {
    alert("請輸入完整資訊");
    return;
  }

  const daily = {};
  const startDate = new Date(start);
  const endDate = new Date(end);
  const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    daily[dateStr] = {
      flow: document.getElementById(`flow-${dateStr}`).value,
      symptom: document.getElementById(`symptom-${dateStr}`).value,
      mood: document.getElementById(`mood-${dateStr}`).value,
      temp: document.getElementById(`temp-${dateStr}`).value
    };
  }

  const record = { start, end, daily​⬤