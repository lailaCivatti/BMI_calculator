//todo: restrict input of wrong characters/values during typing/before submission

// reference to HTML elements
const form = document.querySelector("form");
const weight = document.querySelector("input[name='weight']");
const height = document.querySelector("input[name='height']");
const submitBtn = document.querySelector("button");

let weightValue;
let heightValue;

// to calculate Body Mass Index
function calcBMI(weight, height) {
    let BMI = weight / (height ** 2);
    BMI = Math.round(BMI*100)/100;
    console.log(BMI);
    return BMI;
}

// to validate numbers
function isNum(num) {
    if (typeof num === "number") {
        return true;
    } else {
        return false;
    }
};

// begin ready for typing
weight.focus();

submitBtn.addEventListener('click', (e) => {

    // avoid sending form
    e.preventDefault();

    weightValue = weight.value;
    heightValue = height.value;

    // checking if both inputs are there && are numbers
    if (!isNum(weightValue) && !isNum(heightValue)) {
        // removing previous results if any
        while (form.lastElementChild.tagName === "P") {
            form.removeChild(form.lastElementChild);
            console.log(`Deleted 1 paragraph.`);
        };
        
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
            paraClassification.textContent = `Maybe try to spend some more calories and avoid those cookies, because you are overweight... But don't stress over it, life is too short. On second thought, go on and eat those cookies!`;
        } else {
            paraClassification.textContent = `Okay, it may be time to visit the doctor and make sure you are doing alright, because it seems you are obese. Remember to take care of yourself too.`;
        }
        form.appendChild(paraClassification);

    } else if (!isNum(weightValue)) {
        weight.focus();
        weight.setAttribute("class", "alert");
        //todo: add error message
    } else if (!isNum(heightValue)) {
        height.focus();
        height.setAttribute("class", "alert");
        //todo: add error message
    } 
});

// emptying inputs
//todo: empty them only after submission???
weight.addEventListener('click', () => {
    weight.value = '';
});
height.addEventListener('click', () => {
    height.value = '';
});