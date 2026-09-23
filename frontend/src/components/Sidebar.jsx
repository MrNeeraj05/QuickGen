import React from "react";
import { useUser, useClerk } from "@clerk/react";
import {
  Eraser,
  FileText,
  Hash,
  Scissors,
  Image,
  SquarePen,
  Users,
  House,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-image", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`
        fixed sm:relative
        top-14 sm:top-0
        bottom-0 left-0
        z-40
        w-64
        shrink-0
        border-r border-gray-100
        bg-white/95
        backdrop-blur-xl
        shadow-xl shadow-purple-500/5
        sm:shadow-none
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
    >
      {/* User */}
      <div className="px-6 pt-7">
        <div className="relative mx-auto w-fit">
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-sm" />

          <img
            src={user?.imageUrl}
            alt="User Avatar"
            className="relative h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
          />

          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
        </div>

        <h1 className="mt-3 truncate text-center text-sm font-semibold text-gray-800">
          {user?.fullName || "QuickGen User"}
        </h1>

        <p className="mt-0.5 truncate text-center text-xs text-gray-400">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-6 my-6 h-px bg-gray-100" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          AI Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) => `
                    group flex items-center gap-3 rounded-xl px-3.5 py-2.5
                    text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-linear-to-r from-indigo-600 via-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/20"
                        : "text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                    }
                `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`
                      h-4.5 w-4.5 shrink-0 transition-transform duration-200
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:scale-110 group-hover:text-purple-600"
                      }
                    `}
                  />

                  <span className="truncate">{label}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4">
        {/* Settings */}
        <button
          onClick={() => openUserProfile()}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-purple-600"
        >
          <Settings className="h-4.5 w-4.5" />
          Account Settings
        </button>

        {/* Sign out */}
        <button
          onClick={() => signOut()}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
