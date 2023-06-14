const http = require("node:http");
const url = require("url");
const fs = require("node:fs");
const path = require("path");

//lấy đường dẫn
const notePath = path.join(__dirname, "text", "note.txt");
const htmlPath = path.join(__dirname, "index.html");

const myServer = http.createServer((request, response) => {
  //lấy pathname
  const { pathname } = url.parse(request.url, true);
  //chia router
  if (pathname == "/product") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify([
        {
          id: 1,
          name: "Vu",
          address: "Nam Dinh",
        },
        {
          id: 2,
          name: "dIEP",
          address: "Giao Thuy",
        },
        {
          id: 3,
          name: "VAN",
          address: "Giao Ha",
        },
      ])
    );
  } else if (pathname == "/note") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain; charset=utf8");
    //đồng bộ
    const data = fs.readFileSync(notePath, "utf8");
    response.end(data);
  } else if (pathname == "/html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html; charset=utf8");
    //html sẽ bất đồng bộ
    fs.readFile(htmlPath, "utf8", (error, data) => {
      if (data) {
        response.end(data);
      }
    });
  } else {
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        name: "Bui Van Vu",
      })
    );
  }
});
//tạo port / tạo ip
const port = 8080;
const local = "localhost";

//run server
myServer.listen(port, local, () => {
  console.log(`Server đã được host ở http://${local}:${port}`);
});
