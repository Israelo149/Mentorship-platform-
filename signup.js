const supabase = supabase.createClient("https://jsaattygxtnhmwzbwagn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzYWF0dHlneHRuaG13emJ3YWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1OTE2MDcsImV4cCI6MjA2NjE2NzYwN30.k2gbveBxgrPBh3s5hz0GQnKBKd4Q6rOxg5jBE8TGls4");

document.getElementById("signup-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    document.getElementById("message").textContent = "Signup failed: " + error.message;
  } else {
    await supabase.from("users").insert([{ id: data.user.id, name: email, role }]);
    document.getElementById("message").textContent = "Signup successful!";
  }
});