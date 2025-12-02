import { exec } from "child_process";
import * as results from "../services/resultService.js"
import fs from "fs";

export const Dashboard = (req, res) => {
    const data = results.getResults();
    if (!data || !data.rows) {
        return res.render("dashboard", { data });
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const totalRows = data.rows.length;
    const totalPages = Math.ceil(totalRows / perPage);

    const start = (page - 1) * perPage;
    const end = page * perPage;

    const rows = data.rows.slice(start, end);

    res.render("dashboard", {
        data: {
            ...data,
            rows,
            pagination: {
                page,
                totalPages
            }
        }
    });
};

export const Upload = (req, res) => {
    res.render("upload")
}

export const HandleUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const filePath = req.file.path;

    exec(`python python/scripts/process_file.py "${req.file.path}"`, (err, stdout) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Model error" });
        }

        const output = JSON.parse(stdout);
        results.setResults(output);

        // DELETE THE FILE HERE (AFTER PYTHON)
        fs.unlink(req.file.path, (error) => {
            if (error) console.log("File delete error:", error);
        });

        return res.json({ success: true });
    });

};

