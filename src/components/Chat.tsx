import api from "../BaseUrl/url";
import { useState } from "react";

interface Message {
    sender: "user" | "bot";
    content: string;
}

export default function Chat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string>("");

    function openChat() {
        setOpen(true);
        if (!conversationId) {
            setConversationId(crypto.randomUUID());
        }
    }

    function closeChat() {
        setOpen(false);

        setMessages([]);
        setInput("");
        setLoading(false);
        setConversationId("");
    }

    async function sendMessage() {
        if (!input.trim()) return;
        setMessages([...messages, { 
            sender: "user", 
            content: input 
        }])

        setInput("");
        setLoading(true);
        
        const response = await api.post("/messages", { content: input, conversationId });
        setMessages(prev => [
            ...prev,
            { sender: "bot", content: response.data.reply }
        ]);

        setLoading(false);
    }

    return (
        <>
            <button
                onClick={open ? closeChat : openChat}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700"
            >
                {open ? "✕" : "💬"}
            </button>

            {open && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col border">
                    <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
                        Chat Bot 🤖
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[75%] p-2 rounded-lg text-sm ${msg.sender === "user"
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "mr-auto bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="text-xs text-gray-400">Bot digitando...</div>
                        )}
                    </div>

                    <div className="p-2 border-t flex gap-2">
                        <input
                            className="flex-1 border rounded-lg px-2 text-sm focus:outline-none"
                            placeholder="Digite..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-3 rounded-lg text-sm hover:bg-blue-700"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
