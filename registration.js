// const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// hamburger.addEventListener("click", () => {
//   hamburger.classList.toggle("active");
//   mobileMenu.classList.toggle("active");
// });

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu.mobile .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Dynamic team member inputs
const teamStrengthSelect = document.getElementById("teamMembersStrength");
const teamMembersSection = document.getElementById("teamMembersSection");
const teamMemberInputs = document.getElementById("teamMemberInputs");

teamStrengthSelect.addEventListener("change", function () {
  const strength = parseInt(this.value);

  if (strength) {
    // Show the team members section
    teamMembersSection.classList.add("show");

    // Clear existing inputs
    teamMemberInputs.innerHTML = "";

    // Create input fields for each team member
    for (let i = 1; i <= strength; i++) {
      const memberDiv = document.createElement("div");
      memberDiv.className = "team-member-input";

      memberDiv.innerHTML = `
        <label for="teamMember${i}">${
          i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : i + "th"
        } Team Member Name *</label>
        <input type="text" id="teamMember${i}" name="teamMember${i}" required>
      `;

      teamMemberInputs.appendChild(memberDiv);
    }
  } else {
    // Hide the team members section
    teamMembersSection.classList.remove("show");
    teamMemberInputs.innerHTML = "";
  }
});

// Handle form submission
document.querySelector(".registration-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  const messageBox = document.getElementById("message");

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const strength = parseInt(data.teamMembersStrength);
  const teamMemberNames = [];

  for (let i = 1; i <= strength; i++) {
    const memberName = data[`teamMember${i}`];
    if (memberName && memberName.trim()) {
      teamMemberNames.push(memberName.trim());
    }
  }

  data.teamMemberNames = teamMemberNames.join("\n");
  for (let i = 1; i <= 5; i++) {
    delete data[`teamMember${i}`];
  }

  const payload = {
    teamName: data.teamName,
    selectedEvents: data.selectedEvents,
    teamLeaderName: data.teamLeaderName,
    email: data.email,
    whatsappNumber: data.whatsappNumber,
    college: data.college,
    teamMembersStrength: data.teamMembersStrength,
    teamMemberNames: data.teamMemberNames,
  };

  const sheetURL =
  "https://script.google.com/macros/s/AKfycbx7Imse5qYuVEJeyIxEPJ8r7npfMJhsiWTSyXBv7x4ydjAhNiXraqfJNNPuv543eoyJ/exec"   
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
        <div style="
          background: linear-gradient(135deg, #a1ffce 0%, #faffd1 100%);
          color: #1b4332;
          padding: 1rem 1.5rem;
          border-left: 6px solid #2d6a4f;
          border-radius: 12px;
          font-size: 1.1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin-top: 1rem;
        ">
          <span style="font-size: 1.8rem;">🎉</span>
          <div>
            <strong>Congratulations!</strong><br />
            You have successfully registered for <b>Tech Zephyr 2025</b>!<br />
            📩 A confirmation email has been sent to the Team Leader!
          </div>
        </div>
      `;

      form.reset();
      document.getElementById("dropdownToggle").textContent = "Select Events";
      document.getElementById("selectedEvents").value = "";
      teamMembersSection.classList.remove("show");
      teamMemberInputs.innerHTML = "";

      messageBox.classList.remove("hidden");
      setTimeout(() => {
        messageBox.classList.add("hidden");
      }, 8000);
    } else {
      throw new Error("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    messageBox.innerHTML = `
      <div style="
        background: #ffe5e5;
        color: #7b0000;
        padding: 1rem 1.5rem;
        border-left: 6px solid #ff4d4d;
        border-radius: 12px;
        font-size: 1.05rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 4px 10px rgba(255, 0, 0, 0.1);
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-top: 1rem;
      ">
        <span style="font-size: 1.6rem;">❌</span>
        <div>
          <strong>Network Error:</strong><br />
          Something went wrong. Please check your internet connection and try again.
        </div>
      </div>
    `;
  } finally {
    messageBox.style.display = "block";
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 7000);

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}); // ✅ This was missing!

// Reset form functionality
document.querySelector(".reset-btn").addEventListener("click", () => {
  teamMembersSection.classList.remove("show");
  teamMemberInputs.innerHTML = "";
  document.getElementById("dropdownToggle").textContent = "Select Events";
  document.getElementById("selectedEvents").value = "";
});

// event selection 
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const selectedEventsInput = document.getElementById("selectedEvents");

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!document.getElementById("eventDropdown").contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

dropdownMenu.addEventListener("change", () => {
  const checked = dropdownMenu.querySelectorAll("input[type='checkbox']:checked");
  const selected = Array.from(checked).map(cb => cb.value);
  selectedEventsInput.value = selected.join(", ");
  dropdownToggle.textContent = selected.length > 0 ? selected.join(", ") : "Select Events";
});
