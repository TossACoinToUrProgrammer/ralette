import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "widgets/navbar";

const HomePage = lazy(() => import("./home"));
const AboutPage = lazy(() => import("./about"));
const AuthPage = lazy(() => import("./auth"));
const GamePage = lazy(() => import("./game"));


export const Routing = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};