'use client'
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import signOutUser from "@/firebase/auth/signout";

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user != null) {
            signOutUser()
        }
        router.push("/")
    }, [user])

    return (
        <>
        </>
    );
}

