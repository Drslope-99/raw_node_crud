import { createServer } from "http";
import { parse } from "querystring";
import { readFileSync, readFile, rename, realpathSync } from "fs";
import formidable from "formidable";
import data from "./data.js";
import { getList } from "./list.js";
import { deleteAddress } from "./delete.js";
import { getForm } from "./form.js";
import { saveAddress } from "./save.js";

// const options = {
//   key: readFileSync("./localhost.key"),
//   cert: realpathSync("./localhost.cert"),
// };

createServer(async (request, response) => {
  const parts = request.url.split("/");
  let responseBody;

  if (parts.includes("delete")) {
    data.addresses = deleteAddress(data.addresses, parts[2]);
    redirect(response, "/");
  } else if (parts.includes("new")) {
    send(response, getForm());
  } else if (parts.includes("edit")) {
    send(response, getForm(data.addresses, parts[2]));
  } else if (
    parts.includes("save") &&
    request.method.toLocaleLowerCase() == "post"
  ) {
    const form = formidable({ allowEmptyFiles: true, minFileSize: 0 });
    let fields;
    let files;

    try {
      [fields, files] = await form.parse(request);

      //transform the fields data to normal object data
      fields = transformData(fields);

      // destructures the uploaded files object from the array
      let [uploadedFiles] = files?.upload;

      if (!uploadedFiles.originalFilename) {
        fields["file"] = "";
      } else {
        const ext = uploadedFiles.mimetype.split("/")[1];
        const filename = uploadedFiles.newFilename + "." + ext;
        rename(uploadedFiles.filepath, `public/assets/${filename}`, () => {
          fields["file"] = `/assets/${filename}`;
        });
      }
      data.addresses = saveAddress(data.addresses, fields);
      redirect(response, "/");
    } catch (error) {
      console.error(error);
      response.writeHead(error.httpCode || 400, {
        "Content-Type": "text/plain",
      });
      response.end(String(error));
      return;
    }
  } else if (request.url === "/style.css") {
    readFile("public/style.css", "utf-8", (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end();
      } else {
        response.end(data);
      }
    });
  } else if (parts.includes("assets")) {
    readFile(`public${request.url.replaceAll("%20", "")}`, (err, data) => {
      if (err) {
        response.statusCode = 404;
        return response.end();
      } else {
        response.end(data);
      }
    });
  } else {
    send(response, getList(data.addresses));
  }
}).listen(8080, () => {
  console.log("server is listening via http://localhost:8080");
});

function send(response, responseBody) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(responseBody);
}

function redirect(response, to) {
  response.writeHead(302, { location: to, "content-type": "text/plain" });
  response.end(`response redirected to ${to}`);
}

function transformData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value[0]])
  );
}
