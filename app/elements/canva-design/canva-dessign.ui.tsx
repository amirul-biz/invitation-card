"use client";

import Image from "next/image";
import { canvaImagesConfig } from "../../config/config-app-environment";
import { CanvaImageConfig } from "@/app/config/config-app-environment-interface";
import { useEffect, useRef, useState } from "react";
import {
  GETCanvaExportJobID,
  GETExportDesign,
} from "@/app/api/api-canva-export-id/route";

export async function getExportID(): Promise<string | null> {
  try {
    const res = await fetch("/api/api-canva-export-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ design_id: "DAGplmJOHbw" }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${res.status} ${text}`);
    }

    const data = (await res.json()) as GETCanvaExportJobID;
    console.log("Export ID and data:", data);
    return data.job.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getExportDesign(export_id: string): Promise<any> {
  const res = await fetch("/api/api-canva-export-design", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ export_id }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as GETExportDesign;
  return data;
}

export async function getPollExportDesignUrl(exportId: string) {
  while (true) {
    try {
      const exportData = await getExportDesign(exportId);
      console.log("Export status data:", exportData);

      if (
        exportData.job?.status === "success" &&
        exportData.job.urls?.length > 0
      ) {
        console.log("Export ready! URLs:", exportData.job.urls);
        return exportData.job.urls as string[];
      }

      // wait 3 seconds before next poll
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
      console.error("Polling error:", error);
      break; // stop polling on error
    }
  }
}

export async function getPollExportIdUrl(): Promise<string | null> {
  while (true) {
    try {
      const exportIdData = await getExportID();
      console.log("Export status data:", exportIdData);

      if (exportIdData) {
        console.log("Export ID ready:", exportIdData);
        return exportIdData;
      }

      // Wait 3 seconds if no data yet (but no error)
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error: any) {
      console.error("Polling error (export ID):", error);

      // Determine wait time on error
      let waitTime = 60000;

      // If fetch gives 429 (rate limit), back off for 60 seconds
      if (error?.status === 429 || error?.message?.includes("429")) {
        waitTime = 60000;
        console.warn(
          `Rate limited: waiting ${waitTime / 1000}s before retrying...`
        );
      } else {
        waitTime = 10000; // Other errors, wait 10s
        console.warn(`Non-rate error: retrying in ${waitTime / 1000}s...`);
      }

      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

export function CanvaDesign() {
  const [urlList, setUrlList] = useState<string[]>([]);
  const hasRun = useRef(false); // ← here

  async function fetchExport() {
    const exportIdUrl = await getPollExportIdUrl();
    if (!exportIdUrl) return;

    const urls = await getPollExportDesignUrl(exportIdUrl);
    if (!Array.isArray(urls)) return;

    setUrlList(urls);
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    fetchExport();
  }, []);

  return (
    // <>
    //   {/* Show exported design images if available, else fallback to canvaImagesConfig */}
    //   {exportData?.exports?.length > 0 ? (
    //     exportData.exports.map((exportItem: any, index: number) => (
    //       <div
    //         key={index}
    //         className="relative w-full max-w-md mx-auto aspect-[1200/2100] shadow-md rounded-lg overflow-hidden mb-2"
    //       >
    //         <Image
    //           src={exportItem.url}
    //           alt={`Exported image ${index + 1}`}
    //           fill
    //           className="object-contain"
    //           priority
    //           sizes="(max-width: 768px) 100vw, 400px"
    //         />
    //       </div>
    //     ))
    //   ) : (
    //     canvaImagesConfig.map((img: CanvaImageConfig) => (
    //       <div
    //         key={img.id}
    //         className="relative w-full max-w-md mx-auto aspect-[1200/2100] shadow-md rounded-lg overflow-hidden mb-2"
    //       >
    //         <Image
    //           src={img.url}
    //           alt={img.alt}
    //           fill
    //           className="object-contain"
    //           priority
    //           sizes="(max-width: 768px) 100vw, 400px"
    //         />
    //       </div>
    //     ))
    //   )}
    // </>
    <>
      {/* Show exported design images if available, else fallback to canvaImagesConfig */}
      <>
        {urlList && urlList.length > 0 ? (
          urlList.map(
            (url, index) =>
              url && (
                <div
                  key={index}
                  className="relative w-full max-w-md mx-auto aspect-[1200/2100] shadow-md rounded-lg overflow-hidden mb-2"
                >
                  <Image
                    src={url}
                    alt={`Exported Canva Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              )
          )
        ) : (
          <div className="flex items-center justify-center w-full h-[80vh]">
            <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
          </div>
        )}
      </>
    </>
  );
}
