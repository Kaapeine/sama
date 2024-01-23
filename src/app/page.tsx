"use client";
import Image from "next/image";
import albumImg from "../../public/images/album.jpg";
import AlbumAvatar from "@/components/albumAvatar";

const myListens = [
  albumImg,
  albumImg,
  albumImg,
  albumImg,
  albumImg,
  albumImg,
  albumImg,
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col p-5">
        <p className="text-gray-200 text-3xl">Your Current Listens</p>
        <div className="flex justify-evenly items-center p-2 h-96">
          {myListens.map((src, i) => (
            <AlbumAvatar src={src} alt={"Hard Normal Daddy"} />
          ))}
        </div>
        <hr />
      </div>
      <div className="flex flex-col p-5">
        <p className="text-gray-200 text-3xl">To Listen</p>
        <div className="flex gap-5 p-2">
          {myListens.map((src, i) => (
            <AlbumAvatar src={src} alt={"Hard Normal Daddy"} />
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}
