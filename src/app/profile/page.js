"use client";

import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
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
        <div className="flex gap-4 ">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <Image
                className="rounded-lg w-full h-full mb-2"
                src={userImage ? userImage : "/profilpic.png"}
                alt="avatar"
                width={250}
                height={250}
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
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
