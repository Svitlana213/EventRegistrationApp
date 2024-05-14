document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.registration').forEach(button => {
        button.addEventListener('click', (event) => {
            const eventId = event.target.dataset.eventId;
            window.location.href = `/registration/${eventId}`;
        });
    });

    document.querySelectorAll('.view').forEach(button => {
        button.addEventListener('click', (event) => {
            const eventId = event.target.dataset.eventId;
            window.location.href = `/participants/${eventId}`;
        });
    });
});
