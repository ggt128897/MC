function saveData() {
  const start = document.getElementById("startDate").value;
  const flow = document.getElementById("flow").value;
  const symptoms = Array.from(document.getElementById("symptoms").selectedOptions).map(opt => opt.value);
  const mood = document.getElementById("mood").value;
  const temp = document.getElementById("temperature").value;

  const log = {
    date: start,
    flow,
    symptoms,
    mood,
    temperature: temp
  };

  localStorage.setItem("dailyLog", JSON.stringify(log));
  alert("今日紀錄已儲存！");
}

function predictNextPeriod() {
  const start = new Date(document.getElementById("startDate").value);
  const periodLength = parseInt(document.getElementById("periodLength").value);
  const cycleLength = parseInt(document.getElementById("cycleLength").value);

  if (isNaN(start.getTime())) {
    alert("請輸入正確的開始日期");
    return;
  }

  const nextPeriod = new Date(start);
  nextPeriod.setDate(start.getDate() + cycleLength);

  const ovulationDay = new Date(nextPeriod);
  ovulationDay.setDate(nextPeriod.getDate() - 14);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>預測結果</h3>
    <p>下次月經：約 ${nextPeriod.toLocaleDateString()}</p>
    <p>排卵日：約 ${ovulationDay.toLocaleDateString()}</p>
    <p>建議備孕期：${new Date(ovulationDay - 2 * 86400000).toLocaleDateString()} - ${new Date(ovulationDay + 2 * 86400000).toLocaleDateString()}</p>
    <p>高風險避孕期與提醒已啟用。</p>
  `;

  // 推播通知
  if (Notification.permission === "granted") {
    new Notification("月經預測提醒", {
      body: `下次月經預測日為 ${nextPeriod.toLocaleDateString()}，請留意身體變化。`
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}