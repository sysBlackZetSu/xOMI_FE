import { CardsChat } from "@/registry/default/example/cards/chat";
import { CardsCookieSettings } from "@/registry/default/example/cards/cookie-settings";
import { CardsCreateAccount } from "@/registry/default/example/cards/create-account";
import { CardsPaymentMethod } from "@/registry/default/example/cards/payment-method";

export default function CardsDemo() {
  return (
    <div className="grid md:grids-col-2 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <CardsCookieSettings />
          <CardsCreateAccount />
        </div>
        <div className="space-y-4">
          <CardsChat />
          <CardsCreateAccount />
        </div>
        <div className="space-y-4">
          <CardsPaymentMethod />
        </div>
      </div>
    </div>
  );
}
