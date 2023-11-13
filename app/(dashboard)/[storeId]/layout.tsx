import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import prsimadb from "@/lib/prismadb";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prsimadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}