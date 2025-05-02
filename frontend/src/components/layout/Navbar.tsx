import React from "react";
import { Link } from "react-router-dom";
import { Gamepad } from "lucide-react";
import { Button } from "../ui/button";


const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Game Management System
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Games
              </Button>
            </Link>
            <Link to="/games/new">
              <Button size="sm">Add Game</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
