<img width="700" alt="new_img" src="https://github.com/user-attachments/assets/39d7a7ce-bec8-41c9-99a7-d09ea3e644f0" />

# Multimodal GenAI Software Development User Study Tasks

This project is adapted from an open source portfolio template for use as a study exercise. Participants will run the application, implement a feature, write a test case, and locate and fix a bug. The original project has been extended with a testing infrastructure using the [Jest](https://jestjs.io/) framework alongside [React Testing Library](https://testing-library.com/) and [jest-environment-jsdom](https://github.com/jsdom/jsdom) — including test files (`__tests__/`), mock data (`__mocks__/`), and Jest configuration — to support the testing tasks in this study.

<img width="1167" height="247" alt="no-results" src="https://github.com/user-attachments/assets/b2d7ea88-1e92-4aef-b2e4-0226d71d85f6" />


# What Is This Application?

This is a personal portfolio web application that allows users to showcase their work projects, services, blog posts, and resume, etc. It includes a markdown-based blog system where posts can be created, read, update, and deleted (Blog CRUD) through a development UI. Other features include the following:

- Modern Full App Stack (Next.js + TailwindCSS)
- Minimal Design
- Easy To Browse
- Easy To Customize your details With GUI
- Light/Dark Mode

# Please complete the following steps before the tasks

---

## Step 1 - Prerequisites — Node Version Manager (nvm)

> **Step 1.1** - Check nvm installed or not

This project requires a specific Node.js version managed via [nvm](https://github.com/nvm-sh/nvm). First check whether nvm is already installed by entering the following command line in the terminal:

```bash
nvm -v
```

If a version number is printed (e.g. `0.39.7`), nvm is installed — skip to the step 1.2 below. If you get `command not found`, install it using the command for your OS:

**macOS / Linux**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Then restart your terminal and verify with `nvm -v`.

**Windows**

Download and run the latest installer from [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases) (`nvm-setup.exe`), then restart your terminal and verify with `nvm -v`.

> **Step 1.2** - Install and use required Node.js version

Once nvm is installed, use the `.nvmrc` file in this repo to install and activate the required Node.js version automatically:

```bash
# Install the required Node version (20.19.0) and switch to it
nvm install
nvm use 20
```

Verify the active versions match what the project expects:

```bash
node -v   # should print v20.19.0
npm -v    # should print v10.8.2
```

## Step 2 - Installation

> **Node version:** 20.19.0 — managed via nvm (see Prerequisites above).

```bash
# Clone the repository
git clone <repo-url>
cd react-portfolio-template

# Use the following command to install packages and dependencies
npm install --legacy-peer-deps
```

## Step 3 - Running the Application

```bash
# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

# Prepare to Get Started with Study Tasks

Before starting these tasks, please note the following:

* You will complete the programming tasks **with the** ***use of Google AI Studio along with the features: text input-output, file upload, audio and stream live***.
* You are free to **use any browser to search webs for help or solutions**.
* Read all task instructions aloud completely before starting the task.
* Keep your focus on meeting the requirements of the current task. Do not work ahead.

**Do you have any questions before you begin?**

---

# Task 1 — Implement the Blog Search Feature

***Please take up to 1.5 minutes to read these task instructions aloud.***

The blog page currently displays all posts without any filtering capability. Your task is to implement a keyword-based search feature that allows users to filter blog posts based on keywords found in either the title or the preview content.

The search feature must meet the following requirements:

* When a user enters one or more keywords that exist in the title or preview content of any blog post, the system should return all blog posts containing those keywords.
<img width="250" alt="title" src="https://github.com/user-attachments/assets/80f5f353-8f90-4fdd-b7d7-3fbba1267050" />
<img width="450" alt="title-preview" src="https://github.com/user-attachments/assets/889d9d51-c7c5-42da-a61c-fa9e5ae15938" />

* When a user enters keywords that do not match any blog post title or preview content, the system should display the message: "No blogs matched your search."
<img width="600" alt="no-results" src="https://github.com/user-attachments/assets/373bf9d0-f167-4a0f-95cf-224692c63af6" />

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
git commit -m "Task 1 - [Your Name]"
git push
```

---

# Task 2 — Write a Test Case

**Please take up to 1.5 minutes to read these task instructions aloud.**

#### File to modify:

- `pages/blog/index.js` — write and implement the third test case

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
git commit -m "Task 2 - [Your Name]"
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
git commit -m "Task 3 - [Your Name]"
git push
```

---

#### Main Tech Stack Used

- | Framework | [Next.js](https://nextjs.org/) |
- | Styling | [TailwindCSS](https://tailwindcss.com/) |
- | Testing | [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), [jest-environment-jsdom](https://github.com/jsdom/jsdom) |

## Credits

This project is adapted from the open source [React Portfolio Template](https://github.com/chetanverma16/react-portfolio-template) originally created by [Chetan Verma](https://www.chetanverma.com/).

- GitHub: [@chetanverma16](https://github.com/chetanverma16)
- Live demo: [react-portfolio-template.netlify.app](https://react-portfolio-template.netlify.app)
- Original tutorial: [How to build a portfolio website using Next.js and TailwindCSS](https://www.chetanverma.com/blog/how-to-build-a-portfolio-website-using-nextjs-and-tailwindcss)
