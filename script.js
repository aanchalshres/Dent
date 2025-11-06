let selectedCategory = 'all';

// Smooth scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Scroll animation
const faders = document.querySelectorAll('.fade-in');

function checkVisibility() {
    faders.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Destination Search Filter
function filterDestinations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('#destinationCards .card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category');

        const matchesSearch = title.includes(input) || description.includes(input);
        const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);

        card.style.display = (matchesSearch && matchesCategory) ? "block" : "none";
    });
}

// Category Filter
function filterByCategory(category) {
    selectedCategory = category;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    filterDestinations();
}



// Plan Trip form submission handling
document.getElementById('tripForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const destination = document.getElementById('destination').value;
    const notes = document.getElementById('notes').value;

    // Simple validation
    if(!name || !email || !startDate || !endDate || !destination) {
        alert("Please fill all required fields!");
        return;
    }

    // Display confirmation
    const confirmation = document.getElementById('confirmation');
    confirmation.innerHTML = `
        Thank you, <strong>${name}</strong>!<br>
        Your trip to <strong>${destination}</strong> from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been recorded.
    `;

    // Reset form
    this.reset();
});

// Experience Modal Functionality


experienceCards.forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.dataset.image;
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        experienceModal.style.display = 'block';
    });
});

modalClose.addEventListener('click', () => {
    experienceModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === experienceModal) {
        experienceModal.style.display = 'none';
    }
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active'); // Highlight current page
    } else {
        link.classList.remove('active'); // Remove highlight from other links
    }
});

// Modal functionality
const cards = document.querySelectorAll('.heritage-card');
const modal = document.getElementById('heritage-modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.modal-description');
const closeBtn = document.querySelector('.close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = card.getAttribute('data-image');
    modalTitle.textContent = card.getAttribute('data-title');
    modalDesc.textContent = card.getAttribute('data-description');
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.heritage-card');
    const modal = document.getElementById('heritage-modal');
    const modalImg = document.querySelector('.modal-img');
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-description');
    const closeBtn = document.querySelector('.close');

    // Debug check
    console.log("Cards found:", cards.length);
    console.log("Modal:", modal);
    console.log("Close button:", closeBtn);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            console.log("Card clicked:", card);
            modal.style.display = 'flex';
            modalImg.src = card.getAttribute('data-image');
            modalTitle.textContent = card.getAttribute('data-title');
            modalDesc.textContent = card.getAttribute('data-description');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
