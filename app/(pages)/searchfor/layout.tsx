import React, { Suspense } from "react";

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}

export default Layout;
