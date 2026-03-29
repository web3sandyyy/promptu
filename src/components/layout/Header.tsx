import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCategoryBySlug } from "@/constants";

export function Header() {
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;

    // Handle root path
    if (path === "/") {
      return (
        <>
          <span className="text-foreground">PROMPTU</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">HOME</span>
        </>
      );
    }

    // Split path into segments
    const segments = path.split("/").filter(Boolean);
    const mainPage = segments[0]?.toUpperCase() || "";

    // Handle library with category
    if (segments[0] === "library" && segments[1]) {
      const categorySlug = segments[1];
      const category = getCategoryBySlug(categorySlug);
      const categoryDisplay = category
        ? category.title.replace(/ & /g, "_").replace(/ /g, "_").toUpperCase()
        : categorySlug.toUpperCase();

      return (
        <>
          <span className="text-foreground">PROMPTU</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">LIBRARY</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{categoryDisplay}</span>
        </>
      );
    }

    // Handle other routes
    return (
      <>
        <span className="text-foreground">PROMPTU</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground">{mainPage}</span>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-10 flex p-3 shrink-0 items-center gap-2 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">&gt;</span>
          {getBreadcrumb()}
          <span className="cursor-blink text-foreground"></span>
        </div>
      </div>
    </header>
  );
}
