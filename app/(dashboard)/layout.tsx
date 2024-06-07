import React from "react";
import Header from "../../components/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="px-3 lg:px-14">{children}</div>
        </>
    );
};

export default DashboardLayout;
