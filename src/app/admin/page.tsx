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
    const dataNumber = data?.data()?.number ?? -1

    useEffect(() => {
        if (user == null) router.push("/")
        getData('users', 'user-id').then(
            ({ result, error }) => {
                if (error) {
                    return console.log(error)
                }
                setData(result)
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

        console.log("success", result)
    }

    return (
    <>
    <h1>
        Only logged in users can view this page
    </h1>
    <div>
        <h2>Your number: {dataNumber}</h2>
        <button onClick={handleForm}>
            set random number
        </button>
    </div>
    </>
    );
}

