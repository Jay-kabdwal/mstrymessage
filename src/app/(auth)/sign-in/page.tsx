'use client';

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>Signed in as {session.user?.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return(
    <>
      <div>Not signed in</div>
      <button className="bg-amber-600 p-3 m-4 rounded-md" onClick={() => signIn()}>Sign in</button>
    </>
  )
};

export default SignInPage;
