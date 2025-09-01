import http from "http";
import "dotenv/config";
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Error Locating page");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Server Error</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
