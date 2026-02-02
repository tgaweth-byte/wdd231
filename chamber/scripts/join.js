// Modal functionality for membership levels
const mlModal = document.querySelector('#mlModal');
const closeModal = document.querySelector('#closeModal');
const mltitle = document.querySelector('#mltitle');
const mldetails = document.querySelector('#mldetails');

// Close modal when X is clicked
closeModal.addEventListener('click', () => mlModal.close());

// Close modal when clicking outside
mlModal.addEventListener('click', (e) => {
  if (e.target === mlModal) {
    mlModal.close();
  }
});

// Non Profit Membership Modal
const ml1Btn = document.querySelector('#ml1Btn');
ml1Btn.addEventListener('click', () => {
  mltitle.innerHTML = "Non Profit Membership";
  mldetails.innerHTML = `
        <p><strong>Benefits include:</strong></p>
        <ul>
            <li>Access to chamber networking events</li>
            <li>Listed in our business directory</li>
            <li>Monthly newsletter subscription</li>
            <li>Community recognition</li>
        </ul>
        <p><strong>COST:</strong> Free</p>
    `;
  mlModal.showModal();
});

// Bronze Membership Modal
const ml2Btn = document.querySelector('#ml2Btn');
ml2Btn.addEventListener('click', () => {
  mltitle.innerHTML = "Bronze Membership";
  mldetails.innerHTML = `
        <p><strong>Benefits include:</strong></p>
        <ul>
            <li>All Bronze benefits</li>
            <li>Business development workshops</li>
            <li>Promotional materials at chamber office</li>
            <li>Logo on chamber website</li>
            <li>Quarterly business spotlight opportunity</li>
        </ul>
        <p><strong>COST:</strong> $200 HTG annual</p>
    `;
  mlModal.showModal();
});

// Silver Membership Modal
const ml3Btn = document.querySelector('#ml3Btn');
ml3Btn.addEventListener('click', () => {
  mltitle.innerHTML = "Silver Membership";
  mldetails.innerHTML = `
        <p><strong>Benefits include:</strong></p>
        <ul>
            <li>All Silver benefits</li>
            <li>Featured in monthly newsletter</li>
            <li>Priority event registration</li>
            <li>Social media promotion (2x per month)</li>
            <li>Access to exclusive business leads</li>
            <li>Voting rights in chamber decisions</li>
        </ul>
        <p><strong>COST:</strong> $500 HTG annual</p>
    `;
  mlModal.showModal();
});

// Gold Membership Modal
const ml4Btn = document.querySelector('#ml4Btn');
ml4Btn.addEventListener('click', () => {
  mltitle.innerHTML = "Gold Membership";
  mldetails.innerHTML = `
        <p><strong>Benefits include:</strong></p>
        <ul>
            <li>All Gold benefits</li>
            <li>Home page spotlight rotation</li>
            <li>VIP invitations to special events</li>
            <li>Speaking opportunities at chamber events</li>
            <li>Social media promotion (weekly)</li>
            <li>Dedicated business consultant support</li>
            <li>Premium booth at chamber expo</li>
            <li>Featured article in annual magazine</li>
        </ul>
        <p><strong>COST:</strong> $1,000 HTG annual</p>
    `;
  mlModal.showModal();
});

// Form submission handling with success popup
const membershipForm = document.querySelector('#membershipForm');
const successModal = document.querySelector('#successModal');
const closeSuccess = document.querySelector('#closeSuccess');

// Set timestamp when form is loaded
document.querySelector('#timestamp').value = new Date().toISOString();

// Handle form submission
membershipForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show success modal
  successModal.showModal();

  // Add animation class
  successModal.classList.add('show');

  // Wait for animation, then redirect to thank you page
  setTimeout(() => {
    // Get form data for thank you page
    const formData = new FormData(membershipForm);
    const params = new URLSearchParams(formData);
    window.location.href = `thankyou.html?${params.toString()}`;
  }, 3000); // 3 seconds delay
});

// Close success modal manually
closeSuccess.addEventListener('click', () => {
  successModal.close();
  successModal.classList.remove('show');
  // Redirect immediately
  const formData = new FormData(membershipForm);
  const params = new URLSearchParams(formData);
  window.location.href = `thankyou.html?${params.toString()}`;
});

// Close success modal when clicking outside
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) {
    closeSuccess.click();
  }
});