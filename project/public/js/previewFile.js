document.getElementById("fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
        const text = evt.target.result;
        const rows = text.split("\n").map(r => r.trim()).filter(Boolean);

        let html = `
            <table class="table">
                <thead><tr><th>Email Preview</th></tr><thead>
                <tbody>
        `;

        rows.slice(1,10).forEach(row => {
            html += `<tr><td>${row.substring(0,300)}...</td></tr>`;
        });

        html += `<tbody></table>`

        document.getElementById("preview").innerHTML = html;
    };

    reader.readAsText(file);
});