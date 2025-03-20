import { useTranslation } from "next-i18next";
import { CharacterProps } from "../../types/Charactets";
import { useEpisodes } from "@/hooks/useEpisodes";
import { EpisodeList } from "./";

interface EpisodeListProps {
  firstCharacter: CharacterProps | null;
  secondCharacter: CharacterProps | null;
}
export const EpisodeGrid = ({
  firstCharacter,
  secondCharacter,
}: EpisodeListProps) => {
  const { t } = useTranslation();
  const extractEpisodeNumber = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  const episodesFirstCharacter = firstCharacter?.episode.map((ep) =>
    extractEpisodeNumber(ep)
  );

  const episodesSecondCharacter = secondCharacter?.episode.map((ep) =>
    extractEpisodeNumber(ep)
  );
  const shaderEpisodes = episodesFirstCharacter?.filter((ep) =>
    episodesSecondCharacter?.includes(ep)
  );
  console.log("🚀 ~ shaderEpisodes:", shaderEpisodes);

  const tableConfigs = [
    {
      caption: t("firstEpisodeList"),
      data: episodesFirstCharacter,
      select: firstCharacter ? true : false,
    },
    {
      caption: t("sharedEpisodeList"),
      data: shaderEpisodes,
      select: firstCharacter && secondCharacter ? true : false,
    },
    {
      caption: t("secondEpisodeList"),
      data: episodesSecondCharacter,
      select: secondCharacter ? true : false,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 h-[50vh]">
      {tableConfigs.map((config, index) => (
        <EpisodeList key={index} config={config} />
      ))}
    </div>
  );
};
