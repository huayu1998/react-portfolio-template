import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { syncMockBlog } from "../../../utils/syncMockBlog";

export default function handler(req, res) {
  const postsfolder = join(process.cwd(), `/_posts/`);
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      const { date, title, tagline, preview, image } = req.body.variables;
      fs.writeFile(
        postsfolder + req.body.slug + ".md",
        matter.stringify(req.body.content, {
          date,
          title,
          tagline,
          preview,
          image,
        }),
        "utf-8",
        (err) => {
          if (err) console.log(err);
          else syncMockBlog(); // Re-reads all posts from _posts/ and rewrites __mocks__/mockBlog.js when a blog post is edited.
        }
      );
      res.status(200).json({ status: "DONE" });
    } else {
      res
        .status(200)
        .json({ name: "This route works in development mode only" });
    }
  }
}
