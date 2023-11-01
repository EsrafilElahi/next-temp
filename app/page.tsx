"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllUsers, setUser } from "@/store/slices/userSlice";

export default function Home() {
  const state = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  console.log("states", state);

  const handleFetchAllUsers = async () => {
    try {
      await dispatch(fetchAllUsers()).unwrap();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSetUser = async () => {
    try {
      dispatch(setUser("nazanin"));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = async () => {
    await handleSetUser();
    await handleFetchAllUsers();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span>Home Next Page</span>
      <button onClick={handleClick}>click me</button>
    </main>
  );
}
