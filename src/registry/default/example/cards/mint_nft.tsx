"use client";

import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import HttpClient from "@/lib/fetch";

const httpClient = new HttpClient();

export function CardsMintNFT() {
  const [gasLimitMint, setMaxGasLimit] = React.useState("");
  const [gasPriceMint, setGasPriceMint] = React.useState("");
  const [numberMint, setNumberMint] = React.useState("");

  React.useEffect(() => {
    const initMintSettings = async () => {
      const data = await httpClient.request("/mint_settings", "GET");
      if (data && data.mint_response) {
        const { gasLimitMint, gasPriceMint, numberMint } = data.mint_response;
        setMaxGasLimit(gasLimitMint);
        setGasPriceMint(gasPriceMint);
        setNumberMint(numberMint);
      }
    };
    initMintSettings();
  }, []);

  const handleSaveClick = async () => {
    try {
      const data = await httpClient.request("/mint_settings", "POST",
        {
          gasLimitMint,
          gasPriceMint,
          numberMint,
        });
      if (data && data.mint_response) {
        const { gasLimitMint, gasPriceMint, numberMint } = data.mint_response;
        setMaxGasLimit(gasLimitMint);
        setGasPriceMint(gasPriceMint);
        setNumberMint(numberMint);
      }
    } catch (error) {
      console.error("[handleSaveClick] :", error);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Mint NFT</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="gasLimit">Gas Limit</Label>
            <Input
              id="gasLimit"
              type="number"
              placeholder="1000000"
              value={gasLimitMint}
              onChange={(e) => setMaxGasLimit(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gasPriceMint">Gas Wei</Label>
            <Input
              id="gasPriceMint"
              type="number"
              placeholder="1000000"
              value={gasPriceMint}
              onChange={(e) => setGasPriceMint(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="numberMint">Number Mint</Label>
            <Input
              id="numberMint"
              type="number"
              placeholder="0"
              value={numberMint}
              onChange={(e) => setNumberMint(e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              APT-ROOT
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSaveClick}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
