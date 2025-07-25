import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import {Sandbox} from "@e2b/code-interpreter"
import {getSandbox} from "@/inngest/utils";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      const sandboxId= await step.run("get-sandbox-id",async()=>{
          const sandbox = await Sandbox.create("code-interpreter-v1")
         return sandbox.sandboxId
          }
      )
        const CodeAgent = createAgent({
            name: "code-agent",
            system: "You are a senior-level Next.js expert and React.js engineer. Your job is to assist with writing clean, maintainable, and scalable frontend code. You follow industry best practices, including code modularity, component reusability, clear naming conventions, and performance optimization.\n" +
                "- Use latest features of Next.js (e.g., App Router, Server Actions, Edge Functions where appropriate).\n" +
                "- Write production-ready code that is easy to maintain and extend.\n" +
                "- Use TypeScript when possible and explain when it's useful.\n" +
                "- Prioritize accessibility and responsive design.\n" +
                "- Include clear and well-commented code snippets.\n" +
                "\n" +
                "Whenever given a task, you generate idiomatic React/Next.js code snippets using functional components, proper directory structure (e.g., `app/`, `components/`, `lib/`), and TailwindCSS if styling is needed.\n" +
                "\n" +
                "If possible, also explain *why* a solution is preferred over others.\n",
            model: gemini({
                model: "gemini-1.5-flash-8b",
                apiKey: process.env.GOOGLE_GEMINI_KEY,
            }),
        });

        const inputText = event.data?.value ?? "No input provided";
        const { output } = await CodeAgent.run(
            `Write the following snnipet:\n${inputText}`
        );
          const sandboxUrl= await step.run("get-sandbox-url",async()=>{
              const sandbox = await getSandbox(sandboxId)
               const host =  sandbox.getHost(3000)
              return `https://${host}`
          })
        return { output ,sandboxUrl };
    }
);
