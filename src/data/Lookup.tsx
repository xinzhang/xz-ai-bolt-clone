const Lookup = {
  SUGGESTIONS: ["Create TODO App in React", "Create Budget Track App", "Create a simple calculator", "create a sign in sign up page in react", "create a gym management dashboard"],
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
  PRICING_DESC: 'Start with a free account to speed up your workflow on ...',
  PRICING_OPTIONS: [
    {
      name: 'Free',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbists and casual users for light, exploratory use',
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 1200000,
      desc: 'Designed for professionals who need to use Bolt a few times a day',
      price: 9.99
    },
    {
      name: 'Pro',
      tokens: 'Unlimited',
      value: 10000000,
      desc: 'Designed for enterprise users who need to use Bolt all the time to build their products',
      price: 29.99
    }
  ]
};

export default Lookup;
