import { useNavigate } from "react-router";
import { getPathForPage } from "../app/routes";
import type { AppPage } from "../types/navigation";

export function useAppNavigate() {
  const navigate = useNavigate();

  return (page: AppPage) => {
    navigate(getPathForPage(page));
    window.scrollTo(0, 0);
  };
}

