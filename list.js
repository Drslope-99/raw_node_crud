export function getList(addresses) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Address book</title>
        <link rel="stylesheet" href="style.css"/>
      </head>
      <body>
        <h1>Address Book</h1>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>first name</th>
              <th>last name</th> 
              <th>street</th>
              <th>city</th>
              <th>country</th>
              <th>delete</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            ${addresses.map(createRow).join("")}
          </tbody>
        </table>
        <a href="/new">Create New Record</a>
      </body>
    </html>`;
}

function createRow(address) {
  const img = address.file
    ? `<img src="${address.file}" height="20" width="20">`
    : "";

  return `<tr>
     <td>${img}</td>
     <td>${address.firstname}</td>
     <td>${address.lastname}</td>
     <td>${address.street}</td>
     <td>${address.city}</td>
     <td>${address.country}</td>
     <td><a href="/delete/${address.id}">delete</a></td>
     <td><a href="/edit/${address.id}">edit</a></td>
    </tr>`;
}
