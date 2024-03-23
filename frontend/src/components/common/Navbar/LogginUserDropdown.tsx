"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/utils/constants";

type Props = {
  username: string;
};

const LogginUserDropdown = ({ username }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {username} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Create a blog</DropdownMenuItem>
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
