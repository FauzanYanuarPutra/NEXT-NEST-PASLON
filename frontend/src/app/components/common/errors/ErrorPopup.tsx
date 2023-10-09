import { motion } from "framer-motion";
import Link from "next/link";
export const ErrorPopup = (props: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-[#4b4b4b63]">
        <motion.div
          initial={{ opacity: 0,  scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bg-white px-10 py-10 rounded-lg "
        >
          <div className="flex flex-col gap-2">
            <p className="text-red-500 text-lg font-medium">Login Terlebih Dahulu</p>
            <Link href="/auth/login" className="bg-blue-500 flex w-full p-2 text-center rounded-lg justify-center items-center text-white">Login</Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}