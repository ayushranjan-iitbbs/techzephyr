document.getElementById("cpForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  let messageBox = document.getElementById("message");

  // Create message box dynamically if not already present
  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.id = "message";
    form.parentNode.insertBefore(messageBox, form);
  }

  // Disable button + show "Registering..."
  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzRQQMMD-cj93f9xioSv-FSY6-TvpUMFXE_ZmTbh9o2ulRePUhnBQQLNWUK1cL0Thrq/exec",
      {
        method: "POST",
        body: new URLSearchParams(data),
      }
    );

    const result = await response.json();

    if (result.result === "success") {
      messageBox.innerHTML = `
        <div style="background:#e6f9ec; color:#1a7f37; padding:1rem; border-radius:12px; position:relative;">
          <button onclick="this.parentElement.style.display='none'" 
                  style="position:absolute; top:6px; right:10px; background:none; border:none; font-size:16px; cursor:pointer;">✖</button>
          🎉 <b>Congratulations!</b> You have successfully registered for 
          <b>CP Contest</b> at Tech Zephyr 2025! Check your email for confirmation.
        </div>
      `;
      messageBox.className = "message success";
      form.reset();
    } else {
      messageBox.innerHTML = `
        <div style="background:#fdecea; color:#c91d1d; padding:1rem; border-radius:12px; position:relative;">
          <button onclick="this.parentElement.style.display='none'" 
                  style="position:absolute; top:6px; right:10px; background:none; border:none; font-size:16px; cursor:pointer;">✖</button>
          ❌ <b>Error:</b> ${result.message}
        </div>
      `;
      messageBox.className = "message error";
    }
  } catch (err) {
    messageBox.innerHTML = `
      <div style="background:#fdecea; color:#c91d1d; padding:1rem; border-radius:12px; position:relative;">
        <button onclick="this.parentElement.style.display='none'" 
                style="position:absolute; top:6px; right:10px; background:none; border:none; font-size:16px; cursor:pointer;">✖</button>
        ⚠️ <b>Network error:</b> ${err.message}
      </div>
    `;
    messageBox.className = "message error";
  } finally {
    // Show message box
    messageBox.style.display = "block";

    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
