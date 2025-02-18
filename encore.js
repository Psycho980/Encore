// Inject CSS
const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .bypass-trigger {
        position: fixed;
        top: 10px;
        right: 10px;
        width: 25px;
        height: 25px;
        background: #ff6b00;
        border-radius: 50%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      .bypass-container {
        position: fixed;
        top: 40px;
        right: 10px;
        background: #2d2d2d;
        padding: 8px;
        border-radius: 6px;
        border: 1px solid #ff6b00;
        z-index: 9999;
        color: white;
        width: 160px;
        font-size: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        display: none;
      }
      .bypass-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }
      .bypass-title {
        font-size: 11px;
        font-weight: bold;
        color: #ff6b00;
      }
      .bypass-minimize {
        cursor: pointer;
        color: #ff6b00;
        font-size: 16px;
        line-height: 1;
        padding: 0 5px;
      }
      .bypass-input {
        width: 100%;
        padding: 4px;
        margin: 3px 0;
        background: #1a1a1a;
        border: 1px solid #404040;
        color: white;
        border-radius: 3px;
        font-size: 11px;
      }
      .bypass-button {
        width: 100%;
        padding: 4px;
        background: linear-gradient(145deg, #ff6b00, #ff8533);
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 11px;
        margin-top: 3px;
      }
      .bypass-button:hover {
        background: linear-gradient(145deg, #ff8533, #ff6b00);
      }
      .copy-id-button {
        position: fixed;
        top: 10px;
        right: 45px;
        padding: 4px 8px;
        background: #2d2d2d;
        color: #ff6b00;
        border: 1px solid #ff6b00;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
        z-index: 9999;
      }
      .copy-id-button:hover {
        background: #ff6b00;
        color: white;
      }
    `;
    document.head.appendChild(style);
  };
  
  // Function to extract media ID
  const extractMediaId = () => {
    const images = document.querySelectorAll('.w-full.mx-auto.center img[src*="gg.asuracomic.net/storage/media/"]');
    if (images.length > 0) {
      const lastImage = images[images.length - 1];  // Get the last image
      const match = lastImage.src.match(/\/media\/(\d+)\//);  // Match the number after "/media/"
      if (match && match[1]) {
        return match[1];  // Return the captured number
      }
    }
    return null;  // Return null if no match is found
  };
  
  // Function to copy text
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const copyButton = document.querySelector('.copy-id-button');
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1000);
    });
  };
  
  // Create UI
  const createUI = () => {
    // Create copy ID button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-id-button';
    copyButton.textContent = 'Copy ID';
    copyButton.addEventListener('click', () => {
      const mediaId = extractMediaId();
      if (mediaId) {
        copyToClipboard(mediaId);
        // Auto-fill the startNumber input
        const startNumberInput = document.getElementById('startNumber');
        if (startNumberInput) {
          startNumberInput.value = mediaId;
        }
      }
    });
    
    // Create trigger button
    const trigger = document.createElement('div');
    trigger.className = 'bypass-trigger';
    trigger.innerHTML = 'Ex';
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'bypass-container';
    
    container.innerHTML = `
      <div class="bypass-header">
        <span class="bypass-title">Bypass Premium</span>
        <span class="bypass-minimize">−</span>
      </div>
      <div class="bypass-content">
        <input type="number" id="startNumber" class="bypass-input" placeholder="Start Number" value="257762">
        <input type="number" id="frameCount" class="bypass-input" placeholder="Frame Count" value="10">
        <input type="text" id="filePattern" class="bypass-input" placeholder="File Pattern" value="01-optimized.webp">
        <button id="bypassButton" class="bypass-button">Bypass</button>
      </div>
    `;
    
    document.body.appendChild(copyButton);
    document.body.appendChild(trigger);
    document.body.appendChild(container);
  
    // Toggle functionality
    trigger.addEventListener('click', () => {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });
  
    // Minimize functionality
    const minimizeBtn = container.querySelector('.bypass-minimize');
    minimizeBtn.addEventListener('click', () => {
      container.style.display = 'none';
    });
  };
  
  // Image generation function
  const generateImages = (startNumber, frameCount, filePattern) => {
    const baseUrl = "https://gg.asuracomic.net/storage/media/";
    const targetDiv = document.querySelector(".py-8.-mx-5.md\\:mx-0.flex.flex-col.items-center.justify-center");
  
    if (targetDiv) {
      targetDiv.innerHTML = "";
      const container = document.createElement("div");
      container.id = "imageContainer";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
  
      const isZeroBased = filePattern.includes("00-");
      
      for (let i = 0; i < frameCount; i++) {
        const pageNumber = isZeroBased ? i : i + 1;
        const paddedNumber = String(pageNumber).padStart(2, "0");
        
        const pattern = isZeroBased ? "00-" : "01-";
        const url = `${baseUrl}${startNumber + i}/conversions/${filePattern.replace(pattern, paddedNumber + "-")}`;
        
        const wrapper = document.createElement("div");
        wrapper.className = "w-full mx-auto center";
        const img = document.createElement("img");
        img.src = url;
        img.className = "object-cover mx-auto";
        img.alt = `chapter page ${i + 1}`;
        img.setAttribute("decoding", "async");
        img.setAttribute("fetchpriority", "high");
        img.setAttribute("loading", "eager");
        wrapper.appendChild(img);
        container.appendChild(wrapper);
      }
  
      targetDiv.appendChild(container);
    } else {
      alert("Target division not found!");
    }
  };
  
  // Initialize
  const init = () => {
    // Only run on chapter pages
    if (window.location.hostname.includes('asuracomic.net') && 
        window.location.pathname.includes('/chapter')) {
      injectStyles();
      createUI();
      
      document.getElementById('bypassButton').addEventListener('click', () => {
        const startNumber = parseInt(document.getElementById('startNumber').value);
        const frameCount = parseInt(document.getElementById('frameCount').value);
        const filePattern = document.getElementById('filePattern').value;
  
        if (!startNumber || !frameCount || !filePattern) {
          alert('Please enter valid numbers and a file pattern');
          return;
        }
  
        generateImages(startNumber, frameCount, filePattern);
      });
    }
  };
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }