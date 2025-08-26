// Events Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('events-container');
    
    if (eventsContainer) {
        const searchInput = document.getElementById('search-input');
        const categoryButtons = document.querySelectorAll('.category-button');
        const eventCards = document.querySelectorAll('.event-card');
        const eventDetails = document.querySelectorAll('.event-details');
        const toggleButtons = document.querySelectorAll('.toggle-details');
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', filterEvents);
        }
        
        // Category filtering
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all category buttons
                categoryButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                filterEvents();
            });
        });
        
        // Toggle event details
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const eventId = button.getAttribute('data-event');
                const detailsElement = document.getElementById(`details-${eventId}`);
                
                if (detailsElement) {
                    // Toggle details visibility
                    detailsElement.classList.toggle('active');
                    
                    // Update button text
                    if (detailsElement.classList.contains('active')) {
                        button.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                    } else {
                        button.innerHTML = 'Show Details <i class="fas fa-chevron-down"></i>';
                    }
                }
            });
        });
        
        // Filter events based on search and category
        function filterEvents() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const activeCategory = document.querySelector('.category-button.active');
            const category = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
            
            let hasVisibleEvents = false;
            
            eventCards.forEach(card => {
                const title = card.querySelector('.event-title').textContent.toLowerCase();
                const description = card.querySelector('.event-description').textContent.toLowerCase();
                const eventCategory = card.getAttribute('data-category');
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesCategory = category === 'all' || eventCategory === category;
                
                if (matchesSearch && matchesCategory) {
                    card.style.display = 'block';
                    hasVisibleEvents = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show or hide "no events found" message
            const noEventsMessage = document.getElementById('no-events-message');
            if (noEventsMessage) {
                noEventsMessage.style.display = hasVisibleEvents ? 'none' : 'block';
            }
        }
    }
});