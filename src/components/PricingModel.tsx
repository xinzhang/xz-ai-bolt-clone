'use client'

import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { Button } from "./ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const PricingModel = () => {

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateToken = useMutation(api.users.UpdateTokens);

  const onPaymentSuccess = async (tokens: number) => {
    if (!userDetail) return;

    const currentTokens = (userDetail?.token || 0) + tokens;
    await UpdateToken({
      token: currentTokens,
      userId: userDetail?._id
    });
    setUserDetail({...userDetail, token: currentTokens});
    console.log("Payment successful");
  }

  const onPaymentCancel = async () => {
    console.log("Payment cancelled");
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] w-full gap-5 ">
      {Lookup.PRICING_OPTIONS.map( (item, index) => {
        return (
          <div
            key={index}
            className="p-7 border rounded-xl flex flex-col gap-3"
            style={{backgroundColor: Colors.CHAT_BACKGROUND}}>
            <h2 className="text-2xl"><span className="font-bold">{item.name}</span></h2>
            <h2 className="font-medium text-lg">{item.tokens}</h2>
            <p className='text-gray-400'>{item.desc}</p>

            <h2 className="text-3xl font-bold text-center mt-6">${item.price}</h2>
            {/* <Button className="mt-4">Upgrade to {item.name}</Button> */}
            <PayPalButtons
              disabled={!userDetail}
              style={{
                layout: 'horizontal',
                tagline: false,
              }}
              onApprove={() => onPaymentSuccess(Number(item.tokens || 0))}
              onCancel={() => onPaymentCancel()}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{amount: {value: item.price.toString(), currency_code: 'USD'}}]
                })
              }}
            />
          </div>
        )
      })}
      
    </div>
  );
};

export default PricingModel;