"use client";

import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      setCategoryName("");
      fetchCategories();

      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: "Creating your new category...",
      success: "Category created",
      error: "Error, sorry...",
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
            {editedCategory ? "Update category" : "New category name"}
            {editedCategory && (
              <>
                : <b>{editedCategory.name}</b>
              </>
            )}
            <input
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
              key={c._id}
            >
              <div className="grow">{c.name}</div>

              <div className="flex gap-1">
                <button type="button">Edit</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
