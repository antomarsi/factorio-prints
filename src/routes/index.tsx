import { Route } from "react-router";
import { Routes } from "react-router";
import MostRecentPage from "./MostRecentPage";
import AccountSettingsPage from "./SettingsPage";

export default (
    <Routes>
        <Route index element={<MostRecentPage />} />
        <Route path="/account" element={<AccountSettingsPage />} />
    </Routes>
);
