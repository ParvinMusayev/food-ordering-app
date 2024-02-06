"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";

import { useProfile } from "@/components/UseProfile";

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState("");

  const { loading: profileLoading, data: profileData } = useProfile();

  function handleNewCategorySubmit() {
    ev.preventDefault();
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName }),
    });
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New category name</label>
            <input
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
