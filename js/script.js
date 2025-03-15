document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
});

const unitTypes = {
  data: {
    units: ["Bytes", "Kilobytes"],
    conversions: {
      Bytes_Kilobytes: (value) => value / 1024,
      Kilobytes_Bytes: (value) => value * 1024,
    },
  },
  distance: {
    units: ["Kilometers", "Meters", "Miles"],
    conversions: {
      Kilometers_Meters: (value) => value * 1000,
      Meters_Kilometers: (value) => value / 1000,
      Kilometers_Miles: (value) => value * 0.621371,
      Miles_Kilometers: (value) => value / 0.621371,
      Meters_Miles: (value) => value / 1609.34,
      Miles_Meters: (value) => value * 1609.34,
    },
  },
  weight: {
    units: ["Kilograms", "Pounds"],
    conversions: {
      Kilograms_Pounds: (value) => value * 2.20462,
      Pounds_Kilograms: (value) => value / 2.20462,
    },
  },
  temperature: {
    units: ["Celsius", "Fahrenheit"],
    conversions: {
      Celsius_Fahrenheit: (value) => (value * 9) / 5 + 32,
      Fahrenheit_Celsius: (value) => ((value - 32) * 5) / 9,
    },
  },
  volume: {
    units: ["Liters", "Gallons"],
    conversions: {
      Liters_Gallons: (value) => value * 0.264172,
      Gallons_Liters: (value) => value / 0.264172,
    },
  },
};

function updateUnitSelects() {
  const type = document.getElementById("conversionType").value;
  const fromSelect = document.getElementById("fromUnit");
  const toSelect = document.getElementById("toUnit");

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  unitTypes[type].units.forEach((unit) => {
    fromSelect.add(new Option(unit, unit));
    toSelect.add(new Option(unit, unit));
  });
}

function convert() {
  const type = document.getElementById("conversionType").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);

  if (isNaN(inputValue)) {
    document.getElementById("result").textContent =
      "Please enter a valid number";
    return;
  }

  if (fromUnit === toUnit) {
    document.getElementById("result").textContent = `${inputValue} ${fromUnit}`;
    return;
  }

  const conversionKey = `${fromUnit}_${toUnit}`;
  const conversion = unitTypes[type].conversions[conversionKey];

  if (conversion) {
    const result = conversion(inputValue);
    document.getElementById(
      "result"
    ).textContent = `${inputValue} ${fromUnit} = ${result.toFixed(
      2
    )} ${toUnit}`;
  }
}

// Initialize the unit selects when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateUnitSelects();
  document
    .getElementById("conversionType")
    .addEventListener("change", updateUnitSelects);
});
