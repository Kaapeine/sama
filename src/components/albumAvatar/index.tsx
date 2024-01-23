import Image from "next/image";

export default function AlbumAvatar({
  src,
  alt,
}: {
  src?: string | any;
  alt: string;
}) {
  return (
    <div className="flex items-center justify-center h-96 w-96">
      {src ? (
        <Image
          className="cursor-pointer hover:w-80 hover:h-80"
          src={src}
          alt={alt}
          width={288}
          height={288}
        />
      ) : (
        <div className="flex items-center justify-center w-72 h-72 bg-slate-500 text-2xl text-slate-300 hover:w-80 hover:h-80 cursor-pointer">
          {alt}
        </div>
      )}
    </div>
  );
}
