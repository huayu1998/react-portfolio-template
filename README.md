<img width="700" alt="new_img" src="https://github.com/user-attachments/assets/39d7a7ce-bec8-41c9-99a7-d09ea3e644f0" />

# Multimodal GenAI Software Development User Study Tasks

This project is adapted from an open source portfolio template for use as a study exercise.

## What Is This Application?

This is a personal portfolio, a full-stack web application using **Next.js** and **TailwindCSS**, that allows users to showcase their work projects, services, blog posts, and resume, etc. It includes a markdown-based blog system where posts can be created, read, update, and deleted (Blog CRUD) through a development UI. Other features include the following:

**A note on TailwindCSS:** TailwindCSS is a utility-first CSS framework used to style this application. Rather than writing styles in a separate CSS file, Tailwind lets you apply small, single-purpose class names directly in your HTML or JSX. For example, instead of writing `background-color: blue; padding: 8px 16px;` in a stylesheet, you would write `className="bg-blue-500 px-4 py-2"` directly on the element. If you see a `className` attribute filled with short hyphenated words in the code, that is Tailwind handling what plain CSS would normally do.

# Please complete the following steps before the tasks

---

## Step 1 - Prerequisites — Node Version Manager (nvm)

This project requires a specific Node.js version managed via [nvm](https://github.com/nvm-sh/nvm).

> **Step 1.1** - Check nvm installed or not using the following command line

```bash
nvm -v
```

If a version number is printed (e.g. `0.39.7`), nvm is installed — skip to the step 1.2 below. If you get `command not found`, install it using the command for your OS:

**macOS / Linux**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

**Windows**

Download and run the latest installer from [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases) (`nvm-setup.exe`), then restart your terminal and verify with `nvm -v`.

Then restart your terminal and verify with `nvm -v`.

> **Step 1.2** - Install and use required Node.js version

```bash
nvm install 20.19.0
nvm use 20.19.0
```

Verify the active versions match what the project expects:

```bash
node -v   # should print v20.19.0
npm -v    # should print v10.8.2
```

## Step 2 - Installation

Use the following command to install packages and dependencies.

> **Node version:** 20.19.0 — managed via nvm (see Prerequisites above).

```bash
npm install --legacy-peer-deps
```

## Step 3 - Running the Application

Use the following command to start the development server.

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

# Prepare to Get Started with Study Tasks

Before starting these tasks, please note the following:

* You will complete the programming tasks **with the** ***use of Google AI Studio along with the features: text input-output, file upload, audio and stream live***.
* You are free to  **use any browser to search the web for help or solutions, except web-based AI tools like ChatGPT or Gemini** .
* Read all task instructions aloud completely before starting the task.
* Keep your focus on meeting the requirements of the current task. Do not work ahead.

**Do you have any questions before you begin?**

---

# Task 1 — Implement the Blog Search Feature

***Please take up to 1.5 minutes to read these task instructions aloud.***

The blog page currently displays all posts without any filtering capability. Your task is to implement a keyword-based search feature that allows users to filter blog posts based on keywords found in either the title or the preview content.

<img width="400" alt="original" src="https://github.com/user-attachments/assets/ae95d9db-fdc2-47c1-8651-8dad3e05296a" />

The search feature must meet the following requirements:

* When a user enters one or more keywords that exist in the title or preview content of any blog post, the system should return all blog posts containing those keywords.

<img width="250" alt="title" src="https://github.com/user-attachments/assets/2acc7cef-96d7-4fa5-9a12-3ac0362ab27e" />

<img width="450" alt="title-preview" src="https://github.com/user-attachments/assets/c1f86810-11d4-449a-8419-e9f10854039e" />

* When a user enters keywords that do not match any blog post title or preview content, the system should display the message: "No blogs matched your search."

<img width="600" alt="no-results" src="https://github.com/user-attachments/assets/c938d0d4-e8ff-4855-9c06-829fcc9b1e40" />

#### Files to modify:

- `pages/api/blog/index.js` — add a `GET` handler that accepts a `keyword` query parameter and returns filtered blog posts
- `pages/blog/index.js` — add a search input and wire it up to the API

Look for the `TODO:` comments in both files — they describe each step you need to implement.

#### Test your results

Once implemented, run the test command to verify your solution:

```bash
npm test blog.test.tsx blog.search.test.tsx
```

All tests except the third test case in `blog.search.test.tsx` should pass.

***Let us know when you are ready to begin the task.***

#### Commit and Push Your Solution

Follow the commands to push your code for Task 1 to the repository:

```
git add .
git commit -m "Task 1"
git push
```

---

# Task 2 — Write a Test Case

**Please take up to 1.5 minutes to read these task instructions aloud.**

#### File to modify:

- `__tests__/blog.search.test.tsx` — write and implement the third test case

This file contains four test cases for the blog search feature. The first three are already implemented as references:

- **Test 1** — Renders the Blog component and verifies that all initial posts are visible in the DOM before any search is performed.
- **Test 2** — Simulates a user typing a keyword into the search box, mocks the API to return a filtered list, and verifies that only the matching post is displayed.
- **Test 4** — Simulates typing a keyword followed by clearing the input, and verifies that the full list of posts is restored after clearing.

Your task is to implement **Test 3**:

```
"shows no-results message when API returns empty array"
```

This test case is left empty with `TODO:` instruction comments. Follow the comments to implement it, using the existing test cases as reference.

#### Test your results

```bash
npm test blog.search.test.tsx
```

All four test cases should pass.

**Let us know when you are ready to begin the task.**

#### Commit and Push Your Solution

Follow the commands to push your code for Task 2 to the repository:

```
git add .
git commit -m "Task 2"
git push
```

---

# Task 3 — Locate and Fix a Bug

**Please take up to 1.5 minutes to read these task instructions aloud.**

The blog page has a **delete** feature that is currently broken. When you try to delete a blog post, the operation silently fails and the post remains in the list.

#### Steps:

1. Start the development server (`npm run dev`) if you stop the server and navigate to [http://localhost:3000/blog](http://localhost:3000/blog).
2. Try to delete any blog post using the delete button.
3. Observe that the post is **not removed** — the delete does not work as expected.
4. Open your terminal and look at the **server error log** printed by Next.js. The error message will point you to the problem.
5. Using the error log as a guide, open `pages/api/blog/index.js` and locate and fix the bug so that the delete operation works correctly.

#### Test your results

After applying the fix:

* Go back to the blog page and confirm that deleting a post now removes it from the list.
* Try to click the "Add New Post +" button at the lower right coner to add a new blog, and then delete it.

If the function work, then you're all done, congrats!

**Let us know when you are ready to begin the task.**

#### Commit and Push Your Solution

Follow the commands to push your code for Task 3 to the repository:

```
git add .
git commit -m "Task 3"
git push
```

## Credits

This project is adapted from the open source [React Portfolio Template](https://github.com/chetanverma16/react-portfolio-template) originally created by [Chetan Verma](https://www.chetanverma.com/) (GitHub: [@chetanverma16](https://github.com/chetanverma16))
