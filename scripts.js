// Function to populate the unit options based on the selected conversion type
function showConversionFields() {
    const convertType = document.getElementById("convertType").value;
    const inputUnit = document.getElementById("inputUnit");
    const outputUnit = document.getElementById("outputUnit");

    // Clear previous options
    inputUnit.innerHTML = "";
    outputUnit.innerHTML = "";

    // Define unit options based on the conversion type
    let units;
    switch (convertType) {
        case "length":
            units = ["meters", "kilometers", "miles", "feet"];
            break;
        case "weight":
            units = ["grams", "kilograms", "pounds", "ounces"];
            break;
        case "currency":
            units = ["USD", "EUR", "GBP", "INR"];
            break;
        case "temperature":
            units = ["Celsius", "Fahrenheit", "Kelvin"];
            break;
        default:
            units = [];
    }

    // Populate the inputUnit and outputUnit selects with options
    if (units.length > 0) {
        units.forEach(unit => {
            const option1 = document.createElement("option");
            option1.value = unit;
            option1.text = unit;
            inputUnit.add(option1);

            const option2 = document.createElement("option");
            option2.value = unit;
            option2.text = unit;
            outputUnit.add(option2);
        });
    }
}

// Function to perform the conversion based on selected options
function convert() {
    const convertType = document.getElementById("convertType").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const inputUnit = document.getElementById("inputUnit").value;
    const outputUnit = document.getElementById("outputUnit").value;

    let result = 0;

    if (isNaN(inputValue)) {
        document.getElementById("result").textContent = "Please enter a valid number!";
        return;
    }

    if (convertType === "length") {
        result = convertLength(inputValue, inputUnit, outputUnit);
    } else if (convertType === "weight") {
        result = convertWeight(inputValue, inputUnit, outputUnit);
    } else if (convertType === "currency") {
        result = convertCurrency(inputValue, inputUnit, outputUnit);
    } else if (convertType === "temperature") {
        result = convertTemperature(inputValue, inputUnit, outputUnit);
    }

    document.getElementById("result").textContent = `Result: ${result} ${outputUnit}`;
}

// Conversion functions for each type
function convertLength(value, fromUnit, toUnit) {
    const lengthConversions = {
        meters: 1,
        kilometers: 0.001,
        miles: 0.000621371,
        feet: 3.28084
    };
    return value * (lengthConversions[toUnit] / lengthConversions[fromUnit]);
}

function convertWeight(value, fromUnit, toUnit) {
    const weightConversions = {
        grams: 1,
        kilograms: 0.001,
        pounds: 0.00220462,
        ounces: 0.035274
    };
    return value * (weightConversions[toUnit] / weightConversions[fromUnit]);
}

function convertCurrency(value, fromUnit, toUnit) {
    const currencyRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        INR: 73.5
    };
    return value * (currencyRates[toUnit] / currencyRates[fromUnit]);
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        return (value * 9/5) + 32;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
        return (value - 32) * 5/9;
    } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
        return value + 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
        return value - 273.15;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
        return ((value - 32) * 5/9) + 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
        return ((value - 273.15) * 9/5) + 32;
    } else {
        return value;
    }
}

// Initialize the conversion fields on page load
document.addEventListener("DOMContentLoaded", showConversionFields);
