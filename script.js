/**
 * VanTrack Account Deletion & Data Erasure Portal Logic
 * Compliant with Google Play Data Safety & DPDP Act 2023
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Role Guide Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const guideContents = document.querySelectorAll('.guide-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Deactivate all
      tabButtons.forEach((b) => b.classList.remove('active'));
      guideContents.forEach((c) => c.classList.remove('active'));

      // Activate selected
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.classList.add('active');
      }
    });
  });

  // 2. Web Deletion Form Handling
  const deletionForm = document.getElementById('deletion-form');
  const modal = document.getElementById('confirmation-modal');
  const modalTicketId = document.getElementById('modal-ticket-id');
  const modalSummaryContent = document.getElementById('modal-summary-content');
  const modalEmailBtn = document.getElementById('modal-email-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');

  let currentRequestData = null;

  deletionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = document.getElementById('user-role').value;
    const name = document.getElementById('user-name').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const reason = document.getElementById('deletion-reason').value;
    const confirmed = document.getElementById('confirm-deletion').checked;

    // Validation
    if (!role) {
      alert('Please select your account type.');
      document.getElementById('user-role').focus();
      return;
    }

    if (!name) {
      alert('Please enter your full registered name.');
      document.getElementById('user-name').focus();
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number without prefix.');
      document.getElementById('user-phone').focus();
      return;
    }

    if (!confirmed) {
      alert('Please check the confirmation box acknowledging permanent data erasure.');
      document.getElementById('confirm-deletion').focus();
      return;
    }

    // Generate unique reference ticket
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    const ticketId = `VT-DEL-${randomHex}`;

    currentRequestData = {
      ticketId,
      name,
      role,
      phone: `+91 ${phone}`,
      email: email || 'Not provided',
      reason,
      timestamp: new Date().toISOString()
    };

    // Populate Modal
    modalTicketId.textContent = ticketId;
    modalSummaryContent.innerHTML = `
      <div><strong>Full Name:</strong> ${escapeHtml(name)}</div>
      <div><strong>Account Role:</strong> ${escapeHtml(role)}</div>
      <div><strong>Registered Phone:</strong> +91 ${escapeHtml(phone)}</div>
      ${email ? `<div><strong>Email:</strong> ${escapeHtml(email)}</div>` : ''}
      <div><strong>Reason:</strong> ${escapeHtml(reason)}</div>
      <div style="margin-top: 6px; color: #DC2626; font-weight: 600;">Status: Pending Dispatch to Data Fiduciary</div>
    `;

    // Construct Mailto URI
    const recipient = 'grievance@vantrack.in,hostelhome@gmail.com';
    const subject = encodeURIComponent(`[VanTrack] Official Account Deletion Request - Ref ${ticketId}`);
    const body = encodeURIComponent(
      `To the Data Protection Officer / Grievance Officer,\n\n` +
      `Under Section 12 of the Digital Personal Data Protection Act, 2023 and Google Play User Data Policy, I hereby request the immediate and permanent erasure of my account and all associated personal data from VanTrack.\n\n` +
      `Request Details:\n` +
      `----------------------------------------\n` +
      `Reference ID: ${ticketId}\n` +
      `Full Name: ${name}\n` +
      `Account Role: ${role}\n` +
      `Registered Mobile: +91 ${phone}\n` +
      `Registered Email: ${email || 'N/A'}\n` +
      `Reason for Deletion: ${reason}\n` +
      `Request Timestamp: ${new Date().toLocaleString()}\n` +
      `----------------------------------------\n\n` +
      `I confirm that I am the authorized holder of this account and understand that this action is irreversible.\n\n` +
      `Regards,\n${name}`
    );

    modalEmailBtn.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open Modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });

  // Modal Copy Button
  modalCopyBtn.addEventListener('click', () => {
    if (!currentRequestData) return;

    const textToCopy = 
      `VanTrack Account Deletion Request\n` +
      `Reference ID: ${currentRequestData.ticketId}\n` +
      `Name: ${currentRequestData.name}\n` +
      `Role: ${currentRequestData.role}\n` +
      `Phone: ${currentRequestData.phone}\n` +
      `Email: ${currentRequestData.email}\n` +
      `Reason: ${currentRequestData.reason}\n` +
      `Send to: grievance@vantrack.in / hostelhome@gmail.com`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = modalCopyBtn.textContent;
      modalCopyBtn.textContent = 'Copied to Clipboard!';
      setTimeout(() => {
        modalCopyBtn.textContent = originalText;
      }, 2500);
    });
  });

  // Close modal when clicking on backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
});
