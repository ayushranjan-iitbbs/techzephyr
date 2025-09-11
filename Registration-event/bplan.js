document.querySelector(".registration-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  const messageBox = document.getElementById("message");

  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const payload = {
    teamName: data.teamName,
    teamLeaderName: data.teamLeaderName,
    email: data.email,
    whatsappNumber: data.whatsappNumber,
    college: data.college,
    teamMember2: data.teamMember2,
    teamMember3: data.teamMember3 || "N/A",
    teamMember4: data.teamMember4 || "N/A"
  };

  const sheetURL =
    "https://script.google.com/macros/s/AKfycbzGZTOH-7JyLl_cPy4NVtfXHMc_5nqsTwlZZWP9JBOfLuS7TbHNxt9BFBoIZAd028XUEA/exec";

  try {
    const response = await fetch(sheetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
    });

    if (response.ok) {
      messageBox.innerHTML = `
        <div style="background:#e6f9ec; color:#1a7f37; padding:1rem; border-radius:12px;">
          🎉 <b>Congratulations!</b> You have successfully registered for 
          <b>B-Plan Competition</b> at Tech Zephyr 2025!
        </div>
      `;
      messageBox.className = "message success";
      form.reset();
    } else {
      throw new Error("Submission failed. Please try again.");
    }
  } catch (error) {
    messageBox.innerHTML = `
      <div style="background:#fdecea; color:#c91d1d; padding:1rem; border-radius:12px;">
        ❌ <b>Error:</b> Could not submit. Please check your connection.
      </div>
    `;
    messageBox.className = "message error";
  } finally {
    messageBox.style.display = "block";
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 7000);

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
