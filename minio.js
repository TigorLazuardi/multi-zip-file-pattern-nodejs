import archiver from "archiver";
import "dotenv/config.js";
import minio from "minio";

const client = new minio.Client({
    endPoint: process.env.MINIO_END_POINT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
});

const bucket = process.env.MINIO_BUCKET;

export default async function getFiles() {
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", console.error);

    const names = await getNames();

    const promises = names.map((x) => objs(x));

    const files = await Promise.all(promises);

    files.forEach((stream, i) => archive.append(stream, { name: names[i] }));

    archive.on("end", () => {
        console.log("minio: done archiving");
    });
    archive.finalize();
    return archive;
}

function getNames() {
    return new Promise((resolve, reject) => {
        const result = [];
        const listStream = client.listObjects(process.env.MINIO_BUCKET);

        listStream.on("data", (item) => {
            result.push(item.name);
        });

        listStream.on("end", () => {
            resolve(result);
        });

        listStream.on("error", reject);
    });
}

function objs(name) {
    return new Promise((resolve, reject) => {
        client.getObject(bucket, name, (err, file) => {
            if (err) return reject(err);
            resolve(file);
        });
    });
}
