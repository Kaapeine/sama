"use client";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const headerLinks = [
  {
    name: "Genres",
    path: "/genres",
  },
  {
    name: "Charts",
    path: "/genres",
  },
  {
    name: "Your Library",
    path: "/genres",
  },
];

export default function Header() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    router.push(`/search?=${searchText}`);
  };

  const keyPressHandler = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-20 bg-teal-900 text-gray-200 border-0 p-5">
      <p
        className="text-3xl font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        AlbumTracker
      </p>

      <div
        className="flex items-center justify-start px-2 w-4/12 h-12 bg-stone-900 border-stone-900 rounded-3xl"
        onKeyDown={(e) => keyPressHandler(e)}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          width={18}
          height={18}
          className="px-2"
          onClick={handleSearch}
        />
        <Input
          className="border-stone-900 focus-visible:ring-0 w-9/12 text-lg tracking-wide"
          placeholder="Search Albums"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        {headerLinks.map((link, i) => (
          <p
            className="text-2xl font cursor-pointer"
            onClick={() => router.push(link.path)}
          >
            {link.name}
          </p>
        ))}
      </div>
    </div>
  );
}
