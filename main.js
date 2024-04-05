import { countryList } from "/app.js";
const drop = document.querySelectorAll(".drop select");
const btn = document.getElementById("btn");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const icon = document.querySelector(".icon");
for (let i = 0; i < drop.length; i++) {
    for (const key in countryList) {
        let selected;
        if (i === 0) {
            selected = key == "USD" ? "selected" : "";
        } else if (i === 1) {
            selected = key == "EGP" ? "selected" : "";
        }
        let option = `<option value="${key}" ${selected}>${key}</option>`;
        drop[i].insertAdjacentHTML("beforeend", option);
    }
    drop[i].addEventListener("change", (e) => loadfrag(e.target));
}
function loadfrag(element) {
    for (const key in countryList) {
        if (key == element.value) {
            let img = element.parentElement.querySelector("img");
            img.src = `https://flagsapi.com/${countryList[key]}/flat/64.png`;
        }
    }
}
icon.addEventListener("click", () => {
    [from.value, to.value] = [to.value, from.value];
    loadfrag(from);
    loadfrag(to);
    getRate();
});
window.addEventListener("load", () => getRate());
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getRate();
});
function getRate() {
    const amount = document.querySelector(".amount input");
    const amountVal = amount.value;
    const exchange = document.getElementById("exchange");
    if (amountVal !== "" || amount.value !== 0) {
        exchange.innerHTML = "Getting Exchange Rate .....";
        fetch(
            `https://v6.exchangerate-api.com/v6/db2eae1a5cf8d909a4cf5927/latest/${from.value}`
        )
            .then((res) => res.json())
            .then((res) => {
                let exchangerate = res.conversion_rates[to.value];
                let total = (amountVal * exchangerate).toFixed(2);
                exchange.innerText = `${amountVal} ${from.value} = ${total} ${to.value}`;
            })
            .catch(() => (exchange.innerText = "Something Went Wrong"));
    }
}
