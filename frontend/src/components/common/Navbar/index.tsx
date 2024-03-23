import { cookies } from "next/headers";
import Link from "next/link";

import { getProfile } from "@/apis/user";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN } from "@/utils/constants";

import LogginUserDropdown from "./LogginUserDropdown";

const getProfileServer = async () => {
  const nextCookies = cookies();
  const accessToken = nextCookies.get(ACCESS_TOKEN)?.value ?? "";

  try {
    const res = await getProfile({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: res.data,
      err: null,
    };
  } catch (err) {
    return {
      data: null,
      err,
    };
  }
};

const Navbar = async () => {
  const profileRes = await getProfileServer();
  const profile = profileRes.data;

  return (
    <div className="h-20 w-full shadow-lg">
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="cursor-pointer">
          Blogging Platform
        </Link>

        <div className="flex gap-2">
          {profile ? (
            <LogginUserDropdown username={profile.username} />
          ) : (
            <Link href="/signin">
              <Button>SignIn</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
