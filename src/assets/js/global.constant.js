window.riskFormObject = {
    userInfo: null,
    options: {
        businessName: null,
        choices: null,
        selectedChoiceCount: null,
        score: null,
        riskStatus: null
    },
    selectedServices: null
};

window.riskAnalysisQuestions = ['What is your Age Group?',
    'What is your occupation?',
    'Your Current Investment in trading',
    'Your Preferred Investment Type',
    'Total Annual Income',
    'Experience with Equity Investment',
    'Experience with Commodity Investment',
    'What is your experience with investment in past',
    'Investment Goal/Objective',
    'Total Experience in Market/Investment',
    'Total Experience in Market/Investment',
    'Experience in Market Segments',
    'Size of Emergency Funds',
    'Percentage of income allocated to payoff Debts',
    'Status of Accommodation',
    'No of financially Dependent on you',
    'Risk tolerance on Investment in terms of losses',
    'Practice on Saving money',
    'Experience with Forex Investment',
    'Are you any of the following, or directly or indirectly related to any of the following',
    'Name of Business/Firm/Company that you own or work'];


// HTML Content which show in #lowRiskWrapper
window.lowRiskWrapperContent =
    `<p class="fw-medium ">Low Risk</p>
    <div class="row row-cols-1 row-gap-2">
        <div class="col">
            <label for="lowRisk">
                <input type="radio" class="form-check-input" id="lowRisk" name="lowRisk" value="No Service can be offered">
                <span>No Service can be offered</span>
            </label>
        </div>
    </div>`;

// HTML Content which show in #moderateRiskWrapper
window.moderateRiskWrapperContent =
    `<p class="fw-medium ">Moderate Risk</p>
    <div class="row row-cols-1 row-gap-2">
        <div class="col">
            <label for="moderateRisk">
                <input type="radio" class="form-check-input" id="moderateRisk" name="moderateRisk" value="Stock Cash">
                <span>Stock Cash</span>
            </label>
        </div>
    </div>`;

// HTML Content which show in #highRiskWrapper
window.highRiskWrapperContent =
    `<p class="fw-medium ">High Risk Services-</p>
    <div class="row row-cols-1 row-gap-2">
        <div class="col">
            <label for="highRiskServices1">
                <input type="radio" class="form-check-input" id="highRiskServices1" name="highRiskServices" value="Index Option">
                <span>Index Option</span>
            </label>
        </div>
        <div class="col">
            <label for="highRiskServices2">
                <input type="radio" class="form-check-input" id="highRiskServices2" name="highRiskServices" value="Stock Option">
                <span>Stock Option</span>
            </label>
        </div>
        <div class="col">
            <label for="highRiskServices3">
                <input type="radio" class="form-check-input" id="highRiskServices3" name="highRiskServices" value="Stock Future">
                <span>Stock Future</span>
            </label>
        </div>
        <div class="col">
            <label for="highRiskServices4">
                <input type="radio" class="form-check-input" id="highRiskServices4" name="highRiskServices" value="Bluechip C/F/O">
                <span>Bluechip C/F/O</span>
            </label>
        </div>
        <div class="col">
            <label for="highRiskServices5">
                <input type="radio" class="form-check-input" id="highRiskServices5" name="highRiskServices" value="Commodity Service">
                <span>Commodity Service</span>
            </label>
        </div>
        <div class="col">
            <label for="highRiskServices6">
                <input type="radio" class="form-check-input" id="highRiskServices6" name="highRiskServices" value="Wealth Management C/F/O/Commodity">
                <span>Wealth Management C/F/O/Commodity</span>
            </label>
        </div>
    </div>`;