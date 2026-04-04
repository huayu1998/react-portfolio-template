import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export function syncMockBlog() {
  const postsFolder = join(process.cwd(), "_posts");
  const mocksPath = join(process.cwd(), "__mocks__", "mockBlog.js");

  const files = fs.readdirSync(postsFolder);
  const blogs = files
    .map((file) => {
      const filePath = join(postsFolder, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return { slug: file.replace(/\.md$/, ""), ...data, content };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const mockBlog = blogs[0] || null;

  const output =
    `export const mockBlogs = ${JSON.stringify(blogs, null, 2)};\n\n` +
    `export const mockBlog = ${JSON.stringify(mockBlog, null, 2)};\n`;

  fs.writeFileSync(mocksPath, output, "utf8");
}
