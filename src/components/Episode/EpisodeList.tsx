"use client";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "next-i18next";
import { useEpisodes } from "@/hooks/useEpisodes";

interface EpisodeListProps {
  config: {
    caption: string;
    data: string[] | undefined;
    select: boolean;
  };
}

export const EpisodeList = ({ config }: EpisodeListProps) => {
  const { t } = useTranslation();
  const { episodes, loading, error } = useEpisodes(config.data?.join(","));

  if (config.select && episodes.length === 0) {
    return (
      <Card className="w-full h-[35vh] flex flex-col p-0 overflow-hidden">
        <div className="overflow-auto flex-1">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-background z-0">
              <TableRow>
                <TableHead className="w-[100px]">{t("season")}</TableHead>
                <TableHead>{t("episodeName")}</TableHead>
                <TableHead>{t("airDate")}</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="w-full text-center my-5">{t("noCoincidence")}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[35vh] flex flex-col p-0.5 rounded-sm overflow-hidden">
      <div className="overflow-auto flex-1">
        <Table className="w-full">
          {!config.select && (
            <TableCaption>{t("mustSelectCharacter")}</TableCaption>
          )}
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="w-[100px]">{t("season")}</TableHead>
              <TableHead>{t("episodeName")}</TableHead>
              <TableHead>{t("airDate")}</TableHead>
              <TableHead>{t("episodes")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {episodes?.map(({ episode, air_date, name }, index) => (
              <TableRow key={`${index}-${index}`}>
                <TableCell className="font-medium">{episode}</TableCell>
                <TableCell>{name.split(" ").slice(0, 2).join(",")}</TableCell>
                <TableCell>{air_date}</TableCell>
                <TableCell>{episodes.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
