"use client";
import { PATHS } from "@/config/paths";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="row-start-4 mb-5 flex items-center justify-center text-gray-500">
      {t("footer")}
      <Link href={PATHS.github} target="_blank" className="m-1 underline">
        <span>Franco Jalil</span>
      </Link>
    </footer>
  );
};
