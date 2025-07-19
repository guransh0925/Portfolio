document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    if (box.classList.contains("non-clickable")) return;

    const closeBtn = box.querySelector(".close-btn");
    const brief = box.querySelector('[data-content="brief"]');
    const full = box.querySelector('[data-content="full"]');

    if (closeBtn) closeBtn.style.display = "none";

    box.addEventListener("click", (e) => {
      if (
        box.classList.contains("expanded") ||
        e.target.classList.contains("close-btn")
      )
        return;

      const rect = box.getBoundingClientRect();

      box.style.setProperty("--start-top", `${rect.top}px`);
  box.style.setProperty("--start-left", `${rect.left}px`);
  box.style.setProperty("--start-width", `${rect.width}px`);
  box.style.setProperty("--start-height", `${rect.height}px`);

      box.classList.add("expanding");

      requestAnimationFrame(() => {
        box.classList.add("expanded");
        document.body.classList.add("expanded-mode");
        if (brief && full) {
          brief.style.display = "none";
          full.style.display = "block";
        }
        if (closeBtn) closeBtn.style.display = "block";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (brief && full) {
          brief.style.display = "block";
          full.style.display = "none";
        }

        box.classList.remove("expanded");
        if (closeBtn) closeBtn.style.display = "none";

        setTimeout(() => {
          box.classList.remove("expanding");
          document.body.classList.remove("expanded-mode");
        }, 400);
      });
    }
  });

  // ✅ ADDING SKILLS TAB FUNCTIONALITY
  const tabButtons = document.querySelectorAll(".skills-tabs .tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-tab");

      // Remove active from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active to clicked tab and its content
      button.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

  const photoBox = document.querySelector(".animate-photo");
  // Hide all boxes except the photo box
  boxes.forEach(box => {
    if (box === photoBox) {
      box.classList.add("animating-photo"); // Add the animation class
    } else {
      box.classList.add("hidden"); // Hide other boxes
    }
    
  });
  // Start the animation
  setTimeout(() => {
    photoBox.classList.add("scale-down"); // Scale down the photo box
    
    // Show other boxes after the animation
    // After scaling down, transition to the grid position
    setTimeout(() => {
      photoBox.classList.add("hidden"); // Add the position class to move to grid position


    setTimeout(() => {
      photoBox.classList.remove("animating-photo"); // Remove the animation class
      // Show all other boxes except the photo box
      boxes.forEach(box => {
        if (!box.classList.contains("photo")) {
          box.classList.remove("hidden");
          photoBox.classList.remove("hidden");
        }
      });
  
      photoBox.style.position = "relative"; // Reset position to relative
    }, 1000); // Match this duration with the scale down duration
  }, 2000); // Delay before starting the scale down
})
});
