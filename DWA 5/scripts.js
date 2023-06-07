const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  
  const wholenumber = dividend / divider;

  // Check if either dividend or divider is not a number
  if(isNaN(dividend) || isNaN(divider)) {
    document.body.innerText = " Something critical went wrong. Please reload the page.";
    console.error("Invalid input provided. Program crashed");
  }
  
  // Check if either dividend or divider is an empty string
  else if( dividend === "" || divider === "") {
    result.innerText = " Division not performed. Both values are required in inputs. Try again "; 
  }
  
  // Check if either dividend or divider is a negative number
  else if (dividend < 0 || divider < 0) {
    console.error("Invalid input provided. Division not performed. Negative number(s) detected."); // Console error message
    result.innerText = "Division not performed. Invalid number provided. Try again";
  }
  
  // All conditions are met, perform division
  else {
    result.innerText = Math.floor(wholenumber)
  }
  
});

