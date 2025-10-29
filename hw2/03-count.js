const input = document.getElementById("userInput");
const textContainer = document.querySelector("main div:last-child");

const originalText = textContainer.textContent;

const highlightMatches = function highlightFullWordMatchesInText(searchTerm) {
  if (!searchTerm.trim()) {
    textContainer.textContent = originalText;
    return;
  }

  const regex = new RegExp(
    `\\b(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`,
    "gi"
  );

  const highlightedText = originalText.replace(regex, "<mark>$1</mark>");

  textContainer.innerHTML = highlightedText;
};

const handleKeyDown = function handleKeyDownForDelayedSearch(event) {
  setTimeout(() => {
    highlightMatches(input.value);
  }, 0);
};

const handleInput = function handleInputForRealTimeSearch(event) {
  highlightMatches(input.value);
};

input.addEventListener("keydown", handleKeyDown);
input.addEventListener("input", handleInput);
