import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

export function BaseRoutes() {
    return (
        <>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}