import "./App.css";
import React from "react";

function App() {
  var yearlySalary = 0;
  var monthlySalary = 0;
  var biweeklySalary = 0;
  var weeklySalary = 0;
  var bills = 0;
  var billsPercentage = 0;
  var taxRate = 0;
  var leftoverTotal = 0;

  function calculateSalaries() {
    yearlySalary = document.getElementById("yearlySalary").value;
    monthlySalary = yearlySalary / 12;
    monthlySalary = monthlySalary.toFixed(2);
    biweeklySalary = yearlySalary / 26;
    biweeklySalary = biweeklySalary.toFixed(2);
    weeklySalary = yearlySalary / 52;
    weeklySalary = weeklySalary.toFixed(2);

    document.getElementById("ysQuestion").style.display = "none";
    document.getElementById("salaryConfirm").style.display = "block";
    document.getElementById("yearlyValue").innerHTML =
      "Yearly Salary: $" + yearlySalary;
    document.getElementById("monthlyValue").innerHTML =
      "Monthly Salary: $" + monthlySalary;
    document.getElementById("biweeklyValue").innerHTML =
      "Biweekly Salary: $" + biweeklySalary;
    document.getElementById("weeklyValue").innerHTML =
      "Weekly Salary: $" + weeklySalary;
  }

  function submitSalaries() {
    document.getElementById("salaryConfirm").style.display = "none";
    document.getElementById("billsQuestion").style.display = "block";
  }

  function changeSalaries() {
    yearlySalary = 0;
    document.getElementById("salaryConfirm").style.display = "none";
    document.getElementById("ysQuestion").style.display = "block";
  }

  function calculateBills() {
    bills = document.getElementById("bills").value * 12;
    document.getElementById("billsQuestion").style.display = "none";
    billsPercentage = (bills / yearlySalary) * 100;
    billsPercentage = billsPercentage.toFixed(1);
    document.getElementById("billsTotal").innerHTML = "Total Bills: $" + bills;
    document.getElementById("billsPercentage").innerHTML =
      "Percentage of income: " + billsPercentage + "%";
    document.getElementById("billsConfirm").style.display = "block";
  }

  function submitBills() {
    document.getElementById("billsConfirm").style.display = "none";
    document.getElementById("taxQuestion").style.display = "block";
  }

  function changeBills() {
    bills = 0;
    document.getElementById("billsConfirm").style.display = "none";
    document.getElementById("billsQuestion").style.display = "block";
  }

  function calculateTax() {
    taxRate = document.getElementById("tax").value;
    document.getElementById("taxQuestion").style.display = "none";
    document.getElementById("taxConfirm").style.display = "block";
    document.getElementById("taxRate").innerHTML = "Tax Rate: " + taxRate + "%";
  }

  function submitTaxRate() {
    document.getElementById("taxConfirm").style.display = "none";
    leftoverTotal = yearlySalary - bills - (yearlySalary * taxRate) / 100;
    leftoverTotal = leftoverTotal.toFixed(2);
    document.getElementById("leftoverTotal").innerHTML =
      "Total leftover to allocate into savings: $" + leftoverTotal;
    document.getElementById("allDone").style.display = "block";
  }

  function changeTaxRate() {
    taxRate = 0;
    document.getElementById("taxConfirm").style.display = "none";
    document.getElementById("taxQuestion").style.display = "block";
  }

  function nextBtn() {
    document.getElementById("allDone").style.display = "none";
    document.getElementById("totalsInfo").innerHTML = leftoverTotal;
    document.getElementById("mainApp").style.display = "block";
  }

  function update(percent) {
    leftoverTotal = leftoverTotal - (leftoverTotal * percent) / 100;
    leftoverTotal = leftoverTotal.toFixed(2);

    document.getElementById("totalsInfo").innerHTML = leftoverTotal;
  }

  function getLeftoverTotal() {
    return leftoverTotal;
  }

  return (
    <div className="App">
      <div id="container">
        {/* Asks you to input your yearly salary */}
        <div id="ysQuestion">
          <div id="title">To get started answer a few questions</div>
          <div id="question">What is your yearly salary?</div>
          <div id="answer">
            <span className="yearlySalaryInput">
              $<input id="yearlySalary" type="text" name="yearly" />
            </span>
            <button onClick={calculateSalaries}>Submit</button>
          </div>
        </div>

        {/* Shows and asks you to verify if the salaries calculated are correct */}
        <div id="salaryConfirm">
          <div id="question">Does everything look correct?</div>
          <div id="answer">
            <div id="yearlyValue">Yearly Salary: {yearlySalary}</div>
            <div id="monthlyValue">Monthly Salary: {monthlySalary}</div>
            <div id="biweeklyValue">Biweekly Salary: {biweeklySalary}</div>
            <div id="weeklyValue">Weekly Salary: {weeklySalary}</div>
          </div>
          <div id="answer">
            <button onClick={submitSalaries}>Submit</button>
            <button onClick={changeSalaries}>Change</button>
          </div>
        </div>

        {/* Asks user to input amount of bills */}
        <div id="billsQuestion">
          <div id="question">
            How much in total do you pay monthly in bills?
          </div>
          <div id="answer">
            <span className="billsInput">
              $<input id="bills" type="text" name="bills" />
            </span>
            <button onClick={calculateBills}>Submit</button>
          </div>
        </div>

        {/* Asks user to confirm amount they pay in bills */}
        <div id="billsConfirm">
          <div id="question">Does this look correct?</div>
          <div id="answer">
            <div id="billsTotal">Total Bills: {bills}</div>
            <div id="billsPercentage">
              Percentage of income: {billsPercentage}
            </div>
          </div>
          <div id="answer">
            <button onClick={submitBills}>Submit</button>
            <button onClick={changeBills}>Change</button>
          </div>
        </div>

        {/* Asks user for tax percentage */}
        <div id="taxQuestion">
          <div id="question">What is your tax percentage?</div>
          <div id="answer">
            <a
              href="https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets"
              target="_blank"
            >
              Tax rate information can be found here
            </a>

            <span className="taxInput">
              <input id="tax" type="text" name="tax" /> %
            </span>
            <button onClick={calculateTax}>Submit</button>
          </div>
        </div>

        {/* Asks user to confirm tax rate */}
        <div id="taxConfirm">
          <div id="question">Does this look correct?</div>
          <div id="answer">
            <div id="taxRate">Tax Rate: {taxRate}%</div>
          </div>
          <div id="answer">
            <button onClick={submitTaxRate}>Submit</button>
            <button onClick={changeTaxRate}>Change</button>
          </div>
        </div>

        {/* Displays to leftover money to allocate */}
        <div id="allDone">
          <h1>All done!</h1>
          <div id="answer">
            <div id="leftoverTotal">
              Total leftover to allocate into savings: {leftoverTotal}
            </div>
            <button onClick={nextBtn}>Next</button>
          </div>
        </div>

        {/*  Main app container*/}
        <div id="mainApp">
          <div id="totalsInfo">
            <div id="unallocated">${leftoverTotal}</div>
          </div>
          <div id="allocationContainer"></div>
          <div id="createAllocation">
            <input id="allocateName" type="text" name="allocateName" />
            <input
              id="allocatePercentage"
              type="text"
              name="allocatePercentage"
            />
            %{/* button creates new Allocation */}
            <button
              id="createBtn"
              onClick={() => {
                let name = document.getElementById("allocateName").value;
                let percentage =
                  document.getElementById("allocatePercentage").value;
                let amount = (leftoverTotal * percentage) / 100;

                document.getElementById("allocationContainer").innerHTML +=
                  "<div class='allocation'><div class='allocationName'>" +
                  name +
                  "</div><div class='allocationPercentage'>" +
                  percentage +
                  "%</div><div class='allocationAmount'>$" +
                  amount +
                  "</div></div>";

                update(percentage);
                document.getElementById("allocateName").value = "";
                document.getElementById("allocatePercentage").value = "";
              }}
            >
              Create Allocation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
