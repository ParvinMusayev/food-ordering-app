"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("")
  const { status } = session;

  useEffect(() => {
    if(status === 'authenticated'){
        setUserName(session.data.user.name)
    }
  }, [session, status])


  async function handleProfileInfoUptade(ev){
    ev.preventDefault()

    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: userName}),
      });
  }

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data?.user?.image;
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            
            <div className="p-2 rounded-lg relative">
              <Image
                className="rounded-lg w-full h-full mb-2"
                src={userImage ? userImage : "/profilpic.png"}
                alt="avatar"
                width={250}
                height={250}
              />
              <button type="button">Edit</button>
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUptade}>
            <input
              type="text"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="First and last name"
            />
            <input type="email" value={session.data.user.email} disabled />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
