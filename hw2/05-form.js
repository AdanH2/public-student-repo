document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  
  const modalHTML = `
        <div class="modal fade" id="resultModal" tabindex="-1" aria-labelledby="resultModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="resultModalLabel">Form Submission Results</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <!-- Form data will be displayed here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const bootstrapScript = document.createElement("script");
  bootstrapScript.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
  document.head.appendChild(bootstrapScript);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const registrationStatus =
      document.getElementById("registrationStatus").value;
    const anythingElse = document.getElementById("else").value;

    const courses = [];
    const checkboxes = document.querySelectorAll(
      'input[name="newsletterOptions"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      const label = document.querySelector(
        `label[for="${checkbox.id}"]`
      ).textContent;
      courses.push(label);
    });

    let modalContent = '<div class="row">';

    modalContent += `
            <div class="col-12 mb-3">
                <strong>Full Name:</strong> ${fullName || "Not provided"}
            </div>
            <div class="col-12 mb-3">
                <strong>Email:</strong> ${email || "Not provided"}
            </div>
            <div class="col-12 mb-3">
                <strong>Registration Status:</strong> ${
                  registrationStatus === "Choose an option"
                    ? "Not selected"
                    : registrationStatus
                }
            </div>
            <div class="col-12 mb-3">
                <strong>Courses Taken:</strong> ${
                  courses.length > 0 ? courses.join(", ") : "None selected"
                }
            </div>
            <div class="col-12 mb-3">
                <strong>Anything Else:</strong> ${
                  anythingElse || "Not provided"
                }
            </div>
        `;

    modalContent += "</div>";

    document.getElementById("modalBody").innerHTML = modalContent;

    const modal = new bootstrap.Modal(document.getElementById("resultModal"));
    modal.show();
  });
});
