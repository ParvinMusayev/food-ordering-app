"use clinet"

import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function MenuItemsPage() {
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex"
          href={'/menu-items/new'}>
          <span>Crete new menu item</span>
          <Right />
        </Link>
      </div>
    </section>
  );
}
