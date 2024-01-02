import { CardsToken } from "@/registry/default/example/cards/token";
import { CardsPrivateKeySettings } from "@/registry/default/example/cards/private_keys";
import { CardsSwapToken } from "@/registry/default/example/cards/swap_token";
import { CardsOptions } from "@/registry/default/example/cards/options";
import { CardsActions } from "@/registry/default/example/cards/actions";
import { CardsMintNFT } from "@/registry/default/example/cards/mint_nft";

export default function CardsDemo() {
  return (
    <div className="grid md:grids-col-2 md:gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="lg:space-y-4 md:flex-1 sm:flex-auto xs:flex-auto">
          <CardsPrivateKeySettings />
          <CardsOptions />
        </div>
        <div className="lg:space-y-6 md:flex-1 sm:flex-auto xs:flex-auto">
          <CardsToken />
          <CardsSwapToken />
          <CardsMintNFT />
        </div>
        <div className="lg:space-y-2 md:flex-1  sm:flex-auto xs:flex-auto">
          <CardsActions />
        </div>
      </div>
    </div>
  );
}
