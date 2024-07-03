'use client'
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [data, setData] = useState<DocumentSnapshot<DocumentData, DocumentData> | null>();
    const [userNumber, setUserNumber] = useState(-1);

    useEffect(() => {
        if (user == null) router.push("/")
        getData('users', 'user-id').then(
            ({ result, error }) => {
                if (error) {
                    return console.log(error)
                }
                setData(result)
                setUserNumber(result?.data()?.number || -1)
                console.log("data", result)
                return result
            }
        )
    }, [user])

    const handleForm = async () => {
        const data = {
            number: Math.floor(Math.random() * 100)
        }
        const { result, error } = await addData('users', 'user-id', data)

        if (error) {
            return console.log(error)
        }

        setUserNumber(data.number)

        console.log("success", result)
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 flex flex-col items-center justify-center rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                    Admin Pages
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Your number: {userNumber}
                    </h2>
                    <button
                        onClick={handleForm}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Set random number
                    </button>
                </div>
            </div>
        </div>
    );
}

