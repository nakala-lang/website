import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

export function getSortedDocsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData: Array<{
    id: string;
    date: string;
    title: string;
    [k: string]: any;
  }> = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult: any = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allDocsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const getAllDocIds = (): Array<{ params: { id: string; }}> => {
  const fileNames = fs.readdirSync(docsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export const getDocData = (id: string): {
  title: string;
  id: string;
  date: string;
}=> {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult: any = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
