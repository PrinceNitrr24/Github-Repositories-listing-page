// --------------------------JavaScript logic----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.github.com/users/";
  const usernameInput = document.getElementById("searchInput");
  const repoListContainer = document.getElementById("repoList");
  const paginationContainer = document.getElementById("pagination");
  const loader = document.getElementById("loader");
  const itemsPerPageSelect = document.getElementById("itemsPerPageSelect");
  const itemsPerPageLabel = document.getElementById("itemsPerPageLabel");
  let itemsPerPage = 10; // Default number of repositories per page
  let currentPage = 1; // Current page
  const accessToken = "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"; // Your Personal Access Token

  // Function to show/hide loader
  const toggleLoader = (isLoading) => {
    loader.style.display = isLoading ? "block" : "none";
  };

  // Function to display user details
  const displayUserDetails = (user) => {
    const userImage = document.getElementById("userImage");
    const userName = document.getElementById("userName");
    const userDescription = document.getElementById("userDescription");
    const userLocation = document.getElementById("userLocation");
    const userTwitter = document.getElementById("userTwitter");
    const userGitHub = document.getElementById("userGitHub");

    // Update user details
    userImage.src = user.avatar_url;
    userName.textContent = user.name || "Name not available";
    userDescription.textContent = user.bio || "No description available.";
    userLocation.textContent = `Location: ${user.location || "Not specified"}`;
    userTwitter.textContent = `Twitter: ${
      user.twitter_username || "Not specified"
    }`;
    userGitHub.textContent = `GitHub: ${user.login}`;
  };

  // Function to display repositories
  const displayRepositories = (repositories) => {
    // Clear previous content
    repoListContainer.innerHTML = "";

    repositories.forEach((repo) => {
      // Create a card for each repository
      const card = document.createElement("div");
      card.className = "card mb-3";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const repoName = document.createElement("h5");
      repoName.className = "card-title";
      repoName.textContent = repo.name;

      const repoDescription = document.createElement("p");
      repoDescription.className = "card-text";
      repoDescription.textContent =
        repo.description || "No description available.";

      // Display topics
      const topics = repo.topics || [];
      const topicsContainer = document.createElement("div");
      topicsContainer.className = "topics";
      topicsContainer.innerHTML = topics
        .map((topic) => `<span class="badge bg-secondary">${topic}</span>`)
        .join("");

      cardBody.appendChild(repoName);
      cardBody.appendChild(repoDescription);
      cardBody.appendChild(topicsContainer);
      card.appendChild(cardBody);

      repoListContainer.appendChild(card);
    });

    // Add pagination
    addPagination(repositories.length);
  };

  // Function to add pagination controls
  const addPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    // Previous button
    const previousLi = document.createElement("li");
    previousLi.className = "page-item";
    const previousA = document.createElement("a");
    previousA.className = "page-link";
    previousA.href = "#";
    previousA.textContent = "Previous";
    previousA.addEventListener("click", () => {
      if (currentPage > 1) {
        fetchUserAndRepositories(usernameInput.value, currentPage - 1);
      }
    });
    previousLi.appendChild(previousA);
    paginationContainer.appendChild(previousLi);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "page-item";
      const a = document.createElement("a");
      a.className = "page-link";
      a.href = "#";
      a.textContent = i;

      a.addEventListener("click", () => {
        fetchUserAndRepositories(usernameInput.value, i);
      });

      li.appendChild(a);
      paginationContainer.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    const nextA = document.createElement("a");
    nextA.className = "page-link";
    nextA.href = "#";
    nextA.textContent = "Next";
    nextA.addEventListener("click", () => {
      if (currentPage < totalPages) {
        fetchUserAndRepositories(usernameInput.value, currentPage + 1);
      }
    });
    nextLi.appendChild(nextA);
    paginationContainer.appendChild(nextLi);
  };

  // Function to fetch user details and repositories
  const fetchUserAndRepositories = (username, page = 1) => {
    const userUrl = `${apiUrl}${username}`;
    const reposUrl = `${apiUrl}${username}/repos?page=${page}&per_page=${itemsPerPage}`;

    toggleLoader(true);
    currentPage = page;

    // Fetch user details
    fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        // Display user details
        displayUserDetails(userData);

        // Fetch repositories
        fetch(reposUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((repoData) => {
            toggleLoader(false);
            displayRepositories(repoData);
          })
          .catch((error) => {
            toggleLoader(false);
            console.error("Error fetching repositories:", error);
          });
      })
      .catch((error) => {
        toggleLoader(false);
        console.error("Error fetching user details:", error);
      });
  };

  // Event listener for search input
  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    if (username !== "") {
      fetchUserAndRepositories(username);
    }
  });

  // Event listener for items per page selection
  itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value, 10);
    itemsPerPageLabel.textContent = `Items per page: ${itemsPerPage}`;
    fetchUserAndRepositories(usernameInput.value);
  });

  // Initial load
  fetchUserAndRepositories("johnpapa");
});
