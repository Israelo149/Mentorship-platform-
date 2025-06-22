fetch('users.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('mentor-list');
    data.filter(u => u.role === 'mentor').forEach(mentor => {
      const div = document.createElement('div');
      div.className = 'mentor';
      div.innerHTML = `
        <h3>${mentor.name}</h3>
        <p><strong>Skills:</strong> ${mentor.skills.join(', ')}</p>
        <a href="mentor-profile.html?id=${mentor.id}">View Profile</a>
        <button onclick="alert('Request sent to ${mentor.name}')">Request Mentorship</button>
      `;
      list.appendChild(div);
    });
  });