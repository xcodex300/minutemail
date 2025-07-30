function generateEmail() {
  const random = Math.random().toString(36).substring(2, 10);
  const domain = "1secmail.com";
  const email = `${random}@${domain}`;
  document.getElementById("email").value = email;

  // Reset inbox
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "<li>Checking for new messages...</li>";

  // Simulate API check (placeholder for real integration)
  setTimeout(() => {
    messageList.innerHTML = `
      <li><strong>From:</strong> test@example.com<br><strong>Subject:</strong> Welcome to MinuteMail</li>
    `;
  }, 2000);
}