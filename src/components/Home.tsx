"use client";
import { useState } from "react";
import { CharactersGrid, EpisodeGrid } from "./";
import { CharacterProps } from "@/types/Charactets";

export const Home = () => {
  const [firstCharacter, setFirstCharacter] = useState<CharacterProps | null>(
    null
  );

  const [secondCharacter, setSecondCharacter] = useState<CharacterProps | null>(
    null
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <CharactersGrid onSelectCharacter={setFirstCharacter} initialPage={1} />
        <CharactersGrid
          onSelectCharacter={setSecondCharacter}
          initialPage={2}
        />
      </div>
      <EpisodeGrid
        firstCharacter={firstCharacter}
        secondCharacter={secondCharacter}
      />
    </div>
  );
};
