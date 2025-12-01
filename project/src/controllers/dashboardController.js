import { exec } from "child_process";
import * as results from "../services/resultService.js"

export const Dashboard = (req, res) => {
    const data = results.getResults();

    res.render("dashboard", {"data": data});
}

export const Upload = (req, res) => {
    res.render("upload")
}

export const HandleUpload = (req, res) => {
    console.log("Stored file:", req.file);

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded. "});
    }

    exec(`python python/scripts/process_file.py ${req.file.path}`, (err, stdout) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error in model!");
        }

        const output = JSON.parse(stdout);

        results.setResults(output);

        return res.redirect("/dashboard");
    });
};