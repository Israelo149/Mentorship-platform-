const supabase = supabase.createClient("https://jsaattygxtnhmwzbwagn.supabase.co", "eyJhbGciOiJI...");

async function loadUsers() {
  const user = await supabase.auth.getUser();
  const currentId = user.data.user.id;

  const { data: currentUser } = await supabase.from("users").select("*").eq("id", currentId).single();
  if (!currentUser || currentUser.role !== "admin") {
    document.body.innerHTML = "<h2>Access Denied</h2>";
    return;
  }

  const { data, error } = await supabase.from("users").select("*");

  const list = document.getElementById("user-list");
  data.forEach(u => {
    const div = document.createElement("div");
    div.className = "mentor";
    div.innerHTML = `
      <h4>${u.name} - ${u.email}</h4>
      <p>Role: ${u.role} | Skills: ${u.skills || "N/A"}</p>
      <button onclick="promoteUser('${u.id}')">Promote</button>
      <button onclick="deleteUser('${u.id}')">Delete</button>
    `;
    list.appendChild(div);
  });
}

async function promoteUser(id) {
  await supabase.from("users").update({ role: "admin" }).eq("id", id);
  loadUsers();
}

async function deleteUser(id) {
  await supabase.from("users").delete().eq("id", id);
  loadUsers();
}

loadUsers();