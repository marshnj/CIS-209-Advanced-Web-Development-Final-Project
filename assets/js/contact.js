    // =mailto:
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const fullname = name + ' ' + surname;
        const email = document.getElementById('email').value;
        const recipientEmail = "nick.marsh@comcast.net"
        const subject = document.getElementById('subject').value;
        const final_subject = "LUGX Contact Email: " + subject
        const message = document.getElementById('message').value;
        const encodedSubject = encodeURIComponent(final_subject);
        const encodedBody = encodeURIComponent(message);

        // Construct the mailto URL
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

        // Use window.location.href to open the default email client
        window.location.href = mailtoUrl;
    });