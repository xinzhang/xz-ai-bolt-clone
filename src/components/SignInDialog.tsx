import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

type User = Doc<"users">;

const SignInDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: () => void;
}) => {
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext);
  const createUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } }
      );

      const user = await createUser({
        email: userInfo?.data?.email,
        name: userInfo?.data?.name,
        picture: userInfo?.data?.picture,
        uid: uuidv4(),
      }) as User;

      console.log("user after createUser", user);

      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUserDetail({
        email: user.email,
        name: user.name,
        picture: user.picture,
        uid: user.uid,
        _id: user._id,
        token: user.token || 50000,
      });

      closeDialog();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-bold text-center text-white'>
              {Lookup.SIGNIN_HEADING}
            </h2>

            <p className='text-md mt-2 text-center'>
              {Lookup.SIGNIN_SUBHEADING}
            </p>

            <Button
              onClick={() => googleLogin()}
              className='mt-3 bg-blue-500 text-white hover:bg-blue-400'
            >
              Sign In with Google
            </Button>
            <p className='mt-3'>{Lookup.SIGNIN_AGREEMENT_TEXT}</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
