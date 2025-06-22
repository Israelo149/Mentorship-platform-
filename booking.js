const supabase = supabase.createClient(
  "https://jsaattygxtnhmwzbwagn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

let googleToken = null;

function signInWithGoogle() {
  const gScope = encodeURIComponent("https://www.googleapis.com/auth/calendar.events");
  const redirect = encodeURIComponent(window.location.href);
  const clientId = "YOUR_GOOGLE_CLIENT_ID"; // ⬅️ Replace with your actual client ID
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect}&response_type=token&scope=${gScope}`;
}

if (window.location.hash.includes("access_token")) {
  const params = new URLSearchParams(window.location.hash.substring(1));
  googleToken = params.get("access_token");
}

async function createGoogleEvent(token, session) {
  const event = {
    summary: "Mentorship Session",
    description: `With: ${session.menteeEmail}`,
    start: { dateTime: session.scheduled_at },
    end: {
      dateTime: new Date(
        new Date(session.scheduled_at).getTime() + 30 * 60000
      ).toISOString(),
    },
  };

  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return res.ok;
}

document.getElementById("booking-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const mentor_id = document.getElementById("mentor-id").value;
  const scheduled_at = new Date(document.getElementById("datetime").value).toISOString();

  const user = await supabase.auth.getUser();
  const mentee_id = user.data.user.id;

  const profile = await supabase.from("users").select("*").eq("id", mentee_id).single();
  const menteeEmail = profile.data?.email || "mentee@example.com";

  const { error } = await supabase.from("sessions").insert([{ mentor_id, mentee_id, scheduled_at }]);

  if (!error && googleToken) {
    await createGoogleEvent(googleToken, { scheduled_at, menteeEmail });
  }

  document.getElementById("status").textContent = error
    ? error.message
    : "Session booked and added to Google Calendar!";
});