"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";

import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";

const SheetProvider = () => {
    //Hook kiểm tra component đã được mount hay chưa
    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <EditAccountSheet />
            <EditCategorySheet />
            <NewAccountSheet />
            <NewCategorySheet />
        </>
    );
};

export default SheetProvider;
