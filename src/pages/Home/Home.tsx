import { useEffect, useState } from "react";
import api from "../../BaseUrl/url";
import Chat from "../../components/Chat";
import Modal from "../../components/Modal";

interface Conversation {
  id: number;
  conversation_id: string;
  role: "USER" | "AGENT";
  content: string;
  sector?: string;
  summary?: string;
  created_at: string;
}

export type ModalType = "LIST" | "DETAIL" | null;

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[][]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation[] | null>(null);

  useEffect(() => {
    api.get("/messages")
      .then(res => setConversations(res.data))
      .catch(err => console.error("Erro ao buscar mensagens:", err));
  }, []);


  const openConversation = (conv: Conversation[]) => {
    setSelectedConversation(conv);
    setActiveModal("DETAIL");
  };

  const closeModals = () => {
    setActiveModal(null);
    setSelectedConversation(null);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setActiveModal("LIST")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Historico de Conversas
      </button>

      {activeModal === "LIST" && (
        <Modal title="Histórico" onClose={closeModals}>
          {conversations.map((conv, i) => (
            <div
              key={i}
              onClick={() => openConversation(conv)}
              className="border rounded-lg p-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
            >
              <h3 className="font-medium text-sm mb-1">Conversa {i + 1}</h3>

              {conv.slice(0, 3).map(msg => (
                <MessageBubble key={msg.id} msg={msg} small />
              ))}

              {conv.length > 3 && (
                <span className="text-xs text-gray-500">
                  ... e mais {conv.length - 3} mensagens
                </span>
              )}
            </div>
          ))}
        </Modal>
      )}


      {activeModal === "DETAIL" && selectedConversation && (
        <Modal title="Conversa Detalhada" onClose={closeModals}>
          {selectedConversation.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </Modal>
      )}

      <Chat />
    </div>
  );
}


function MessageBubble({
  msg,
  small = false
}: {
  msg: Conversation;
  small?: boolean;
}) {
  return (
    <div
      className={`p-${small ? 1 : 2} rounded ${
        small ? "text-xs" : "text-sm"
      } max-w-[75%] ${
        msg.role === "USER"
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-gray-200 text-gray-800"
      }`}
    >
      {small && msg.content.length > 50
        ? msg.content.slice(0, 50) + "..."
        : msg.content}
    </div>
  );
}
