import fs from "fs";
import archiver from "archiver";
import path from "path";

export const createZip = async (folderPath) => {
  const zipPath = folderPath + ".zip";

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip");

  archive.pipe(output);
  archive.directory(folderPath, false);
  await archive.finalize();

  return zipPath;
};