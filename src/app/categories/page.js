"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setIsAdmin(data.admin);
      });
    });
  }, []);

  if(!isAdmin){
    return "Not an admin"

  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      categories
    </section>
  );
}
