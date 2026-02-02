// Get URL parameters
const myInfo = new URLSearchParams(window.location.search);

// Membership level names
const levelNames = {
  'np': 'Non Profit',
  'bronze': 'Bronze',
  'silver': 'Silver',
  'gold': 'Gold'
};

// Build the results message
const resultsDiv = document.querySelector('#results');

if (myInfo.has('first')) {
  const first = myInfo.get('first');
  const last = myInfo.get('last');
  const email = myInfo.get('email');
  const phone = myInfo.get('phone');
  const organization = myInfo.get('organization');
  const description = myInfo.get('description') || 'No description provided';
  const level = myInfo.get('level');
  const levelName = levelNames[level] || 'Standard';
  const timestamp = myInfo.get('timestamp');

  resultsDiv.innerHTML = `
        <h3>Application Summary</h3>
        <div class="info-grid">
            <div class="info-item">
                <strong>Applicant Name:</strong>
                <span>${first} ${last}</span>
            </div>
            <div class="info-item">
                <strong>Organization:</strong>
                <span>${organization}</span>
            </div>
            <div class="info-item">
                <strong>Email:</strong>
                <span>${email}</span>
            </div>
            <div class="info-item">
                <strong>Phone:</strong>
                <span>${phone}</span>
            </div>
            <div class="info-item">
                <strong>Membership Level:</strong>
                <span class="level-badge ${level}">${levelName} Member</span>
            </div>
            <div class="info-item full-width">
                <strong>Business Description:</strong>
                <span>${description}</span>
            </div>
            <div class="info-item full-width">
                <strong>Application Submitted:</strong>
                <span>${new Date(timestamp).toLocaleString()}</span>
            </div>
        </div>
    `;
} else {
  resultsDiv.innerHTML = `
        <p class="error-message">No application data found. Please submit the membership form.</p>
        <a href="join.html" class="btn-primary">Go to Application Form</a>
    `;
}