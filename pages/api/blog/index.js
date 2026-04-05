import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";
import { syncMockBlog } from "../../../utils/syncMockBlog";

export default function handler(req, res) {
  const postsFolder = join(process.cwd(), "_posts");
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      const data = matter.stringify("# New Blog", {
        date: new Date().toISOString(),
        title: "New Blog",
        tagline: "Amazing New Blog",
        preview:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: getRandomImage(),
      });
      const newFilePath = join(postsFolder, `${uuidv4()}.md`);
      fs.writeFileSync(newFilePath, data, (err) => console.error(err));
      syncMockBlog(); // Re-reads all posts from _posts/ and rewrites __mocks__/mockBlog.js when a new blog post is created.
      res.status(200).json({ status: "CREATED" });
    }
    if (req.method === "DELETE") {
      const deleteFile = join(postsFolder, `${req.body.slug}.md`);
      fs.unlinkSync(deleteFile);
      syncMockBlog(); // Re-reads all posts from _posts/ and rewrites __mocks__/mockBlog.js when a blog post is deleted.
      res.status(200).json({ status: "DONE" });
    }
  } else {
    res.status(200).json({ name: "This route works in development mode only" });
  }
}
