export function getForm(addresses, id) {
  let address = {
    id: "",
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    country: "",
  };
  if (id) {
    address = addresses.find((adr) => adr.id === id);
  }
  const form = `<!DOCTYPE html>
<html>
<head>
<title>Address book</title>
<meta charset="utf-8">
</head>
<body>
<form action="/save" method="POST" enctype="multipart/form-data">
<input type="hidden" id="id" name="id" value="${address.id}" />

<div>
<label for="firstname">First Name</label>
<input type="text" id="firstname" name="firstname"
value="${address.firstname}" />
</div>
<div>
<label for="lastname">Last Name</label>
<input type="text" id="lastname" name="lastname"
value="${address.lastname}" />
</div>
<div>
<label for="street">Street</label>
<input type="text" id="street" name="street" value="${address.street}" />
</div>
<div>
<label for="city">City</label>
<input type="text" id="city" name="city" value="${address.city}" />
</div>
<div>
<label for="country">Country</label>
<input type="text" id="country" name="country" value="${address.country}" />
</div>
<div>
 <label for="upload">file</label>
 <input type="file" name="upload" id="upload"/>
</div>
<div>
<button type="submit">save</button>
</div>
</form>
</body>
</html>`;
  return form;
}
