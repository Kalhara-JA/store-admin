import { format } from 'date-fns';
import prsimadb from "@/lib/prismadb";

import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
    params
}: {
    params: {
        storeId: string;
    }
}) => {
    const categories = await prsimadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
}

export default CategoriesPage;