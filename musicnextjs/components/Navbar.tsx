'use client';

import React, { act, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div 
    className={cn("fixed top-10 inset-x-0 mt-5 max-w-2xl mx-auto z-50 bg-black-800 color-white", className)}
    >
        <Menu  setActive={setActive}  >
            <Link href={"/"}>
            <MenuItem  setActive={setActive} active={active} item="Home">
           
            </MenuItem >
            </Link>
            
            <MenuItem setActive={setActive} active={active} item="Our-courses">
            <div className=" flex flex-col space-y-3 ">
              <HoveredLink href="/courses" >All courses</HoveredLink>
            <HoveredLink href="/courses" >Basic Music Theory</HoveredLink>
            <HoveredLink href="/courses" >Advanced Composition</HoveredLink>
            <HoveredLink href="/courses" >Song writing</HoveredLink>
            <HoveredLink href="/courses" >Interface Design</HoveredLink>

            </div>

            </MenuItem>
            
            
             <Link href={"/contact"}>
            <MenuItem  setActive={setActive} active={active} item="Contact-Us">
           
            </MenuItem >
            </Link>
           

        </Menu>
    
    
    </div>
  )
}

export default Navbar