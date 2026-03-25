import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const createFiles = async (data) => {
  const folderName = `extension-${uuidv4()}`;
  const folderPath = path.join("temp", folderName);

  fs.mkdirSync(folderPath, { recursive: true });

  fs.writeFileSync(path.join(folderPath, "manifest.json"), data.manifest);
  fs.writeFileSync(path.join(folderPath, "content.js"), data.content);
  fs.writeFileSync(path.join(folderPath, "popup.html"), data.popup_html);
  fs.writeFileSync(path.join(folderPath, "popup.js"), data.popup_js);

  return folderPath;
};