"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <header className="flex flex-row justify-between text-xl leading-[4rem] font-bold">
      <Link href="/">{t("title")}</Link>
      <div className="flex flex-row items-center z-50">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="mr-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
        <Select value={currentLang} onValueChange={changeLanguage}>
          <SelectTrigger className="w-[180px] z-50">
            <SelectValue placeholder={t("selectLanguage")} />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="en">{t("english")}</SelectItem>
            <SelectItem value="es">{t("spanish")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
