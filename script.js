// ===============================
// INITIAL EVENTS
// ===============================
const events = [
    {
        name: "Web Development Workshop",
        date: "2026-07-15",
        description: "Learn HTML, CSS and JavaScript basics."
    },
    {
        name: "Tech Conference",
        date: "2026-08-10",
        description: "Explore the latest trends in technology."
    },
    {
        name: "Past Networking Event",
        date: "2025-01-10",
        description: "A networking event for professionals."
    }
];

// ===============================
// DOM ELEMENTS
// ===============================
const eventList = document.getElementById("eventList");
const eventForm = document.getElementById("eventForm");
const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const eventDescription = document.getElementById("eventDescription");
const warningMessage = document.getElementById("warningMessage");
const searchInput = document.getElementById("searchInput");

// ===============================
// DISPLAY EVENTS FUNCTION
// ===============================
function displayEvents(filter = "") {

    eventList.innerHTML = "";

    const today = new Date();
    const searchText = filter.toLowerCase();

    events.forEach((event, index) => {

        // Search filter (name or date)
        const isMatch =
            event.name.toLowerCase().includes(searchText) ||
            event.date.includes(searchText);

        if (!isMatch) return;

        const eventDate = new Date(event.date);

        const card = document.createElement("div");

        // Past or Upcoming styling
        if (eventDate < today) {
            card.classList.add("event-card", "past");
        } else {
            card.classList.add("event-card", "upcoming");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>

            <button class="delete-btn" onclick="deleteEvent(${index})">
                Delete
            </button>
        `;

        eventList.appendChild(card);
    });
}

// ===============================
// SORT EVENTS BY DATE
// ===============================
function sortEvents() {
    events.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
}

// ===============================
// INITIAL LOAD
// ===============================
sortEvents();
displayEvents();

// ===============================
// ADD EVENT
// ===============================
eventForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = eventName.value.trim();
    const date = eventDate.value;
    const description = eventDescription.value.trim();

    // Validation
    if (name === "" || date === "" || description === "") {
        warningMessage.textContent = "Please fill in all fields.";
        return;
    }

    warningMessage.textContent = "";

    // Create new event
    const newEvent = {
        name,
        date,
        description
    };

    // Add + sort
    events.push(newEvent);
    sortEvents();

    // Refresh UI
    displayEvents(searchInput.value);

    // Reset form
    eventForm.reset();
});

// ===============================
// DELETE EVENT
// ===============================
function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents(searchInput.value);
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================
searchInput.addEventListener("input", function () {
    displayEvents(this.value);
});