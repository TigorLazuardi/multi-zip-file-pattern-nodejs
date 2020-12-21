import archiver from "archiver";
import fs from "fs";

export default function archiving() {
    const archive = archiver("zip");
    const streams = [fs.createReadStream("aaa.txt"), fs.createReadStream("bbb.txt"), fs.createReadStream("ccc.txt")];

    streams.forEach((y, i) => {
        archive.append(y, { name: `name${i}.txt` });
    });

    archive.on("finish", () => console.log("done archiving"));

    archive
        .finalize()
        .then(() => console.log("done finalizing"))
        .catch(console.error);
    return archive;
}
