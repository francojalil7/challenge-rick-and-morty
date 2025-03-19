import Link from "next/link";

export const Header = () => {
  return (
    <header className="text-xl leading-[4rem] font-bold">
      <Link href="/">Rick and Morty</Link>
    </header>
  );
};
