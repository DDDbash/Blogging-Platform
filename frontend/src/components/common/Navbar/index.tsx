import Link from "next/link";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="h-20 w-full shadow-lg">
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="cursor-pointer">
          Blogging Platform
        </Link>

        <div className="flex gap-2">
          <Link href="/signin">
            <Button>SignIn</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
