import fastify from "fastify";
import archive from "./archive.js";
import getFiles from "./minio.js";

const app = fastify();

app.get("/", (req, res) => {
    res.headers({
        "Content-Disposition": 'attachment; filename="ddd.zip"',
        "Content-Transfer-Encoding": "binary",
        "Content-Type": "application/octet-stream",
    });
    res.raw.on("finish", () => console.log("done sending zip"));
    res.send(archive());
});

app.get("/minio", async (req, res) => {
    res.headers({
        "Content-Disposition": 'attachment; filename="ddd.zip"',
        "Content-Transfer-Encoding": "binary",
        "Content-Type": "application/octet-stream",
    });
    res.raw.on("finish", () => console.log("done sending zip minio"));
    const arc = await getFiles();
    res.send(arc);
});

app.listen(3000, () => console.log("fastify running on port 3000"));

export default app;
