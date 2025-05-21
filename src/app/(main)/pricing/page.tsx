'use client'
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { useContext } from "react";
import PricingModel from "@/components/PricingModel";
const Pricing = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="flex flex-col items-center mt-20 px-96">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <p className="text-gray-500 max-w-xl text-center mt-4">{Lookup.PRICING_DESC}</p>
      <div className="p-4 px-6 border rounded-lg flex justify-between items-center mt-8 w-full"
        style={{backgroundColor: Colors.CHAT_BACKGROUND}}>
        <h2 className="text-lg"><span className="font-bold">{userDetail?.token} tokens left</span></h2>
        <div>
          <h2 className="font-medium">Need more tokens?</h2>
          <p>Upgrade your plan below</p>
        </div>
      </div>
      <PricingModel />
    </div>
  );
};

export default Pricing;