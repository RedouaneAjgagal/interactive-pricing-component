const rangeInput = document.querySelector('input[type="range"]')
const price = document.getElementById("rangevalue")
const views = document.getElementById("views")
const toggle = document.getElementById("toggle")
const discount = document.querySelector(".saved")
const total = document.getElementById("total")
function saving(e, d25) {
    if (e.innerText === null) {
        e.innerText += (' $' + Math.floor(d25 * 12) + ' Saved')
    } else {
        e.innerText = ''
        e.innerText += (' $' + Math.floor(d25 * 12) + ' Saved')
    }
}
function totalPriceYear(e, d25) {
    if (e.innerText === null) {
        e.innerText += ('Total: $' + Math.floor((rangeInput.value - d25) * 12) + ' / year')
    } else {
        e.innerText = ''
        e.innerText += ('Total: $' + Math.floor((rangeInput.value - d25) * 12) + ' / year')
    }
}
function totalPriceMonth(e) {
    if (e.innerText === null) {
        e.innerText += 'Total: $' + rangeInput.value + ' / month'
    } else {
        e.innerText = ''
        e.innerText += 'Total: $' + rangeInput.value + ' / month'
    }
}
// When click on the checkbox
toggle.addEventListener("input", () => {
    let discount25 = ((rangeInput.value / 100)*25)
    if (toggle.checked) {
        toggle.setAttribute("aria-expanded", "true")
        discount.classList.remove("hidden")
        // Calc per month for yearly billing
        price.innerText = '$' + (rangeInput.value - discount25).toFixed(2);
        saving(discount, discount25)
        totalPriceYear(total, discount25)
    } else {
        toggle.setAttribute("aria-expanded", "false")
        // Calc per month for monthly billing
        price.innerText = '$' + rangeInput.value + ".00"
        discount.classList.add("hidden")
        totalPriceMonth(total)
    }
})
// When change the range value
rangeInput.addEventListener('input', (e) => {
    const min = e.target.min
    const max = e.target.max
    const val = e.target.value
    let discount25 = ((e.target.value / 100)*25)
    // Change the green slider based on thumb value
    e.target.style.backgroundSize = ((val - min) * 100 / (max - min)) + '% 100%'
    // change the page views
    views.innerText = Math.floor((e.target.value * 6.25)) + 'K PAGEVIEWS'
    if (toggle.checked) {
        discount.classList.remove("hidden")
        // Calc per month for yearly billing
        price.innerText = '$' + (e.target.value - discount25).toFixed(2)
        saving(discount, discount25)
        totalPriceYear(total, discount25)
    } else {
        // Calc per month for monthly billing
        price.innerText = '$' + e.target.value + ".00"
        discount.classList.add("hidden")
        totalPriceMonth(total)
    }
})