import { useState, useEffect } from "react";

export const useScrollSpy = (navItems: string[]) => {
  // Always start empty on server and client to avoid hydration mismatch
  // from reading window.location.hash during the initial render.
  const [currentSection, setCurrentSection] = useState<string>("");

  useEffect(() => {
    const initialHash = window.location.hash.slice(1);
    if (initialHash && navItems.includes(initialHash)) {
      setCurrentSection(initialHash);
    }

    const sectionVisibility = new Map<string, number>();

    const updateHash = (section: string) => {
      if (typeof window === "undefined") return;
      const newHash = section ? `#${section}` : "";
      const currentHash = window.location.hash;

      if (section && currentHash !== newHash) {
        history.replaceState(null, "", newHash);
      } else if (!section && currentHash) {
        history.replaceState(null, "", window.location.pathname);
      }
    };

    const findMostVisibleSection = () => {
      let maxVisibility = -1;
      let mostVisibleSection = "";

      navItems.forEach((id) => {
        const visibility = sectionVisibility.get(id);
        if (visibility !== undefined && visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = id;
        }
      });

      return mostVisibleSection;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisibility.set(entry.target.id, entry.intersectionRatio);
          } else {
            sectionVisibility.delete(entry.target.id);
          }
        });

        const mostVisible = findMostVisibleSection();
        setCurrentSection(mostVisible);
        updateHash(mostVisible);
      },
      {
        rootMargin: "-100px 0px -50% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    navItems.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return currentSection;
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

