// Create a logo element using an h2 tag
const logo = document.createElement("h2");
logo.textContent = "Game Selection";
logo.classList.add("logo");

// Create the container div
const container = document.createElement("div");
container.classList.add("container"); // Add a class to the container

// Create the first hyperlink button
const button1 = document.createElement("a");
button1.href = "file:///Users/24LP2617/Desktop/Games-dom-js/index.html"; // Set the link for the first button
button1.classList.add("button1");
// Create the second hyperlink button
const button2 = document.createElement("a");
button2.href = "https://example.com/page2"; // Set the link for the second button
button2.classList.add("button2");
// Append links to the container
container.appendChild(button1);
container.appendChild(button2);
// Append the logo and container to the document body
document.body.appendChild(logo); // Add the logo first
document.body.appendChild(container); // Add the container below the logo

