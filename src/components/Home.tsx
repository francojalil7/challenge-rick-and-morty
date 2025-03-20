"use client";
import { useState } from "react";
import { CharactersGrid, EpisodeGrid } from "./";
import { CharacterProps } from "@/types/Charactets";

export const Home = () => {
  const [firstCharacter, setFirstCharacter] = useState<CharacterProps | null>(
    null
  );
  console.log("🚀 ~ Home ~ firstCharacter:", firstCharacter);
  const [secondCharacter, setSecondCharacter] = useState<CharacterProps | null>(
    null
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-4">
        <CharactersGrid title={"1"} onSelectCharacter={setFirstCharacter} />
        <CharactersGrid title={"2"} onSelectCharacter={setSecondCharacter} />
      </div>
      <EpisodeGrid
        firstCharacter={firstCharacter}
        secondCharacter={secondCharacter}
      />
    </div>
  );
};
