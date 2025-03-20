"use client";
import { CharacterCard } from "./";
import { useTranslation } from "next-i18next";
import { useCharacters } from "@/hooks/useCharacters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CharacterProps } from "@/types/Charactets";

interface CharactersGridProps {
  title: string;
  onSelectCharacter: (character: CharacterProps | null) => void;
}

export const CharactersGrid = ({
  title,
  onSelectCharacter,
}: CharactersGridProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { characters, totalPages } = useCharacters(currentPage);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectCharacter = (character: CharacterProps) => {
    if (selectedCharacterId === character.id) {
      setSelectedCharacterId(null);
      onSelectCharacter(null); // Ensure null is passed to the parent
    } else {
      setSelectedCharacterId(character.id);
      onSelectCharacter(character);
    }
  };
  return (
    <div className="flex-1 h-[50vh] border rounded-lg flex flex-col">
      <h1 className="p-4">
        {t("characters")} {title}
      </h1>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              species={character.species}
              status={character.status}
              image={character.image}
              selected={selectedCharacterId === character.id}
              onClick={() => handleSelectCharacter(character)}
            />
          ))}
        </div>
      </div>
      <Pagination className="p-4">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className={`${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronLeft /> {t("previous")}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={handleNext}
              className={`${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              {t("next")} <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
