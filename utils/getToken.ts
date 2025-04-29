
"use server";
import { cookies } from "next/headers";

const getToken = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("token");
  return session?.value || "";
};

export default getToken;
