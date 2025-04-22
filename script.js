document.addEventListener("DOMContentLoaded", function() {
    const daysInMonth = 30; // 假設 30 天的月曆
    const cycleLength = 28; // 假設月經週期為 28 天
    const ovulationDay = 14; // 排卵日
    const fertileWindow = [12, 13, 14, 15]; // 易孕期

    const calendarContainer = document.getElementById('calendar');
    const dayDetails = document.getElementById('dayDetails');
    const statusMessage = document.getElementById('statusMessage');
    
    // 建立日曆
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        // 設置日曆的顏色
        if (day === ovulationDay) {
            dayElement.classList.add('ovulation');
        } else if (fertileWindow.includes(day)) {
            dayElement.classList.add('fertile');
        }

        // 點擊事件，顯示選擇的日期詳細狀況
        dayElement.addEventListener('click', function() {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');
            
            let message = `今天是第 ${day} 天。`;
            if (day === ovulationDay) {
                message += " 今天是排卵日！";
            } else if (fertileWindow.includes(day)) {
                message += " 今天是易孕期的一部分。";
            } else if (day % cycleLength === 0) {
                message += " 可能接近月經的結束日。";
            }

            statusMessage.textContent = message;
            dayDetails.style.display = 'block';
        });

        calendarContainer.appendChild(dayElement);
    }
});
