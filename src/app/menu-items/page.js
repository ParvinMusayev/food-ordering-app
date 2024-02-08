"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }
  return <div>Menu items</div>;
}
