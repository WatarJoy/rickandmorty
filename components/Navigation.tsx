"use client";

import { usePathname } from "next/navigation";
import {
  MovieCreation,
  PeopleAlt,
  GpsFixed,
  DataSaverOff,
} from "@mui/icons-material";
import Link from "next/link";
import cn from "classnames";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div
      className="flex justify-between items-center bg-blue w-lvw h-56 px-24
    desktop:w-96 desktop:flex-col desktop:h-90% desktop:py-32 
    desktop:rounded-xl desktop:justify-start gap-72"
    >
      <Link href={"/"}>
        <DataSaverOff className="text-red desktop:w-32 desktop:h-32 transition-all duration-300 hover:scale-110" />
      </Link>
      <ul className="flex gap-24 desktop:flex-col desktop:gap-32">
        <li>
          <Link href="/characters">
            <PeopleAlt
              className={cn(
                "hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32",
                { "text-white": pathname === "/characters" }
              )}
            />
          </Link>
        </li>
        <li>
          <Link href="/episodes">
            <MovieCreation
              className={cn(
                "hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32",
                { "text-white": pathname === "/episodes" }
              )}
            />
          </Link>
        </li>
        <li>
          <Link href="/locations">
            <GpsFixed
              className={cn(
                "hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32",
                { "text-white": pathname === "/locations" }
              )}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
