"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useState } from "react";

export default function MenuItemsPage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl mx-auto ">
        <div
          style={{ gridTemplateColumns: ".3fr .7fr" }}
          className="gird items-start gap-4"
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
            />
            <label>Description</label>
            <input
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              type="text"
            />
            <label>Base price</label>
            <input
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
              type="text"
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
