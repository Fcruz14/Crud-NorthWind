import React from "react";
import { Link } from "react-router-dom";

interface DafaultLayoutProps{
  children: React.ReactNode
}

function Home({children}:DafaultLayoutProps) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Home;
