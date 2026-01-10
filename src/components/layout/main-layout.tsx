import * as React from "react";

import { cn } from "@/lib/utils";

function MainLayout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="main-layout"
      className={cn("flex h-screen w-screen overflow-x-auto", className)}
      {...props}
    />
  );
}

export { MainLayout };
