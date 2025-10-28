import { request } from "http";

const options = new URL("http://localhost:8080");

request(options, (response) => {
  let body = "";
  response.on("data", (chunk) => (body += chunk));
  response.on("end", () => {
    console.log(body);
  });
}).end();

/* just simulating the request from the front end using the request object */
