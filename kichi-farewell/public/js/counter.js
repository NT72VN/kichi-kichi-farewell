// =============================
// KICHI FAREWELL - COUNTER DAYS
// =============================

// ngày bắt đầu làm việc
const startDate = new Date("2025-04-03");

// ngày kết thúc
const endDate = new Date("2026-03-12");


// tính số ngày làm việc
function calculateWorkDays(start, end) {

    const oneDay = 1000 * 60 * 60 * 24;

    const diffTime = end - start;

    const diffDays = Math.floor(diffTime / oneDay);

    return diffDays;
}


// hiệu ứng đếm số
function animateCounter(targetNumber, duration = 2000) {

    const counter = document.getElementById("workDays");

    if (!counter) return;

    let start = 0;

    const stepTime = Math.abs(Math.floor(duration / targetNumber));

    const timer = setInterval(() => {

        start++;

        counter.textContent = start;

        if (start >= targetNumber) {

            clearInterval(timer);

            counter.textContent = targetNumber;

        }

    }, stepTime);

}


// khi load trang
window.addEventListener("DOMContentLoaded", () => {

    const days = calculateWorkDays(startDate, endDate);

    animateCounter(days, 2000);

});