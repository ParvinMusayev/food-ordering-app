"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [image, setImage] = useState( '');
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUptade(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data?.user?.image;
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4 ">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
             <EditableImage link={image} setLink={setImage} />
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

            <input
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              type="tel"
              placeholder="Phone number"
            />
            <input
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
              type="text"
              placeholder="Street address"
            />
            <div className="flex gap-2">
              <input
                value={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
                type="text"
                placeholder="Postal code"
              />
              <input
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                type="text"
                placeholder="City"
              />
            </div>
            <input
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
              type="text"
              placeholder="Country"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
