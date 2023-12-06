import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prsimadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new Response("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new Response("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new Response("Store ID is required", { status: 400 });
        }

        const store = await prsimadb.store.update({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new Response("Unauthenticated", { status: 401 });
        }

        if (!params.storeId) {
            return new Response("Store ID is required", { status: 400 });
        }

        const store = await prsimadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}