const input = document.querySelector("#urlString");
const container = document.querySelector("#url-cards-container");

const shorten = async function () {
  if (!input.value) {
    alert("input is empty");
    return;
  }

  await fetch(`/add`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      urlString: input.value,
    }),
  });
  location.reload();
};

const getAll = async function () {
  let urls = await fetch("/findAll", {
    method: "GET",
  });
  urls = await urls.json();

  const arr = [...urls];

  let newArr = arr.map(
    (data) => `
      <tr class="url-card">
        <td>${data.originalUrl}</td>
        <td><a href="/access/${data._id}" target="blank">http://localhost:3000/access/${data._id}</a></td>
        <td><button onclick="deleteU('${data._id}')">X</button></td>
      </tr>
    `
  );

  for (let i of newArr) {
    container.innerHTML += i;
  }
};

async function deleteU(id) {
  await fetch(`/remove/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

getAll();
