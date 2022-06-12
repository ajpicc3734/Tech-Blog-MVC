async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  const body = document.querySelector('input[name="blog-body"]').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-blog-form")
  .addEventListener("submit", editFormHandler);
