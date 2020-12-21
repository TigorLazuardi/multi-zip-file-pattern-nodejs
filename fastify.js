import fastify from "fastify";
import archive from "./archive.js";

const app = fastify();

app.get("/", (req, res) => {
    res.headers({
        "Content-Disposition": 'attachment; filename="ddd.zip"',
        "Content-Transfer-Encoding": "binary",
        "Content-Type": "application/octet-stream",
    });
    res.raw.on("finish", () => console.log("done sending zip"));
    archive().pipe(res.raw);
});

app.listen(3000, () => console.log("fastify running on port 3000"));

export default app;
