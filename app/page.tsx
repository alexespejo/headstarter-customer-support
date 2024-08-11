"use client";
import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
 apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
 dangerouslyAllowBrowser: true,
});

export default function Home() {
 const [messages, setMessages] = useState(["Hello", "Why hello there"]);
 const [newMessage, setNewMessage] = useState("");
 async function getMessage() {
  if (newMessage.length > 0) {
   const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: newMessage }],
    model: "gpt-4o-mini",
   });

   if (completion.choices[0].message.content !== null) {
    setMessages([
     ...messages,
     newMessage,
     completion.choices[0].message.content,
    ]);
   }
  }
 }
 return (
  <main className="w-screen h-screen flex items-center justify-center">
   <div className="relative w-1/3 h-3/4 bg-base-100 rounded-md shadow-lg">
    <div className="h-5/6 overflow-auto">
     {messages.map((msg, i) => (
      <>
       {i % 2 == 0 ? (
        <div className="chat chat-end">
         <div className="chat-bubble-primary chat-bubble">{msg}</div>
        </div>
       ) : (
        <div className="chat chat-start">
         <div className="chat-bubble">{msg}</div>
        </div>
       )}
      </>
     ))}
    </div>
    <div className="join w-full p-1 h-1/6">
     <input
      className="input input-bordered join-item w-5/6"
      placeholder="Message Here..."
      onChange={(e) => setNewMessage(e.target.value)}
     />
     <button
      onClick={getMessage}
      className="btn join-item rounded-md w-1/6 btn-primary"
     >
      Send
     </button>
    </div>
   </div>
  </main>
 );
}
