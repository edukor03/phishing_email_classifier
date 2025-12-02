document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("Please choose a file.");

    document.getElementById("preview").innerHTML = "Processing file...";

    const formData = new FormData();
    formData.append("dataset", file);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    window.location.href = "/";
});
