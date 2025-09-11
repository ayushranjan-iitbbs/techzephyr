document.getElementById("cadathonForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("YOUR_CADATHON_SCRIPT_URL_HERE", {
      method: "POST",
      body: new URLSearchParams(data),
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("✅ Cadathon Registration Successful! Check your email.");
      this.reset();
    } else {
      alert("❌ Error: " + result.message);
    }
  } catch (err) {
    alert("⚠️ Network error: " + err.message);
  }
});
