"use client";

import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function EditMenuItemPage() {
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
    </section>
  );
}
