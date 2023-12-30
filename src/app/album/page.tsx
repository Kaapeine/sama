"use client";
import { mbdb } from "@/axios";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Album() {
    const searchParams = useSearchParams();
    const mmid = searchParams.get('mmid');

    const [result, setResult] = useState<any>();
    const [art, setArt] = useState<any>();

    const getAlbumHandler = async () => {
        if (!mmid) return;

        try {
            const res = await mbdb.get(`release-group/${mmid}`);
            if (res.status === 200) {
              setResult(res.data);
            }
          } catch (error) {
            console.log(error);
          }
    };

    const getAlbumArtHandler = async () => {
      if (!mmid) return;

      try {
        const res = await axios.get(`http://coverartarchive.org/release-group/${mmid}`);
        if (res.status === 200) {
          setArt(res.data);
        } 
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        getAlbumHandler();
        getAlbumArtHandler();
    }, [mmid]);

    console.log(art);

    return (
        <div className="flex flex-col items-center gap-20">
            {result && <div className='flex flex-col bg-slate-300 p-2 w-80 cursor-pointer'>
              <div className='text-black'>
                Name: {result.title}
              </div>
              <div>
                ID: {result.id}
              </div>
          </div>}
          {art && <img className="w-40 h-40" title={result.title} src={art.images[0].image}></img>}
        </div>
    )
}