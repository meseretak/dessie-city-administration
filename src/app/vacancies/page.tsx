"use client"
import PageComponent from "@/components/pages/VacancyPage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  const navigateTo = (page: string, extra?: any) => {
    if (page === "service-detail") router.push("/services/" + encodeURIComponent(extra?.serviceId || ""));
    else if (page === "vacancy-detail") router.push("/vacancies/" + encodeURIComponent(extra?.vacancyId || ""));
    else if (page === "news-detail") router.push("/news/" + encodeURIComponent(extra?.newsId || ""));
    else if (page === "bids-detail") router.push("/bids/" + encodeURIComponent(extra?.bidId || ""));
    else router.push("/" + (page === "home" ? "" : page));
  };

  return <PageComponent navigateTo={navigateTo} />;
}
