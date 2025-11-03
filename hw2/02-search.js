const userInput = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

const highlightSearchTerm = function highlightAndMarkSearchTermsInText(
  text,
  searchTerm
) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

const createCharacterCard = function generateBootstrapCardForCharacter(
  character,
  searchTerm
) {
  return `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${highlightSearchTerm(
            character.name,
            searchTerm
          )}</h5>
          <p class="card-text">
            <strong>Birth Year:</strong> ${highlightSearchTerm(
              character.birth_year,
              searchTerm
            )}
          </p>
        </div>
      </div>
    </div>
  `;
};

const performSearch = function searchCharactersAndDisplayResults() {
  const searchTerm = userInput.value.trim().toLowerCase();

  if (!searchTerm) {
    searchResults.innerHTML =
      '<div class="alert alert-info">Please enter a search term.</div>';
    return;
  }

  const filteredCharacters = characters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchTerm) ||
      character.height.toLowerCase().includes(searchTerm) ||
      character.birth_year.toLowerCase().includes(searchTerm)
    );
  });

  if (filteredCharacters.length === 0) {
    searchResults.innerHTML =
      '<div class="alert alert-warning">No characters found matching your search.</div>';
  } else {
    const cardsHTML = filteredCharacters
      .map((character) => createCharacterCard(character, searchTerm))
      .join("");

    searchResults.innerHTML = `
      <div class="row">
        ${cardsHTML}
      </div>
    `;
  }
};

searchButton.addEventListener("click", performSearch);

const handleKeyPress = function validateAndTriggerSearchOnEnterKey(event) {
  if (event.key === "Enter") {
    performSearch();
  }
};

userInput.addEventListener("keypress", handleKeyPress);
