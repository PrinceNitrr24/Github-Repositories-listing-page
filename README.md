# Github-Repositories-listing-page
GitHub Viewer: Explore repositories effortlessly with this HTML, CSS, and JavaScript web app. Features paginated listing, loaders for API calls, and an optional search bar. Utilizes Bootstrap and jQuery for simplicity. Clone, open index.html, and start exploring GitHub repositories!

#Overview
This project is a simple web application that displays the public GitHub repositories of a specific user. It allows users to search for a GitHub username, view user details, and paginate through the repositories.

#Features
User Search: Enter a GitHub username to view repositories.
User Details: Displays user details, including name, bio, location, Twitter handle, and GitHub username.
Repository List: Shows repositories with names, descriptions, and topics.
Pagination: Navigate through repositories with server-side pagination.
Items per Page: Choose the number of repositories displayed per page (10, 20, 50, or 100).
Loader: Displays a loader during API calls.

#Requirements
Bootstrap (5.3.0) - Used for styling and responsive design.
GitHub REST API - Used for fetching user details and repositories.

#How to Use
Open index.html in a web browser.
Enter a GitHub username in the search bar.
View user details and repositories.
Use pagination controls to navigate through repositories.
Choose the number of items per page from the dropdown.

#Assumptions
The GitHub API token is provided and used for authentication in script.js.
The server-side pagination assumes the default of 10 repositories per page.
Loader visibility is toggled during API calls.

#Contributions
Contributions are welcome! Feel free to fork and submit a pull request for any improvements or bug fixes.
