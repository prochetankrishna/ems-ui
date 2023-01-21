function addNewEmployee() {
  let firstNameInput = document.getElementById("firstName").value;
  let lastNameInput = document.getElementById("lastName").value;
  let salaryInput = document.getElementById("salary").value;
  let houseFlatNumberInput = document.getElementById("houseNumber").value;
  let addressLineOneInput = document.getElementById("addressLineOne").value;
  let addressLineTwoInput = document.getElementById("addressLineTwo").value;
  let cityInput = document.getElementById("city").value;
  let stateInput = document.getElementById("state");
  let stateText = stateInput.options[stateInput.selectedIndex].text;
  let countryInput = document.getElementById("country");
  let countryText = countryInput.options[countryInput.selectedIndex].text;
  let pincodeInput = document.getElementById("pincode").value;

  let employeeRequest = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    salary: salaryInput,
    address: {
      houseNumber: houseFlatNumberInput,
      addressLineOne: addressLineOneInput,
      addressLineTwo: addressLineTwoInput,
      city: cityInput,
      state: stateText,
      country: countryText,
      pincode: pincodeInput,
    },
  };

  fetch("http://localhost:8088/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(employeeRequest),
  })
    .then((res) => {
      //2XX
      console.log(res);
      res.json().then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      alert(error);
    });
}
