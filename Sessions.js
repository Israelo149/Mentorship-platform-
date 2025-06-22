const sessions = [
  { mentor: "Angela", time: "2025-06-22 3:00PM", feedback: null },
  { mentor: "Dr. Chuka", time: "2025-06-25 1:00PM", feedback: "Very helpful!" }
];

const list = document.getElementById('sessions-list');

sessions.forEach(session => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${session.mentor}</strong> - ${session.time}
    ${session.feedback ? `<br><em>Feedback:</em> ${session.feedback}` : ''}
  `;
  list.appendChild(li);
});