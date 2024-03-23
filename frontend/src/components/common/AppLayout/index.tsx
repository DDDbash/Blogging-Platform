import { PropsWithChildren } from "react";

import Navbar from "../Navbar";

const AppLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
};

export default AppLayout;
