"use client";

import Cookies from "js-cookie";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCESS_TOKEN } from "@/utils/constants";

type Props = {
  username: string;
};

const LogginUserDropdown = ({ username }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {username} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push("/blog/create");
          }}
        >
          Create a blog
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            Cookies.remove(ACCESS_TOKEN);
            window.location.reload();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogginUserDropdown;
