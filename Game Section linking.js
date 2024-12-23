// Create the container div
const container = document.createElement("div");
container.classList.add("container"); // Add a class to the container

// Create the first button
const button1 = document.createElement("button");
button1.textContent = "Button 1"; // Set text for the first button
button1.classList.add("button1"); // Add a class to the button

// Create the second button
const button2 = document.createElement("button");
button2.textContent = "Button 2"; // Set text for the second button
button2.classList.add("button2"); // Add a class to the button

// Append buttons to the container
container.appendChild(button1);
container.appendChild(button2);

// Append the container to the document body
document.body.appendChild(container);
