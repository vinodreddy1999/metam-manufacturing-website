"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["Product","/product"],["Modules","/modules"],["Customers","/customers"],["Compare","/compare"],["Pricing","/pricing"]];

export default function Nav(){
  const [open,setOpen]=useState(false); const path=usePathname();
  return <header className="site-header"><div className="nav shell"><Link href="/" className="brand" aria-label="METAM home"><span className="brand-mark"><i/><b/></span><span>METAM<small>Manufacturing intelligence</small></span></Link><nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">{links.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} className={path.startsWith(href)?"active":""} href={href}>{label}</Link>)}<Link onClick={()=>setOpen(false)} className="nav-cta" href="/pricing">Request access <span>↗</span></Link></nav><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><i/><i/><i/></button></div></header>
}
