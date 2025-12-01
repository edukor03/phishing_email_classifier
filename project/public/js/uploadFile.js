document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) return alert("Please choose a file.");

    const formData = new FormData();
    formData.append("dataset", file);

    const res = await fetch("/upload", {
        method: "POST",
        body: formData,
    });

    const result = await res.json();
    console.log(`Server response: ${result}`);
})