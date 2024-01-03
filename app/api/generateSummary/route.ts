import { OpenAI} from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const { todos } = requestData;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.8,
            n: 1,
            stream: false,
            messages: [
                {
                    role: "system",
                    content: `When responding, Welcome the user always as Mr. Bellion and say welcome to the Jello App! Limit the response to 200 characters`,
                },
                {
                    role: "user",
                    content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress, and done, then tell the user a short inspirational quote to inspire them to have a positive productive day! Here's the data: 
            ${JSON.stringify(todos)}`,
                },
            ],
        });

        const suggestion = response.choices[0]?.message?.content || "";

        return new NextResponse(JSON.stringify({ suggestion }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch suggestion" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}