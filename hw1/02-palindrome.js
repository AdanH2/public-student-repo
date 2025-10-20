const elem = document.querySelector("input");

const handleInput = function validateAndCheckPalindromeInputHandler(event) {
  const inputNum = event.target.value;
  const resultElem = document.getElementById("palindromeResult");

  if (inputNum.length === 0) {
    resultElem.textContent = "";
    resultElem.className = "";
    return;
  } else if (inputNum < 0) {
    document.getElementById("palindromeResult").textContent =
      "Please enter a positive number.";
    document.getElementById("palindromeResult").className = "text-warning";
    return;
  } else if (!/^\d*$/.test(inputNum) && inputNum.length > 0) {
    document.getElementById("palindromeResult").textContent =
      "Please enter a valid number.";
    document.getElementById("palindromeResult").className = "text-warning";
    return;
  }

  const reversedStr = inputNum.split("").reverse().join("");
  const isPalindrome = inputNum === reversedStr;

  if (isPalindrome && inputNum.length > 0) {
    resultElem.textContent = "Yes. This is a palindrome!";
    resultElem.className = "text-success";
  } else {
    resultElem.textContent = "No. Try Again.";
    resultElem.className = "text-danger";
  }
};

elem.addEventListener("input", handleInput);
