import { useState, useEffect } from "react";
import { FileInput } from "lucide-react";

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

import HttpClient from "@/lib/fetch";
const httpClient = new HttpClient();

const greeting = {
  role: "agent",
  content: "Hi, How can I help you today?",
};

export function CardsToken() {
  const [address, setAddress] = useState<string>(
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
  );
  const [smartContract, setSmartContract] = useState({
    address: "",
    icon: "NA",
    name: "NA",
    symbol: "NA",
    decimals: "NA",
  });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addressTmp = (event.currentTarget.message as HTMLInputElement)?.value;
    {
      if (!/^0x[0-9a-fA-F]+$/.test(addressTmp)) return;

      const data = await httpClient.request("/address", "POST", {
        address: addressTmp,
      });
      if (data && data.smart_contract) {
        setSmartContract(
          Object.assign(data.smart_contract.token1, {
            icon: "icon",
          })
        );
        const dex_swap = data.dex_swap;
        const content = {
          role: "user",
          content: `${dex_swap.content}`,
        };
        setMessages((prevState: any) => [
          ...(prevState || []).concat(content).slice(-2),
        ]);
        alert('set smart contract OK');
        return;
      }
      alert('set smart contract NG');
    }
  };

  useEffect(() => {
    // Get data:
    const initTokenData = async () => {
      const data = await httpClient.request("/token-info", "GET", { address });
      if (data && data.smart_contract && data.dex_swap) {
        setSmartContract(
          Object.assign(data.smart_contract.token1, {
            icon: "icon",
          })
        );
        setAddress(data.smart_contract.token1.address);
        const dex_swap = data.dex_swap;
        const content = {
          role: "user",
          content: `${dex_swap.content}`,
        };
        setMessages((prevState: any) => [
          ...(prevState || []).concat(content).slice(-2),
        ]);
      }
    };
    initTokenData();
    if (
      !/^0x[0-9a-fA-F]+$/.test(address) ||
      address === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"
    ) {
      return;
    }

    if (address) {
      const intervalId = setInterval(async () => {
        const data = await httpClient.request("/price", "GET", { address });
        if (data && data.dex_swap) {
          const dex_swap = data.dex_swap;
          const content = {
            role: "user",
            content: `${dex_swap.content}`,
          };
          setMessages((prevState: any) => [
            ...(prevState || []).concat(content).slice(-2),
          ]);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [address]);

  const [messages, setMessages] = useState<any>();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/26003.png"
                alt="Image"
              />
              <AvatarFallback>{smartContract.symbol}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium leading-none mb-2">
                {smartContract.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {smartContract.address}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <form
            onSubmit={submitForm}
            className="flex items-center w-full space-x-2"
          >
            <Input
              id="message"
              value={address}
              placeholder="Type your contract..."
              className="flex-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value.toString())
              }
            />
            <Button type="submit" size="icon">
              <FileInput className="w-4 h-4" />
              <span className="sr-only">Add</span>
            </Button>
          </form>
        </CardFooter>
        <CardContent className="overflow-y-auto max-h-[300px] flex flex-col-reverse">
          <div className="space-y-4">
            {[greeting, ...(messages || [])].map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted",
                  index === messages?.length - 1 ? "last-message-style" : ""
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
