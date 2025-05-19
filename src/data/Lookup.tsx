const Lookup = {
  SUGGESTIONS: ["Create TODO App in React", "Create Budget Track App"],
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt, run, edit, and deploy full-stack web apps.",
  SIGNIN_HEADING: "Continue With Bolt.New 2.0",
  SIGNIN_SUBHEADING: "To use Bolt you must log into an existing account",
  SIGNIN_AGREEMENT_TEXT: "By using Bolt, you agree to the collection of data",
  INPUT_PLACEHOLDER: "what do you want to build?",
  DEMO: {
    projectTitle: "React ToDo App",
    description:
      "A basic ToDo App in React with Tailwind CSS, styled-components",
    generatedFiles: [
      "/App.js",
      "/components/TodoList.js",
      "/components/TodoForm.js",
      "/components/TodoItem.js",
      "/index.css",
    ],
  },
  DEPENDANCY: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "latest",
    "react-router-dom": "latest",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
  },
  DEFAULT_FILE: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>ai generated file</title>
                  <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                  <div id="root"></div>
                </body>
              </html>`,
    },
  },
};

export default Lookup;
