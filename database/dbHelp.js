//connection to db
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message)
    }
})

db.serialize(() => {
    db.run(`
    INSERT INTO event (title, description, event_date, organizer) VALUES
    ('Tech Conference 2024', 'A conference for tech enthusiasts featuring the latest in technology, networking opportunities, and keynote speakers from top tech companies.', '2024-09-15', 'TechWorld Inc.'),
    ('Music Festival 2024', 'An outdoor music festival with performances from top artists, food trucks, and fun activities for all ages.', '2024-07-20', 'MusicFest Ltd.'),
    ('Startup Pitch Night', 'An evening where aspiring entrepreneurs pitch their startup ideas to a panel of investors and receive feedback and potential funding.', '2024-06-10', 'Startup Hub'),
    ('Art Expo 2024', 'A showcase of contemporary art from emerging artists, with galleries, workshops, and networking opportunities.', '2024-08-05', 'ArtConnect'),
    ('Health and Wellness Fair', 'A fair promoting health and wellness, featuring fitness classes, health screenings, and talks from wellness experts.', '2024-05-25', 'HealthyLiving Association'),
    ('Coding Bootcamp', 'An intensive coding bootcamp where participants learn the fundamentals of web development and build their own projects.', '2024-11-01', 'CodeAcademy'),
    ('Business Networking Breakfast', 'A morning networking event for business professionals to connect, share ideas, and explore partnership opportunities.', '2024-10-10', 'Business Connect'),
    ('Environmental Sustainability Workshop', 'A workshop focused on sustainability practices, featuring talks from environmental experts and hands-on activities.', '2024-06-30', 'GreenEarth Organization'),
    ('Digital Marketing Summit', 'A summit for digital marketing professionals, with sessions on the latest trends, tools, and strategies in digital marketing.', '2024-09-05', 'MarketMasters'),
    ('Food and Wine Festival', 'A festival celebrating gourmet food and fine wines, with tastings, cooking demonstrations, and live entertainment.', '2024-08-25', 'Gourmet Experiences')
  `, (err) => {
        if (err) {
            console.error('Error seeding database:', err);
        } else {
            console.log('Database seeded successfully.');
        }
    });
});
