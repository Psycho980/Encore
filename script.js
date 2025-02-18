// Create the notification container
const notification = document.createElement("div");
notification.style.position = "fixed";
notification.style.bottom = "20px";
notification.style.right = "20px";
notification.style.backgroundColor = "#dcfce7"; // Tailwind: bg-green-100
notification.style.color = "#065f46"; // Tailwind: text-green-900
notification.style.borderLeft = "4px solid #22c55e"; // Tailwind: border-green-500
notification.style.padding = "10px 15px";
notification.style.borderRadius = "8px";
notification.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
notification.style.display = "flex";
notification.style.alignItems = "center";
notification.style.gap = "10px";
notification.style.zIndex = "9999";
notification.style.opacity = "0";
notification.style.transition = "opacity 0.5s ease-in-out, transform 0.2s ease-in-out";
notification.style.fontFamily = "Arial, sans-serif"; // Close to Tailwind default
notification.style.fontSize = "12px";
notification.style.fontWeight = "bold";

// Add icon (SVG)
notification.innerHTML = `
  <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-5 w-5 flex-shrink-0 text-green-600" xmlns="http://www.w3.org/2000/svg" style="color:#16a34a;">
    <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
  </svg>
  <span>Asura Scans - Desktop App<br>• Made by l3v2s</span>
`;

// Append to body
document.body.appendChild(notification);

// Show notification with slight scale effect
setTimeout(() => {
  notification.style.opacity = "1";
  notification.style.transform = "scale(1.05)";
}, 500);

// Hide notification after 5 seconds
setTimeout(() => {
  notification.style.opacity = "0";
  notification.style.transform = "scale(1)";
  setTimeout(() => notification.remove(), 500);
}, 5000);

