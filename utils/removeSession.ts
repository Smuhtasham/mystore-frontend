"use server";
import { cookies } from "next/headers";

const removeSession = async () => {
    const cookieStore = await cookies();
    const sessionStatus = cookieStore.get("token");
    console.log("Session status:", sessionStatus); // Debugging line

    if (sessionStatus) {
        cookieStore.set("token", "", { 
            path: "/", 
            expires: new Date(0) // Set to past date to remove the cookie
        });
        return true; // Cookie successfully removed
    } else {
        return false; // No cookie found to delete
    }
};

export default removeSession;
