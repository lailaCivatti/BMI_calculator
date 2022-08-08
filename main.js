//todo: restrict input of wrong characters/values during typing/before submission
//todo: apply limits to the inputs for height and weight: cant be a 10m person or a 400 kg person...
//todo: make it responsive (mobile first)

// REFERENCES:

// to HTML elements
const form = document.querySelector("form");
const weight = document.querySelector("input[name='weight']");
const height = document.querySelector("input[name='height']");
const submitBtn = document.querySelector("button");

const wContainer = document.querySelector(".weight");
const hContainer = document.querySelector(".height");

const wAlert = document.createElement("p");
const hAlert = document.createElement("p");

let weightValue;
let heightValue;

// FUNCTIONS:

// to calculate Body Mass Index
function calcBMI(weight, height) {
    let BMI = weight / (height ** 2);
    BMI = Math.round(BMI*100)/100;
    console.log(BMI);
    return BMI;
};

//remove previous alerts:
function removeAlerts() {
    if (wAlert.textContent !== '') {
        weight.classList.remove("alert");
        wContainer.removeChild(wAlert);
        wAlert.textContent = '';
    } else if (hAlert.textContent !== '') {
        height.classList.remove("alert");
        hContainer.removeChild(hAlert);
        hAlert.textContent = '';
    }
};

// to remove previous results
function removeResults() {
    while (form.lastElementChild.tagName === "P") {
    form.removeChild(form.lastElementChild);
    console.log(`Deleted 1 paragraph.`);
}
};

// to validate numbers
function isNum(num) {
    if (typeof num === "number") {
        return true;
    } else {
        return false;
    }
};

// FUNCTIONALITY:

// begin ready for typing
weight.focus();

// "Calculate" button event listener:
submitBtn.addEventListener('click', (e) => {

    // avoid sending form
    e.preventDefault();

    //taking value strings and returning numbers
    weightValue = Number(weight.value);
    heightValue = Number(height.value);
    console.log(weightValue,heightValue);

    // checking if both inputs are there && are numbers && are not empty strings
    if (weightValue && heightValue) {
        
        // removing alerts and results
        removeAlerts();
        removeResults();
        
        // declaring result and paragraphs, then appending main result first
        const result = calcBMI(weightValue, heightValue);
        const paraResult = document.createElement("p");
        const paraClassification = document.createElement("p");
        
        paraResult.textContent = `With ${weightValue}Kg and ${heightValue}m you have a BMI of ${result}Kg/m\u00B2.`;
        form.appendChild(paraResult);

        // choosing correct classification and appending it after main result
        if (result < 18.5) {
            paraClassification.textContent = `Go eat a cupcake, you are underweight.`;
        } else if (18.5 <= result && result < 24.9) {
            paraClassification.textContent = `Keep doing what you're doing, you are in the healthy weight range.`;
        } else if (24.9 <= result && result < 29.9) {
            paraClassification.textContent = `Maybe try to spend some more calories and avoid those cookies, because you are overweight...
            But don't stress over it, life is too short. 
            On second thought, go on and eat those cookies!`;
        } else {
            paraClassification.textContent = `Okay, it may be time to visit the doctor and make sure you are doing alright, because it seems you are obese.
            Remember to take care of yourself too.`;
        }
        form.appendChild(paraClassification);
        weight.value = '';
        height.value = '';

    } else if (!weightValue) {
        removeAlerts();
        removeResults();
        weight.focus();
        weight.setAttribute("class", "alert");
        wAlert.classList.add("alert");
        wAlert.textContent = `Please type a number.`;
        wContainer.appendChild(wAlert);

    } else if (!heightValue) {
        removeAlerts();
        removeResults();
        height.focus();
        height.setAttribute("class", "alert");
        hAlert.classList.add("alert");
        hAlert.textContent = `Please type a number.`;
        hContainer.appendChild(hAlert);
    } 
});