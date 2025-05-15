import { Link } from "@remix-run/react";
import siteLogo from "~/assets/svg/gamelog-logo.svg";

export default function Footer() {
  return (
    <nav className="container mx-auto flex justify-between p-8">
      <div>
        <Link to="/">
          <img src={siteLogo} alt="Gamelog logo" />
        </Link>
      </div>
      <div className="flex gap-8 items-end justify-end flex-wrap ">
        <Link to="/add-game">Add Game</Link>
        <Link to="/games">Games</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </nav>
  );
}
