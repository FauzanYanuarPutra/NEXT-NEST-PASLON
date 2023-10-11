"use client"
import { LabelInput } from "@/app/components/common/forms/InputLabel";
import { getToken } from "@/app/config/getToken";
import api from "@/app/config/paslonApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  image: File | null;
  visi: string;
  parties: string[];
}

const EditPaslon = ({ params }: { params: { id: number } }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: null,
    visi: "",
    parties: [], 
  });
  const [error, setError] = useState({
    message: "",
    error: "",
    statusCode: 0,
  });
  const router = useRouter();


  const [newParty, setNewParty] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files ? files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePartyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewParty(e.target.value);
  };

  const addParty = () => {
    if (newParty.trim() !== "") {
      setFormData({
        ...formData,
        parties: [...formData.parties, newParty],
      });
      setNewParty("");
    }
  };

  const removeParty = (index: number) => {
    const updatedParties = [...formData.parties];
    updatedParties.splice(index, 1);
    setFormData({
      ...formData,
      parties: updatedParties,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getToken()
    api
      .patch(`/paslons/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        router.push("/paslons");
        })
      .catch((err) => {
          setError(err.response.data);
          console.log(err);
        }).finally(() => {
          console.log("done");
        })
  };

  useEffect(() => {
    getToken()
    api.get(`paslons/${params.id}`)
      .then((res) => {
        setFormData({
          ...res.data.data,
          parties: res.data.data.parties.map((party: any) => party.name),
        })
      }).catch((err) => {
        console.log(err)
      })
    
    console.log('hallo')
  }, [params.id]);


  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center p-4 lg:px-10">
        <div className="bg-white shadow-xl w-full max-w-5xl px-10 py-10 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <LabelInput
              htmlFor="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={true}
              placeholder="Masukan nama"
            />
            <LabelInput
              htmlFor="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              // required={true}
            />
            <LabelInput
              htmlFor="visi"
              type="text"
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              required={true}
              placeholder="Masukan visi"
            />
            <div className="grid lg:grid-cols-2 grid-col-1 gap-5">
              {formData.parties.map((party, index) => (
                <div key={index} className="flex gap-2 flex-col">
                  <label htmlFor={`partai ke${index + 1}`}>partai ke {index + 1}</label>
                  <div  className="relative">
                    <LabelInput
                      type="text"
                      name={`partai ke${index + 1}`}
                      value={party}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedParties = [...formData.parties];
                        updatedParties[index] = e.target.value;
                        setFormData({
                          ...formData,
                          parties: updatedParties,
                        });
                      }}
                      placeholder="Masukan partai"
                    />
                    <div className="absolute right-0 bottom-0 top-0">
                      <button type="button" className="bg-red-500 h-full flex text-center justify-center items-center px-5 rounded-r-lg text-3xl text-white"  onClick={() => removeParty(index)}>
                        -
                      </button>
                    </div>
                    {/* <button
                      type="button"
                      className="text-red-600 text-sm font-medium"
                      onClick={() => removeParty(index)}
                    >
                      Hapus Partai
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
            {error && error.statusCode === 400 && <p style={{ color: "red" }}>{error.message}</p>} 
            <div className="relative">
              <LabelInput
                type="text"
                name="partai"
                value={newParty}
                onChange={handlePartyChange}
                placeholder="Masukan partai"
              />
              <div className="absolute right-0 top-0 bottom-0 ">
                <button type="button" className="bg-green-500 h-full flex text-center justify-center items-center px-5 rounded-r-lg text-3xl text-white" onClick={addParty}>
                  +
                </button>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
          {error && error.statusCode === 401 && <p style={{ color: "red" }}>{error.message}</p>} 
        </div>
      </div>
    </>
  );
}

export default EditPaslon


