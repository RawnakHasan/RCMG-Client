import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import DiceBearAvatar from "./DiceBearAvatar";

const MessageForm = z.object({
  message: z.string().min(1),
});

type MessageFormT = z.infer<typeof MessageForm>;

type NewMessage = {
  sender: string;
  message: string;
};

const GameChat = ({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) => {
  const [messages, setMessages] = useState<NewMessage[]>([]);

  const form = useForm<MessageFormT>({
    resolver: zodResolver(MessageForm),
  });

  const onSubmit = (data: MessageFormT) => {
    socket.emit("sendMessage", {
      roomId,
      message: data.message,
      username,
    });

    form.reset();
  };

  useEffect(() => {
    socket.on("receiveMessage", (msg: NewMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  return (
    <div className="h-full w-4/16 flex flex-col border-2 rounded-lg p-4">
      <div className="flex-1 overflow-y-auto space-y-2 overflow-x-hidden">
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-2 items-start max-w-full">
            <DiceBearAvatar username={msg.sender} size={40} />

            <div className="flex flex-col max-w-[83%]">
              <span className="text-sm font-medium">{msg.sender}</span>

              <div className="wrap-break-word whitespace-pre-wrap rounded-md px-3 py-2 bg-muted">
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="flex gap-2 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Input {...form.register("message")} placeholder="Text your friends" />
        <Button size="icon" type="submit">
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default GameChat;
