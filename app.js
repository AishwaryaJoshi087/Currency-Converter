const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newopt = document.createElement("option");
        newopt.innerText = currCode;
        newopt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newopt.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newopt.selected = "selected";
        }
        select.append(newopt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newflg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newflg;
};

 btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        console.log(amtVal);
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
        }

        toCurr_lo = toCurr.value.toLowerCase();
        //console.log(toCurr_lo);
        const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()];
        rate_f = rate[toCurr_lo];
        let finalamt = amtVal * rate_f;
        //console.log(finalamt);

       msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

    });















































































