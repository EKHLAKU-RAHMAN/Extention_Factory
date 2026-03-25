import { generateFromAI } from "../services/geminiService.js";
import { createFiles } from "../services/fileService.js";
import { createZip } from "../services/zipService.js";

export const generateExtension = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(req.body);

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 1. AI se code generate
    const aiResponse = await generateFromAI(prompt);

    // 2. Files create
    const folderPath = await createFiles(aiResponse);

    // 3. Zip generate
    const zipPath = await createZip(folderPath);

    res.download(zipPath);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating extension" });
  }
};