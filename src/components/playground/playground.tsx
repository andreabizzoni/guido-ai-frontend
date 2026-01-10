import * as React from "react";

import { cn } from "@/lib/utils";

function Playground({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="playground"
      className={cn(
        "flex-7 min-w-[400px] h-full overflow-auto border-r border-border bg-muted/30 p-4",
        className
      )}
      {...props}
    />
  );
}

export { Playground };
