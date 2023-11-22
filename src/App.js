import "./App.css";
import React from "react";
import Delete from "./components/deleteBtn";

function App() {
  var yearlySalary = 0;
  var taxRate = 0;
  var originalTotal = 0;
  var total = 0;

  function submitSalary() {
    yearlySalary = document.getElementById("salaryInput").value;
    document.getElementById("salary").style.display = "none";
    document.getElementById("tax").style.display = "block";
  }

  function submitTax() {
    taxRate = document.getElementById("taxInput").value;
    total = yearlySalary - (yearlySalary * taxRate) / 100;
    originalTotal = total;
    document.getElementById("leftoverTotal").innerHTML =
      "Total to allocate into savings: $" + total.toFixed(2);
    document.getElementById("tax").style.display = "none";
    document.getElementById("allDone").style.display = "block";
  }

  function nextBtn() {
    document.getElementById("allDone").style.display = "none";
    document.getElementById("originalTotal").innerHTML =
      "Total $" + originalTotal;
    document.getElementById("total").innerHTML = "Unallocated $" + total;
    document.getElementById("mainApp").style.display = "block";
  }

  // updates the total in #screen
  function update(percent) {
    total = total - (total * percent) / 100;
    document.getElementById("originalTotal").innerHTML =
      "Total $" + originalTotal;
    document.getElementById("total").innerHTML =
      "Unallocated $" + total.toFixed(2);
  }

  // LATER: create a function that updates the total when you delete an allocation and updates the allocations percentages and amounts

  // Allocation object
  function Allocation(name, percentage) {
    this.name = name;
    this.percentage = percentage;
  }

  var allocations = [];
  // creates a new allocation object and adds it to the allocations array
  function createAllocation() {
    var name = document.getElementById("nameInput").value;
    var percent = document.getElementById("percentInput").value;
    var newAllocation = new Allocation(name, percent);
    allocations.push(newAllocation);
    displayAllocations();
    update(percent);
  }

  // Displays all of the allocations
  function displayAllocations() {
    document.getElementById("allocationContainer").innerHTML = "";
    for (var i = 0; i < allocations.length; i++) {
      document.getElementById("allocationContainer").innerHTML +=
        "<div id='allocation'><div id='allocationTitle'>" +
        allocations[i].name +
        "</div><div id='allocationPercent'> " +
        allocations[i].percentage +
        "%</div><div id='allocationAmount'>$" +
        ((total * allocations[i].percentage) / 100 / 12).toFixed(0) +
        "/month</div></div>";
    }
    displayAllocationNames();
  }

  // Displays all of the names of allocations in a selector list, for deleting
  function displayAllocationNames() {
    document.getElementById("selectorContainer").innerHTML = "";
    document.getElementById("selectorContainer").innerHTML +=
      "<select id='allocationSelector'></select>";
    for (var i = 0; i < allocations.length; i++) {
      document.getElementById("allocationSelector").innerHTML +=
        "<option value='" +
        allocations[i].name +
        "'>" +
        allocations[i].name +
        "</option>";
    }
  }

  // needs to add back to total
  function deleteAllocation() {
    var allocationName = document.getElementById("allocationSelector").value;
    for (var i = 0; i < allocations.length; i++) {
      if (allocations[i].name === allocationName) {
        allocations.splice(i, 1);
      }
    }
    displayAllocations();
  }

  // updates number next to percentage input to show monthly or yearly amount
  function showNum() {
    var percent = document.getElementById("percentInput").value;
    document.getElementById("showNum").innerHTML =
      "$" + ((total * percent) / 100 / 12).toFixed(0) + "/month";
  }
  // if clicked, changes the number next to percentage input to show monthly or yearly amount
  function changeNum() {
    var percent = document.getElementById("percentInput").value;
    if (document.getElementById("showNum").innerHTML.includes("month")) {
      document.getElementById("showNum").innerHTML =
        "$" + ((total * percent) / 100).toFixed(0) + "/year";
    } else {
      document.getElementById("showNum").innerHTML =
        "$" + ((total * percent) / 100 / 12).toFixed(0) + "/month";
    }
  }

  return (
    <div className="App">
      <div id="container">
        {/* Asks you to input your yearly salary */}
        <div id="salary">
          <div id="title">To get started answer a few questions</div>
          <div id="question">What is your yearly salary?</div>
          <div id="answer">
            <span className="yearlySalaryInput">
              $<input id="salaryInput" type="text" name="yearly" />
            </span>
            <button onClick={submitSalary}>Submit</button>
          </div>
        </div>
        {/* END SALARY */}

        {/* Asks user for tax percentage */}
        <div id="tax">
          <div id="question">What is your tax rate?</div>
          <div id="answer">
            <a
              href="https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets"
              target="_blank"
              rel="noreferrer"
            >
              To find your tax rate click here
            </a>
            <span className="taxInput">
              <input id="taxInput" type="text" name="tax" /> %
            </span>
            <button onClick={submitTax}>Submit</button>
          </div>
        </div>
        {/* END TAX */}

        {/* Displays to leftover money to allocate */}
        <div id="allDone">
          <h1>All done!</h1>
          <div id="answer">
            <div id="leftoverTotal">
              Total leftover to allocate into savings: {total}
            </div>
            <button onClick={nextBtn}>Next</button>
          </div>
        </div>

        {/*  Main app container*/}
        <div id="mainApp">
          <div id="screen">
            <div id="originalTotal">Total ${originalTotal}</div>
            <div id="total">Total ${total}</div>
          </div>
          {/* <div id="allocationParent"> */}
          <div id="allocationContainer"></div>
          {/* </div> */}
          <div id="createContainer">
            <input id="nameInput" type="text" name="name" placeholder="Name" />
            <input
              id="percentInput"
              type="text"
              name="percent"
              placeholder="%"
              onChange={showNum}
            />{" "}
            %
            <span id="showNum" onClick={changeNum}>
              $0/month
            </span>
            {/* turn createBtn into component */}
            <button id="createBtn" onClick={createAllocation}>
              Create
            </button>
          </div>

          <div id="deleteContainer">
            <div id="selectorContainer"></div>
            <Delete onClick={deleteAllocation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
