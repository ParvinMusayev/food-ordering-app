"use client"

import {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {redirect} from "next/navigation";

//components
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

//icons
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";


export default function NewMenuItemPage() {
    const {loading, data} = useProfile();

    if (loading) {
        return 'Loading user info...';
      }
    
      if (!data.admin) {
        return 'Not an admin.';
      }

      return (
        <section className="mt-8">
              <UserTabs isAdmin={true} />
        </section>
      )
}