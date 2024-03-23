import { PropsWithChildren } from "react";

import { User } from "@/types/user";

import Navbar from "../Navbar";

type Props = {
  profile?: User | null;
};

const AppLayout = (props: PropsWithChildren<Props>) => {
  const { profile, children } = props;

  return (
    <>
      <Navbar profile={profile} />

      <main>{children}</main>
    </>
  );
};

export default AppLayout;
