document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) return alert("Please choose a file.");

    // remove preview and show loading
    const preview = document.getElementById("preview");
    preview.innerHTML = "<p>Processing file... please wait.</p>";

    // disable form button
    e.target.querySelector("button").disabled = true;

    const formData = new FormData();
    formData.append("dataset", file);

    const res = await fetch("/upload", {
        method: "POST",
        body: formData,
    });

    const result = await res.json();

    // optional delay for smoother feel
    setTimeout(() => {
        window.location.href = "/";
    }, 500); // 0.5s → perfect delay
});
