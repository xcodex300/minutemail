let email = "";
let timer = 600;
let interval;

document.getElementById("generate").addEventListener("click", () => {
  const login = Math.random().toString(36).substring(2, 11);
  const domain = "1secmail.com";
  email = login + "@" + domain;

  document.getElementById("email").textContent = email;
  document.getElementById("emailBox").classList.remove("hidden");

  clearInterval(interval);
  timer = 600;
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      document.getElementById("inbox").innerHTML = "<li>Email expired.</li>";
    }
  }, 1000);

  fetchInbox();
  setInterval(fetchInbox, 5000);
});

document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(email);
  alert("Email copied!");
});

function fetchInbox() {
  if (!email) return;
  const [login, domain] = email.split("@");
  fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    .then(res => res.json())
    .then(messages => {
      const inbox = document.getElementById("inbox");
      inbox.innerHTML = "";
      if (messages.length === 0) {
        inbox.innerHTML = "<li>No messages yet.</li>";
        return;
      }
      messages.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = `${msg.from} - ${msg.subject}`;
        li.onclick = () => readMessage(login, domain, msg.id);
        inbox.appendChild(li);
      });
    });
}

function readMessage(login, domain, id) {
  fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`)
    .then(res => res.json())
    .then(msg => {
      alert(`From: ${msg.from}\nSubject: ${msg.subject}\n\n${msg.textBody}`);
    });
}
