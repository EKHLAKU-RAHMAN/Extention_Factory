import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const createFiles = async (data, requestId = null) => {
  const folderName = requestId ? `extension-${requestId}` : `extension-${uuidv4()}`;
  const folderPath = path.join("temp", folderName);

  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp", { recursive: true });
    }

    fs.mkdirSync(folderPath, { recursive: true });

    // Validate and prepare manifest
    if (!data.manifest) {
      throw new Error("Manifest data is required");
    }

    let manifestData;
    try {
      manifestData = typeof data.manifest === "string" 
        ? data.manifest 
        : JSON.stringify(data.manifest, null, 2);
      
      // Validate manifest JSON
      JSON.parse(manifestData);
    } catch (error) {
      throw new Error("Invalid manifest JSON format");
    }

    // Write manifest.json
    fs.writeFileSync(path.join(folderPath, "manifest.json"), manifestData);

    // Write content.js (optional file)
    if (data.content) {
      fs.writeFileSync(
        path.join(folderPath, "content.js"),
        typeof data.content === "string" ? data.content : String(data.content)
      );
    }

    // Write popup.html (optional file)
    if (data.popup_html) {
      fs.writeFileSync(
        path.join(folderPath, "popup.html"),
        typeof data.popup_html === "string" ? data.popup_html : String(data.popup_html)
      );
    }

    // Write popup.js (optional file)
    if (data.popup_js) {
      fs.writeFileSync(
        path.join(folderPath, "popup.js"),
        typeof data.popup_js === "string" ? data.popup_js : String(data.popup_js)
      );
    }

    // Create a simple README for better UX
    const readmeContent = `# ${JSON.parse(manifestData).name || 'Chrome Extension'}

## Installation
1. Open Chrome and go to chrome://extensions/
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select this folder
4. The extension should now appear in your extensions list

## Files
- \`manifest.json\` - Extension configuration
- \`content.js\` - Content script (runs on web pages)
- \`popup.html\` - Extension popup interface
- \`popup.js\` - Popup script logic

## Support
Generated with Extension Factory by Zaalima Development
`;

    fs.writeFileSync(path.join(folderPath, "README.md"), readmeContent);

    console.log(`[${requestId || 'UNKNOWN'}] ✅ Files created at:`, folderPath);

    return folderPath;
  } catch (error) {
    console.error(`[${requestId || 'UNKNOWN'}] Error creating files:`, error);
    
    // Clean up on error
    try {
      if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
    } catch (cleanupError) {
      console.warn('Cleanup error:', cleanupError.message);
    }
    
    throw error;
  }
};