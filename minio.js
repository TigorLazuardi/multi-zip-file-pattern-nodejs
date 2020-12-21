import "dotenv/config.js";
import minio from "minio";

const client = new minio.Client({
    endPoint: process.env.MINIO_END_POINT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
});

const listStream = client.listObjects(process.env.MINIO_BUCKET);

const names = [];

listStream.on("data", (item) => {
    names.push(item.name);
});

listStream.on("end", () => {
    console.log(names);
});

listStream.on("error", console.error);

export {};
