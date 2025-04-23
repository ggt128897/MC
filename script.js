let history = JSON.parse(localStorage.getItem("menstrualHistory")) || [];

function saveData() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const flow = document.getElementById("flow").value;

  if (!start || !end) {
    alert("請輸入完整日期");
    return;
  }

  const record = { start, end, flow };
  history.push(record);
  localStorage.setItem("menstrualHistory", JSON.stringify(history));

  displayHistory();
  predictNext();
}

function displayHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.start} 到 ${item.end}，分泌量：${translateFlow(item.flow)}`;
    list.appendChild(li);
  });
}

function predictNext() {
  if (history.length < 2) {
    document.getElementById("prediction").innerText = "需要更多紀錄以進行預測";
    return;
  }

  const cycles = [];
  for (let i = 1; i < history.length; i++) {
    const prev = new Date(history[i - 1].start);
    const curr = new Date(history[i].start);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    cycles.push(diff);
  }

  const avgCycle = Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
  const lastDate = new Date(history[history.length - 1].start);
  const predicted = new Date(lastDate.setDate(lastDate.getDate() + avgCycle));

  document.getElementById("prediction").innerText =
    `下次預計開始日：${predicted.toISOString().split("T")[0]}（週期平均：${avgCycle} 天）`;
}

function translateFlow(flow) {
  switch (flow) {
    case "light": return "少量";
    case "moderate": return "中等";
    case "heavy": return "大量";
    default: return "未填寫";
  }
}

// 初始化畫面
displayHistory();
predictNext();