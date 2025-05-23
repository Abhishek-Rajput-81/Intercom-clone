"use client";
import React, { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";

const demoConversations = [
  {
    id: 1,
    title: "Luis · Github",
    snippet: "Hey! I have a question…",
    time: "45m",
    unread: true,
    avatar: "L",
    color: "bg-blue-200 text-blue-700",
  },
  {
    id: 2,
    title: "Ivan · Nike",
    snippet: "Hi there, I have a qu…",
    time: "30m",
    unread: false,
    avatar: "I",
    color: "bg-red-200 text-red-700",
    badge: "3min",
  },
  {
    id: 3,
    title: "Lead from New York",
    snippet: "Good morning, let me…",
    time: "40m",
    unread: true,
    avatar: "L",
    color: "bg-indigo-200 text-indigo-700",
  },
];

const demoMessages = {
  1: [
    {
      sender: "Alice",
      content:
        "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
      time: "09:15",
    },
    {
      sender: "Me",
      content: "Let me just look into this for you, Luis.",
      time: "09:16",
    },
  ],
  2: [
    { sender: "Bob", content: "Meeting at 2pm", time: "08:00" },
    { sender: "Me", content: "Okay, noted.", time: "08:01" },
  ],
  3: [
    { sender: "Charlie", content: "See you soon!", time: "Yesterday" },
    { sender: "Me", content: "Sure!", time: "Yesterday" },
  ],
};

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(demoMessages[selectedId]);
  const [chatInput, setChatInput] = useState("");

  const [activeTab, setActiveTab] = useState("copilot");
  const [input, setInput] = useState("");
  const [aiMessages, setAIMessages] = useState([]);
  const [aiStarted, setAIStarted] = useState(false);

  React.useEffect(() => {
    setMessages(demoMessages[selectedId]);
  }, [selectedId]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: "Me",
      content: chatInput,
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages([...messages, newMsg]);
    setChatInput("");
    demoMessages[selectedId] = [...messages, newMsg];
  };

  const handleAISend = () => {
    if (!input.trim()) return;
    setAIStarted(true);
    setAIMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      {
        from: "bot",
        text: `Hi! 👋 I’m Fin, an AI chatbot.
I’m here to help you get instant answers to your questions.

Whether you’re looking for how-to guides, troubleshooting help, or just need to find the right article— I’ve got you covered! I understand natural language, pull information from trusted sources like your company’s help center, and if I ever get stuck, I’ll hand things over to a human support agent. 🤝`,
      },
    ]);
    setInput("");
  };

  const handleAIKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAISend();
    }
  };

  const senderInfo = {};
  demoConversations.forEach((conv) => {
    const name = conv.title.split(" ·")[0];
    senderInfo[name] = { avatar: conv.avatar, color: conv.color };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white flex items-center justify-center">
      <div className="flex w-full h-screen shadow-2xl rounded-2xl overflow-hidden border border-violet-100 bg-white">
       
        {/* Left Sidebar */}
        <aside className="w-[320px] bg-white border-r border-gray-200 flex flex-col text-sm font-sans">
          <div className="h-[56px] px-4 flex items-center font-semibold text-gray-900 text-[30px] font-bold border-b border-gray-200">
            Your inbox
          </div>
          <div className="h-[40px] px-4 flex items-center justify-between text-[13px] text-gray-600 border-b border-gray-100">
            <button className="flex items-center gap-1 hover:text-black">
              <span>3 Open</span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {demoConversations.map((conv) => (
              <div
                key={conv.id}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition group ${
                  conv.id === selectedId ? "bg-violet-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedId(conv.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-medium text-[13.5px] text-gray-900">
                    <div
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[12px] font-bold ${conv.color}`}
                    >
                      {conv.avatar}
                    </div>
                    <span className="truncate max-w-[120px]">{conv.title}</span>
                    {conv.unread && (
                      <span className="w-2 h-2 bg-violet-600 rounded-full" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {conv.badge && (
                      <span className="text-[11px] font-medium text-yellow-800 bg-yellow-300 px-1.5 py-[2px] rounded">
                        {conv.badge}
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400">
                      {conv.time}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 text-[13px] mt-[2px] truncate max-w-[220px]">
                  {conv.snippet}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Middle Chat Window */}
        <main className="w-[48%] flex flex-col bg-white">
          <div className="flex items-center justify-between px-2 h-[56px] border-b border-gray-200">
            <div className="p-4 h-[70px] border-gray-200 font-bold text-[25px] text-gray-900">
              {demoConversations.find((c) => c.id === selectedId)?.title}
            </div>

            <div className="flex items-center gap-2">
              <BsThreeDots size={20} color="black" />
              <button className="ml-2 bg-black text-white px-3 py-1 rounded-lg font-semibold text-sm hover:bg-gray-800">
                Close
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
            {messages.map((msg, idx) => {
              const isMe = msg.sender === "Me";
              const info = !isMe ? senderInfo[msg.sender] : null;
              const avatarInitial = !isMe && info ? info.avatar : "L";
              const avatarColor =
                !isMe && info ? info.color : "bg-blue-200 text-blue-700";
              const avatarSrc = isMe ? "/user.png" : null;

              return isMe ? (
                <div key={idx} className="flex items-end justify-end mb-4">
                  <div className="flex items-end gap-2 max-w-[70%]">
                    <div>
                      <div className="bg-[#e6ebfa] rounded-xl px-4 py-3 text-gray-900 text-[15px]  max-w-[500px] break-words">
                        {msg.content}
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 justify-end">
                          Seen · {msg.time}
                        </div>
                      </div>
                    </div>
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt="You"
                        className="w-7 h-7 rounded-full ml-2 object-cover"
                      />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center ml-2 text-gray-700 font-bold text-base">
                        Y
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex items-end mb-4">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 font-bold text-base ${avatarColor}`}
                  >
                    {avatarInitial}
                  </span>
                  <div>
                    <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900 text-[15px] max-w-[800px] break-words">
                      {msg.content}
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            className="w-full rounded-xl border border-gray-200 bg-white shadow p-4"
            onSubmit={handleSendChat}
          >
            {/* Header */}
            <div className="flex items-center gap-1 mb-1">
              <span className="font-semibold text-sm text-gray-800">Chat</span>
              <svg
                className="w-4 h-4 ml-1 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Use ⌘K for shortcuts
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="chat"
                autoComplete="off"
                placeholder="Type your message..."
                className="flex-1 py-2 rounded-md   flex-grow bg-transparent text-black outline-none text-sm placeholder-gray-700"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600"
              >
                {/* Lightning icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600"
              >
                {/* Bookmark icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 4a2 2 0 0 0-2 2v14l8-5.333L20 20V6a2 2 0 0 0-2-2H6z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600"
              >
                {/* Emoji icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 15s1.5 2 4 2 4-2 4-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9h.01M15 9h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <button
                type="submit"
                className="text-gray-500 font-semibold px-2 py-2 rounded-md flex items-right ml-auto w-fit"
              >
                Send
              </button>
              <svg
                className="w-4 h-4 mr-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </form>
        </main>

       
        {/* Right Side AI Copilot Panel */}
        <section className="w-[35%] bg-gradient-to-br from-white to-violet-200 flex flex-col border-l border-violet-100">
          <div className="relative bg-white border-b flex items-center px-4 h-[56px]">
            <button
              className={`flex items-center gap-1 px-1 text-[15px] font-semibold focus:outline-none ${
                activeTab === "copilot"
                  ? "text-violet-700"
                  : "text-gray-500 font-normal"
              }`}
              onClick={() => setActiveTab("copilot")}
            >
              <span className="text-violet-700 text-lg">
                <HiOutlineSquares2X2 />
              </span>
              AI Copilot
            </button>
            <button
              className={`ml-6 px-1 text-[15px] focus:outline-none ${
                activeTab === "details"
                  ? "text-violet-700 font-semibold"
                  : "text-gray-500 font-normal"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <div className="ml-auto">
              <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
                <svg width="20" height="30" fill="black" viewBox="0 0 20 20">
                  <VscLayoutSidebarLeftOff size={20} color="black" />
                </svg>
              </button>
            </div>
            <span
              className={`absolute left-4 bottom-0 h-[2px] w-[110px] bg-violet-700 rounded transition-all duration-200 ${
                activeTab === "copilot"
                  ? "translate-x-0"
                  : "translate-x-[110px]"
              }`}
            />
          </div>

          {activeTab === "copilot" ? (
            !aiStarted ? (
              // Initial greeting
              <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
                <div className="mb-4">
                  <div className="mx-auto mb-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-2xl text-black">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={128}
                      height={128}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Hi, I’m Fin AI Copilot
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    Ask me anything about this conversation.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {aiMessages.map((msg, idx) =>
                  msg.from === "user" ? (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mt-1">
                        <Image
                          src="/user.png"
                          alt="User"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-[15px] text-gray-900">
                          You
                        </div>
                        <div className="text-[15px] text-gray-900">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-22 h-8 rounded-full flex items-center justify-center mt-1">
                        <Image
                          src="/logo.png"
                          alt="Fin"
                          width={32}
                          height={32}
                          className="shadow-lg"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-[15px] text-gray-900 mb-1">
                          Fin
                        </div>
                        <div
                          className="rounded-2xl p-4 text-[15px] text-gray-900 whitespace-pre-line"
                          style={{
                            background:
                              "linear-gradient(135deg, #e9e4fc 0%, #fbeffb 100%)",
                            border: "1px solid #ece6fa",
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
              <div className="text-lg font-semibold mb-2">Details Panel</div>
              <div className="text-gray-500 text-sm mb-4">
                You can put any details or context here.
              </div>
            </div>
          )}

          {activeTab === "copilot" && !aiStarted && (
            <div className="px-4 pb-2">
              <div className="mb-2 flex items-center">
                <span className="bg-white text-gray-800 text-sm px-3 py-2 rounded-xl flex items-center gap-2 shadow border border-gray-100">
                  <span className="font-medium text-xs text-gray-500">
                    Suggested
                  </span>
                  <span role="img" aria-label="lightbulb">
                    💡
                  </span>
                  How do I get a refund?
                </span>
              </div>
            </div>
          )}

          {activeTab === "copilot" && (
            <div className="px-4 pb-4 ">
              <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-2 w-full max-w-xl ">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-grow bg-transparent text-black outline-none text-sm placeholder-gray-700 "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleAIKeyDown}
                />
                <button
                  onClick={handleAISend}
                  className="ml-2 p-1 rounded-full hover:bg-violet-100 text-violet-600"
                >
                  <ArrowUpIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
