"use client"
import { useState } from "react";
import api from "@/app/config/paslonApi";
import { useRouter } from "next/navigation";
import { LabelInput } from "@/app/components/common/forms/InputLabel";
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      setLoading(true);
      api
        .post("/auth/login", formData)
        .then((res) => {
          setError("");
          localStorage.setItem("token", res.data.data.access_token);
          router.push("/paslons");
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err);
        }).finally(() => {
          setLoading(false);
        })
  };
  

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-24">
      <div className="bg-white shadow-xl w-full max-w-md px-10 py-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <LabelInput
            htmlFor="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            placeholder="Masukan email"
          />
          <LabelInput
            htmlFor="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            placeholder="Masukan password"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="flex flex-col gap-2 mt-3">
            <button type="submit" className="bg-blue-500 rounded-lg text-white px-6 py-3 font-bold">
              { loading ? "Loading..." : "Login" }
            </button>
            <a href="#" className="text-blue-500 text-center">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}




