import { useEffect, useState } from "react";
import api from "../../BaseUrl/url";
import Chat from "../../components/Chat";

interface Conversation {
    id: number;
    conversation_id: string;
    role: "USER" | "AGENT";
    content: string;
    sector?: string;
    summary?: string;
    created_at: string;
}

export default function Home() {
    const [conversations, setConversations] = useState<Conversation[][]>([]);
    const [userModal, setUserModal] = useState(false);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await api.get("/messages");
                setConversations(response.data);
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
            }
        }

        fetchMessages();
    }, []);

    return (
        <div className="p-6">
            <button
                onClick={() => setUserModal(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Abrir mensagens
            </button>

            {userModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white w-96 max-h-[80vh] rounded-xl p-4 flex flex-col">

                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-semibold">Histórico</h2>
                            <button
                                onClick={() => setUserModal(false)}
                                className="text-sm text-red-500"
                            >
                                Fechar
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4">
                            {conversations.map((conv, convIndex) => (
                                <div key={convIndex} className="border rounded-lg p-3 bg-gray-50">
                                    <h3 className="font-medium text-sm mb-2">Conversa {convIndex + 1}</h3>
                                    <div className="space-y-2">
                                        {conv.map(msg => (
                                            <div
                                                key={msg.id}
                                                className={`p-2 rounded text-sm max-w-[80%] ${msg.role === "USER"
                                                    ? "ml-auto bg-blue-600 text-white"
                                                    : "mr-auto bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Chat />
        </div>
    );
}
