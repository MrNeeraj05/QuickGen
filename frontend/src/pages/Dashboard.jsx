import React, { useEffect, useState } from "react";
import { Gem, Sparkles, WandSparkles } from "lucide-react";
import { Show, useAuth } from "@clerk/react";
import CreationItem from "../components/CreationItem";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setCreations(data.creations || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getDashboardData();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="min-h-full bg-[#fafaff] p-5 sm:p-7">
      {/* Header */}
      <div className="mb-7">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
          <WandSparkles className="h-3.5 w-3.5" />
          AI Workspace
        </div>

        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Welcome back 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create, manage and explore your AI creations.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        {/* Total Creations */}
        <div className="group flex w-full max-w-sm items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Creations</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {creations.length}
            </h2>

            <p className="mt-1 text-xs text-gray-400">AI creations generated</p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="group flex w-full max-w-sm items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Plan</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              <Show when={{ plan: "premium" }} fallback="Free">
                Premium
              </Show>
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              <Show
                when={{ plan: "premium" }}
                fallback="Upgrade to unlock more"
              >
                All premium features unlocked
              </Show>
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-110">
            <Gem className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="mt-10 animate-spin rounded-full h-11 w-11 border-3 border-purple-200 border-t-purple-600"></div>
        </div>
      ) : (
        <div className="mt-9">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Recent Creations
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                Your latest AI generated content
              </p>
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
              {creations.length} items
            </span>
          </div>

          <div className="space-y-3">
            {creations.length > 0 ? (
              creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-purple-300" />

                <p className="mt-3 font-medium text-slate-600">
                  No creations yet
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Start creating something with QuickGen AI.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
