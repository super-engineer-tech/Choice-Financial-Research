window.addEventListener("load", (event) => {
  // Set Current year in footer
  getById("year").innerText = new Date().getFullYear();
});

window.addEventListener("scroll", (event) => {
  let navbar = getById("navbar");
  if (window.scrollY >= 75) {
    navbar.classList.add("navbar--scrolled");
  } else {
    navbar.classList.remove("navbar--scrolled");
  }
});

function getById(id) {
  return document.getElementById(id);
}

function getFormValue(event, formId) {
  event.preventDefault();

  const form = getById(formId);
  const formDate = new FormData(form);
  const jsonData = {};

  formDate.forEach((value, key) => {
    jsonData[key] = value;
  });
  console.log("Form Values: ", jsonData);
  return jsonData;
}

// Risk Analysis Form
let currentStep = 1;

function changeStep(isStepOne) {
  getById(`step-${currentStep}`).classList.remove("active-step");
  isStepOne ? currentStep++ : currentStep--;
  getById(`step-${currentStep}`).classList.add("active-step");
}

function submitRiskAnalysisForm(event, formId, isStepOne = true) {
  const form = getById(formId);
  if (form.checkValidity()) {
    riskFormObject.userInfo = getFormValue(event, formId);
    changeStep(isStepOne);
  } else {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");
}

// Function to validate the PAN Number
//
function isValidPanCardNo(panCardNo) {
  let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  if (panCardNo == null) {
    return "false";
  }
  if (regex.test(panCardNo) == true) {
    return "true";
  } else {
    return "false";
  }
}

function handleFormChange() {
  // None < 18
  // Medium - Preferred Service- Stock Cash     SCRORE >= 18 && SCORE >= 22
  // High - Preferred Service Future, Option, Commodity    SCRORE > 22
  // Maximum score client can obtain is 77

  const riskForm = getById("riskAnalysisForm2").elements;
  let count = 0;
  let riskCount = 0;
  let choicesObject = {};
  for (var i = 0; i < riskForm.length; i++) {
    if (
      riskForm[i].type === "radio" &&
      riskForm[i].checked &&
      riskForm[i].dataset.id
    ) {
      count++;
      let name = riskForm[i].name;
      riskCount += Number(riskForm[i].dataset.id);
      choicesObject[name] = riskForm[i].value;
    }
  }
  riskFormObject.options.score = riskCount;
  riskFormObject.options.choices = choicesObject;
  riskFormObject.options.selectedChoiceCount = count;

  getById("riskScore").value = riskCount;
  const riskSegmemt = getById("riskSegmemt");

  if (riskCount !== 0) {
    var lowRiskWrapper = getById("lowRiskWrapper");
    var moderateRiskWrapper = getById("moderateRiskWrapper");
    var highRiskWrapper = getById("highRiskWrapper");

    if (riskCount < 18) {
      riskSegmemt.value = "None";
      lowRiskWrapper.innerHTML = lowRiskWrapperContent;
      moderateRiskWrapper.innerHTML = "";
      highRiskWrapper.innerHTML = "";
      window.riskFormObject.options.riskStatus = riskSegmemt.value;
    } else if (riskCount >= 18 && riskCount <= 22) {
      riskSegmemt.value = "Medium - Preferred Service- Stock Cash";
      lowRiskWrapper.innerHTML = "";
      moderateRiskWrapper.innerHTML = moderateRiskWrapperContent;
      highRiskWrapper.innerHTML = "";
      window.riskFormObject.options.riskStatus = riskSegmemt.value;

    } else {
      riskSegmemt.value = "High - Preferred Service Future, Option, Commodity";
      lowRiskWrapper.innerHTML = "";
      moderateRiskWrapper.innerHTML = moderateRiskWrapperContent;
      highRiskWrapper.innerHTML = highRiskWrapperContent;
      window.riskFormObject.options.riskStatus = riskSegmemt.value;
    }
  }
}

function submitSelectServicesForm(event, formId) {
  riskFormObject.options.businessName = getById("question21").value;
  riskFormObject.selectedServices = getFormValue(event, formId);
  const selectedServicesObj = Object.keys(riskFormObject.selectedServices);
  let services = '';
  selectedServicesObj.
    filter(i => i !== 'payableAmount').forEach((service, i) => {
      services += (riskFormObject.selectedServices[service] + ((selectedServicesObj.length - 2) === i ? '.' : ', '));
    })
  let questions = '';
  window.riskAnalysisQuestions.forEach((question, index) => {
    questions += `<tr>
      <td width="80px">${index + 1}</td>
      <td width="44%">${question}</td>
      <td width="44%">${window.riskFormObject.options.choices['q' + (index + 1)] || 'N/A'}</td>
    </tr>`
  })
  console.log("questions", questions);
  let printAbleContent = `
  <div class="fs-14 p-5 text-primary-emphasis border border-secondary-subtle border-1" >
        <h1 class="text-center mb-5" style="font-size: 28px;font-weight: 700;">Risk Analysis Form Details</h1>

        <table width="100%" class="table table-bordered">
            <tbody>
                <tr>
                    <td class="fw-medium">Client Name:</td>
                    <td>${riskFormObject.userInfo.name}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Contact:</td>
                    <td>${riskFormObject.userInfo.contact}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Pan Number:</td>
                    <td>${riskFormObject.userInfo.panNo}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Aadhar Number:</td>
                    <td>${riskFormObject.userInfo.adharCardNo}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Date of Birth:</td>
                    <td>${riskFormObject.userInfo.dob}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Email:</td>
                    <td>${riskFormObject.userInfo.email}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Current City:</td>
                    <td>${riskFormObject.userInfo.city}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Service:</td>
                    <td>${services}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Payable Amount:</td>
                    <td>${riskFormObject.selectedServices.payableAmount}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Risk Status:</td>
                    <td>${riskFormObject.options.riskStatus}</td>
                </tr>
                <tr>
                    <td class="fw-medium">Total Scores:</td>
                    <td>${riskFormObject.options.score}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-center mt-5 pt-3">
            <hr>
            <span class="fs-24 d-inline-block bg-white position-relative" style="transform: translateY(-100%);">Submited Question Answer</span>
        </div>
        <table width="100%" class="table table-bordered">
            <thead>
                <tr>
                    <th class="bg-info-subtle bg-gradient" width="80px">Q No.</th>
                    <th class="bg-info-subtle bg-gradient" width="44%">Questions</th>
                    <th class="bg-info-subtle bg-gradient" width="44%">Answer (Score)</th>
                </tr>
            </thead>
            <tbody>`
    +
    questions
    +
    `</tbody>
        </table>
    </div>`;

  printSection(printAbleContent);
}

function printSection(printAbleContent) {
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printAbleContent;
  // Print the specific div
  window.print();
  // Restore original page content
  document.body.innerHTML = originalContents;
}
