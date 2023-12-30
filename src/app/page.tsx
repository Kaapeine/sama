"use client";
import { mbdb } from '@/axios';
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<any>();
  const [relInfo, setrelInfo] = useState<any>();

  const query = '%' + search.split(' ').join('%') + '%';

  const releaseQueryHandler = async () => {
    if (search === "") {
      setResult([]);
      return;
    }
    try {
      const res = await mbdb.get('release-group', {
        params: {
          query: query,
          limit: 10
        }
      });
      if (res.status === 200) {
        setResult(res.data["release-groups"]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    releaseQueryHandler();
  }, [search]);

  console.log(result);

  return (
    <main className="flex h-screen w-screen bg-white flex-col items-center p-5 gap-5">
      <div className='flex p-5 w-full text-black text-3xl'>s a m a</div>
      <Input type='text' placeholder='Enter Release Name' value={search} onChange={(e) => setSearch(e.target.value)}>
      </Input>

      <div className='flex flex-col gap-2'>
        {result && result?.length > 0 && result.map((release: any) =>
          <div className='flex flex-col bg-slate-300 p-2 w-80 cursor-pointer' onClick={() => {
            router.push(`/album?mmid=${release.id}`)
          }}>
            <div className='text-black'>
              Name: {release.title}
            </div>
            <div>
              ID: {release.id}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
