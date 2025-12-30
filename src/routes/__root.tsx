import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import TopBar from "@/components/TopBar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <main className="h-screen flex flex-col">
        <TopBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      <Toaster position="top-center" />
    </React.Fragment>
  );
}
