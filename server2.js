import { createServer } from "http";
import "dotenv/config";
const PORT = process.env.PORT;

const users = [
  {
    id: 1,
    name: "Abdul Rahman",
  },
  {
    id: 2,
    name: "Juma Kinuthia",
  },
  {
    id: 3,
    name: "Fatuma Mohammed",
  },
];

const server = createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));
    console.log(id);
    console.log(user);
    res.setHeader("Content-Type", "application/json");
    if (user) {
      res.write(JSON.stringify(user));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "user not found" }));
    }
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Route not found" }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at PORT: ${PORT}`);
});
