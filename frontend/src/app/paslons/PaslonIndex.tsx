import { useState } from "react";
import api from "@/app/config/paslonApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getToken } from "../config/getToken";

export const PaslonIndex = (props: any) => {
  const { paslon, user, DeletePaslon } = props;
  const router = useRouter();



  return (
    <div className="bg-white shadow-xl rounded-lg p-4">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-full h-[200px] bg-slate-500 rounded-lg overflow-hidden relative">
            {paslon.image && (
                <Image src={paslon.image} alt={paslon.name}  width={10000} height={10000} quality={100} className="w-full h-full object-cover"  />
            )}
            <div className="w-[80px] h-[80px] rounded-full z-10 bg-white text-red-500 font-bold text-3xl absolute bottom-2 left-2 flex justify-center items-center">
              {props.index}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{paslon.name}</h2>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 break-words">{paslon.visi}</p>
          </div>
        </div>
        <div>
        <p className="text-sm text-gray-600 mt-2">
          Parties: {paslon.parties.map((party: any) => party.name).join(", ")}
        </p>
          {user && user.isAdmin && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => router.push(`/paslons/${paslon.id}/edit`)}
                className="bg-blue-500 rounded-lg text-white py-2 font-medium hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={() => DeletePaslon(paslon.id)}
                className="bg-red-500 rounded-lg text-white py-2 font-medium hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
