import express from "express";
import archive from "./archive.js";

const app = express();

app.get("/", (req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=ddd.zip");
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Type", "application/octet-stream");
    archive().pipe(res);
    res.on("finish", () => console.log("done sending zip"));
});

app.listen(3000, () => {
    console.log("running on port 3000");
});
export default app;
