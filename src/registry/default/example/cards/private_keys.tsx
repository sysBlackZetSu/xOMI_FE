"use strict";

import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

import { Download } from "lucide-react";
import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";
import HttpClient from "@/lib/fetch";

const httpClient = new HttpClient();

export function CardsPrivateKeySettings() {
  const fake_private_keys = [
    {
      id: 'necessary',
      private_key: '0x83a202278982af4f8199d82675352e190f2c7d46641087550d518237417f279f',
      name: 'Wallet 01',
    },
    {
      id: 'functional',
      private_key: '0x83a202278982af4f8199d82675352e190f2c7d46641087550d518237417f279f',
      name: 'Wallet 02',
    },
    {
      id: 'performance',
      private_key: '0x83a202278982af4f8199d82675352e190f2c7d46641087550d518237417f279f',
      name: 'Wallet 03',
    },
  ];
  const [privateKeys, setPrivateKeys] = React.useState<{ id: any; private_key: any; name: any; }[]>(fake_private_keys);
  const shortenText = (text = '', startLength = 3, endLength = 22) => {
    if (text.length <= startLength + endLength) {
      return text;
    }
    const startPart = text.slice(0, startLength);
    const endPart = text.slice(-endLength);
    return `${startPart}...${endPart}`;
  };

  React.useEffect(() => {
    const initTokenData = async () => {
      const data = await httpClient.request("/private_key", "GET");
      if (data && data.private_keys) {
        setPrivateKeys(data.private_keys);
      }
    };
    initTokenData();
  }, []);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const private_key = (event.currentTarget.message as HTMLInputElement)?.value;

    if (!(/^0x[0-9a-fA-F]+$/).test(private_key)) return;
    try {
      const data = await httpClient.request("/private_key", "POST", { private_key });
      if (data && data.private_key) {
        setPrivateKeys((prevState) => [...prevState, {
          id: data.private_key.id,
          private_key: data.private_key.private_key,
          name: data.private_key.name,
        }]);
      }
    } catch (error) {
      console.error("[SubmitForm] :", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Private Keys</CardTitle>
        <CardDescription>Manage your wallet.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <form
            onSubmit={submitForm}
            className="flex items-center w-full space-x-2"
          >
            <Textarea
              id="message"
              placeholder="Type your private key..."
              className="flex-1 min-h-[40px] h"
            />
            <Button type="submit" size="icon">
              <Download className="w-4 h-4" />
              <span className="sr-only"></span>
            </Button>
          </form>
        </div>
        {privateKeys.map((privateKey) => (
          <div key={privateKey.id} className="flex items-center justify-between space-x-4">
            <Label htmlFor={privateKey.id} className="flex flex-col space-y-1">
              <span>{privateKey.name}</span>
              <span className="text-xs font-normal leading-snug text-muted-foreground" style={{ wordWrap: 'break-word' }}>
                {shortenText(privateKey.private_key)}
              </span>
            </Label>
            <Switch id={privateKey.id} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
