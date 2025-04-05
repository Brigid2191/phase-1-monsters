document.addEventListener("DOMContentLoaded", () => {
    const monsterList = document.getElementById("monster-list");
    const loadMoreButton = document.getElementById("load-more");
    const monsterForm = document.getElementById("monster-form");
    let currentPage = 1;
    const limit = 50;
  
    // Fetch and display monsters
    function loadMonsters(page = 1) {
      fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          monsters.forEach((monster) => {
            const monsterDiv = document.createElement("div");
            monsterDiv.innerHTML = `
              <h3>${monster.name}</h3>
              <p>Age: ${monster.age}</p>
              <p>${monster.description}</p>
            `;
            monsterList.appendChild(monsterDiv);
          });
        });
    }
  
    // Create a new monster
    monsterForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      const newMonster = {
        name: name,
        age: age,
        description: description,
      };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newMonster),
      })
        .then((response) => response.json())
        .then(() => {
          // After adding a monster, clear the form and reload the list
          monsterForm.reset();
          monsterList.innerHTML = ''; // Clear current list
          loadMonsters(1); // Reload first page
        })
        .catch((error) => console.error("Error:", error));
    });
  
    // Load more monsters when the button is clicked
    loadMoreButton.addEventListener("click", () => {
      currentPage++;
      loadMonsters(currentPage);
    });
  
    // Initially load the first set of monsters
    loadMonsters(currentPage);
  });
np  