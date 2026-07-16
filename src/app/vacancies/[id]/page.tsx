"use client"
import PageComponent from "@/components/pages/VacancyDetailPage";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  
  const navigateTo = (page: string, extra?: any) => {
    if (page === "service-detail") router.push("/services/" + encodeURIComponent(extra?.serviceId || ""));
    else if (page === "vacancy-detail") router.push("/vacancies/" + encodeURIComponent(extra?.vacancyId || ""));
    else if (page === "news-detail") router.push("/news/" + encodeURIComponent(extra?.newsId || ""));
    else if (page === "bids-detail") router.push("/bids/" + encodeURIComponent(extra?.bidId || ""));
    else router.push("/" + (page === "home" ? "" : page));
  };

  return <PageComponent vacancyId={decodeURIComponent(unwrappedParams.id)} navigateTo={navigateTo} />;
}
