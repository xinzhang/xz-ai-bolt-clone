import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const SignInDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: () => void;
}) => {
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } }
      );

      setUserDetail({
        email: userInfo?.data?.email,
        name: userInfo?.data?.name,
        picture: userInfo?.data?.picture,
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
          <DialogDescription>
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-2xl font-bold text-center text-white'>
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className='text-md mt-2 text-center'>
                {Lookup.SIGNIN_SUBHEADING}
              </p>

              <Button onClick={googleLogin} className='mt-3 bg-blue-500 text-white hover:bg-blue-400'>
                Sign In with Google
              </Button>
              <p className='mt-3'>{Lookup.SIGNIN_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
