"use client"
import { useEffect, useState } from "react";
import api from "../config/paslonApi";
import Link from "next/link";
import { PaslonIndex } from "./PaslonIndex";
import { ErrorPopup } from "../components/common/errors/ErrorPopup";
import { getToken } from "../config/getToken";
import { LoaderQuarter } from 'tabler-icons-react';
function PagePaslons() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [vote, setVote] = useState({
    id: 0,
    vote: 0,
  });
  const [user, setUser] = useState({
    id: 0,
    isAdmin: false,
  });
  const [error, setError] = useState({
    message: "",
    error: "",
    statusCode: 0,
  }); 

  const GetData = () => {
    getToken()
    api.get('/paslons')
      .then((res) => {
        GetUser(res.data.user);
        setData(res.data.data);
      })
      .catch((err) => {
        setData([]);
        if (err.response.data.statusCode === 401) {
        setError(err.response.data);
        } else {
        setError(err.message);
        }
      }).finally(() => {
        setLoading(false);
        
      });
    
      
  }
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    GetData();
  }, [ ]);

  const GetUser = (user: any) => {
    setUser(user)
    getToken()
    api.get(`/users/${user.id}`)
      .then((res) => {
      
      setVote({
        id: user.id,
        vote: res.data.data.paslon ? res.data.data.paslon.id : 0,
      });
    })
      .catch((err) => {
      setData([]);
      if (err.response.data.statusCode === 401) {
      setError(err.response.data);
      } else {
      setError(err.message);
      }
    }).finally(() => {
      setLoading(false);
    });
  }

    
  const DeletePaslon = (id: string) => {
    getToken()
    api
      .delete(`/paslons/${id}`)
      .then((res) => {
        GetData();
      })
      .catch((err) => {
        GetData();
      });
  };

  const VotePason = () => {
    getToken()
    api
      .patch(`/users/vote/${vote.id}/${vote.vote}`)
      .then((res) => {
        GetData();
      })
      .catch((err) => {
        GetData();
      });
  }


  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 botom-0 left-0 right-0 w-full h-full flex justify-center items-center">
          <div className="animate-spin">
            <LoaderQuarter
              size={46}
              strokeWidth={2.5}
              color={'#4060bf'}
            />
          </div>
        </div>
      ) : (
          <div className="flex flex-col max-w-[1000px] w-[90%] mx-auto my-10 mb-20">
            <div className="flex flex-col md:flex-row  gap-3  mb-5">
              <div className="w-full md:w-2/6 bg-white py-10 ">
                <div className="flex  w-full h-full flex-col justify-start mx-10">
                  <h1 className="text-2xl font-bold mb-3">SUARA SAAT INI :</h1>
                    {data.map((paslon: any, index: number) => (
                      <div key={paslon.id} className="flex gap-2 items-center">
                          <p>{index + 1}. {paslon.name} </p>
                          <div className="text-red-600 bg-slate-200 rounded-lg px-3">{ paslon.voter.length }</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full md:w-4/6 bg-white p-10">
                <div className="mb-5">
                  <h1 className="text-2xl font-bold">Masukan Pilhan Suaramu :</h1>
                  <p className="text-red-600">Pilih menurut pilihan hati dan pikiranmu yang random, jangan pernah dibawa serios.</p>
                </div>
                <div className="grid  grid-cols-2 md:grid-cols-3 gap-2 justify-between">
                  {data.map((paslon: any, index: number) => (
                    <div key={paslon.id} className="flex gap-2 items-center w-full ">
                      <input
                        type="radio"
                        name="paslon"
                        id={`paslon-${index}`}
                        checked={vote.vote === paslon.id}
                        onChange={() => setVote({ id: vote.id, vote: paslon.id })}
                      />
                      <label htmlFor={`paslon-${index}`} >
                        {index + 1}. {paslon.name} 
                      </label>
                    </div>
                  ))}
                </div>
                <div onClick={() => VotePason()} className="mt-5 bg-green-500 p-3 text-center rounded-md text-white cursor-pointer" >
                    Pilih
                </div>
              </div>
            </div>
            <div>
              {user && user.isAdmin && (
                <div className="flex justify-end my-2">
                  <Link href="/paslons/create" className="bg-green-500 px-6 py-2 font-medium rounded-lg text-white">Create</Link>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-lg">
                {data.map((paslon: any, index: number) => <PaslonIndex index={index + 1} key={paslon.id} paslon={paslon} user={user} DeletePaslon={DeletePaslon} /> )}
              </div>
            </div>
            {error && error.statusCode !== 0 && <ErrorPopup />}
          </div>
      )}
      

    </div>
  );
}

export default PagePaslons;

