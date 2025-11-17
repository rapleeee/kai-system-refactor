import * as React from "react";
import { cn } from "@/lib/utils";

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <aside ref={ref} className={cn("flex flex-col gap-6 text-sm text-slate-600", className)} {...props} />
  ),
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 text-slate-900", className)} {...props}>
      {children}
    </div>
  ),
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-1 flex-col gap-6 overflow-y-auto pr-2", className)} {...props}>
      {children}
    </div>
  ),
);
SidebarContent.displayName = "SidebarContent";

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(({ className, title, children, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {title ? <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">{title}</p> : null}
    <div className="space-y-1.5">{children}</div>
  </div>
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  ),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, active, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "w-full rounded-lg px-2 py-1 text-left text-sm font-medium transition",
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-800",
        className,
      )}
      {...props}
    >
      <span className="text-sm font-semibold leading-tight">{children}</span>
    </button>
  ),
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs text-slate-500", className)} {...props}>
      {children}
    </div>
  ),
);
SidebarFooter.displayName = "SidebarFooter";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
};
