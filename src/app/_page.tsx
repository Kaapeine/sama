"use client";
import { be, mbdb } from '@/axios';
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>();
  const [toListen, setToListen] = useState<any>();

  const query = '%' + search.split(' ').join('%') + '%';

  const getToListenHandler = async () => {
    try {
      const res = await be.get('to-listen?uid=0');
      if (res.status === 200) {
        setToListen(res.data.toListen);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addToListenHandler = async (albumId: string) => {
    try {
      const res = await be.put('add-to-listen', {
        userId: "0",
        albumId: albumId
      })
      if (res.status === 200) {
        getToListenHandler();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const searchQueryHandler = async () => {
    if (search === "") {
      setSearchResult([]);
      return;
    }
    try {
      const res = await be.get('search', {
        params: {
          q: query
        }
      });
      if (res.status === 200) {
        setSearchResult(res.data.albums);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToListenHandler();
  }, []);

  useEffect(() => {
    searchQueryHandler();
  }, [search]);

  return (
    <main className="flex h-screen w-screen bg-white flex-col p-5 gap-5">
      <div className='flex p-5 w-full text-black text-3xl'>s a m a</div>
      <Input type='text' placeholder='Enter Release Name' value={search} onChange={(e) => setSearch(e.target.value)}>
      </Input>

      <div className="flex justify-evenly">
        <div className='flex flex-col w-3/12 items-center gap-2 p-2 border'>
          <p className='text-xl'>Search Results</p>
          {searchResult && searchResult?.length > 0 && searchResult.map((release: any) =>
            <div className='flex flex-col w-80 bg-white border border-black p-2 cursor-pointer' key={release.id} onClick={() => {
              addToListenHandler(release.id);
              // router.push(`/album?mmid=${release.id}`);
            }}>
              <div className='text-black'>
                Name: {release.title}
              </div>
              <div>
                Artists: {release.artists.map((artist: any) => artist.name)}
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col w-3/12 items-center gap-2 p-2 border'>
          <p className='text-xl'>To Listen</p>
          {toListen && toListen?.length > 0 && toListen.map((album: any) =>
            <div className='flex flex-col w-80 bg-white border border-black p-2 cursor-pointer' key={album.id}>
              <div className='text-black'>
                Name: {album.title}
              </div>
              <div className='text-black'>
                Artists: {album.artists.map((a: string) => a + " ")}
              </div>
              <div className='text-black'>
                Release Date: {album.releaseDate}
              </div>
              <div className='flex justify-center py-2'>
                <img className="w-40 h-40" title={album.title} src={album.coverUrl}></img>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col w-3/12 items-center gap-2 p-2 border'>
          <p className='text-xl'>Listening</p>
          {/* {toListen && toListen?.length > 0 && toListen.map((release: any) =>
            <div className='flex flex-col w-80 bg-white border border-black p-2 cursor-pointer' key={release.id}>
              <div className='text-black'>
                Name: {release.title}
              </div>
            </div>
          )} */}
        </div>
      </div>

    </main>
  )
}
