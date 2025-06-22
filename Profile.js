const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch('users.json')
  .then(res => res.json())
  .then(users => {
    const mentor = users.find(u => u.id === id);
    if (mentor) {
      document.getElementById('profile').innerHTML = `
        <h2>${mentor.name}</h2>
        <p><strong>Skills:</strong> ${mentor.skills.join(', ')}</p>
        <p><strong>Goals:</strong> ${mentor.goals}</p>
      `;
    }
  });