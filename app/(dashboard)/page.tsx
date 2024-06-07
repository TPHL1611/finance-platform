"use client";

import { Button } from "@/components/ui/button";
import useNewAccount from "@/features/accounts/hooks/use-new-account";
import { PlusCircleIcon } from "lucide-react";

export default function Home() {
    const { onOpen } = useNewAccount();
    return (
        <div>
            <Button onClick={onOpen} className="flex gap-x-2">
                <PlusCircleIcon className="w-4 h-4" />
                <span>Add an account</span>
            </Button>
        </div>
    );
}
