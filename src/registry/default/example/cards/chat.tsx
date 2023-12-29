import * as React from "react";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";

export function CardsChat() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
  ]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Token</p>
              <p className="text-sm text-muted-foreground">
                0x467719aD09025FcC6cF6F8311755809d45a5E5f3
              </p>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: event.currentTarget.message.value,
                },
              ]);

              event.currentTarget.message.value = "";
            }}
            className="flex items-center w-full space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your contract..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
