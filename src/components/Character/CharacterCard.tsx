import React from "react";
import { Badge } from "../ui/badge";

interface CharacterCardProps {
  name: string;
  species: string;
  status: string;
  image: string;
  onClick: () => void;
  selected: boolean; // Add selected prop
}

export const CharacterCard = ({
  name,
  species,
  status,
  image,
  onClick,
  selected,
}: CharacterCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`shadow-sm overflow-hidden outline-0 focus:ring-2 hover:ring-2 ring-primary duration-300 rounded-lg transition-shadow ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex">
        <img
          src={image}
          alt={name}
          className="w-1/2 object-cover transition-all duration-300 hover:scale-105"
        />
        <div className="p-3 w-1/2">
          <h2 className="font-medium text-sm mb-1">
            {name.split(" ").slice(0, 2).join(" ")}
          </h2>
          <Badge
            className={status === "Alive" ? "bg-green-400" : "bg-gray-300"}
          >
            {status}
          </Badge>
          <p className="font-medium text-xs m-0.5">{species}</p>
        </div>
      </div>
    </div>
  );
};
