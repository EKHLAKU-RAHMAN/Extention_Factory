// import fs from "fs";
// import archiver from "archiver";
// import path from "path";

// export const createZip = async (folderPath) => {
//   const zipPath = folderPath + ".zip";

//   const output = fs.createWriteStream(zipPath);
//   const archive = archiver("zip");

//   archive.pipe(output);
//   archive.directory(folderPath, false);
//   await archive.finalize();

//   return zipPath;
// };



import fs from "fs";
import archiver from "archiver";

export const createZip = (folderPath) => {
  return new Promise((resolve, reject) => {
    const zipPath = folderPath + ".zip";

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      console.log("ZIP created:", zipPath);
      resolve(zipPath);
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
};