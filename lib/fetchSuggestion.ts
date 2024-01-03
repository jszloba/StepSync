import formatTodosForAI from "@/lib/formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    try {
        const todos = formatTodosForAI(board);
        const res = await fetch("/api/generateSummary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todos }),
        });

        const GPTdata = await res.json();
        const { suggestion } = GPTdata; // Update this line to access the correct field in the GPT data

        return suggestion || "AI bot is summarizing your tasks for the day...";
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        return "AI bot is summarizing your tasks for the day..."; // Return a default message in case of error
    }
};

export default fetchSuggestion;