// src/components/dashboard/HelpSection.tsx
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'support';
  text: string;
  timestamp: Date;
}

const HelpSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Add a welcome message on mount
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        sender: 'support',
        text: '👋 Hi there! How can we help you today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // simulate support reply
    setTimeout(() => {
      const supportMsg: Message = {
        id: Date.now() + 1,
        sender: 'support',
        text: 'Thanks for your message! We’ll get back to you shortly.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMsg]);
    }, 1000);
  };

  const handleSendClick = () => sendMessage(input);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold">Help & Support</h1>
      </header>

      {/* Chat window */}
      <div
        ref={scrollRef}
        className="flex-1 bg-white rounded-lg shadow p-6 overflow-y-auto space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg relative ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg'
                : 'bg-gray-100 text-gray-800 self-start rounded-tr-lg rounded-br-lg rounded-bl-lg'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
            <span className="block text-[10px] text-gray-500 mt-1 text-right">
              {msg.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Message input */}
      <footer className="bg-white rounded-lg shadow p-4 mt-6 flex items-center">
        <input
          type="text"
          placeholder="Type your message…"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendClick}
          className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </footer>
    </div>
  );
};

export default HelpSection;