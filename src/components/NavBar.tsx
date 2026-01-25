'use client';
import logo from '@/components/logo.png'
import Link from 'next/link';

interface NavLink {
  id: number;
  name: string;
  href: string;
}

const navLinks: NavLink[] = [{
  id: 1,
  name: 'Home',
  href: '/'
}, {
  id: 2,
  name: 'About',
  href: '/about'
}, {
  id: 3,
  name: 'Features',
  href: '/features'
}, {
  id: 4,
  name: 'Insurance',
  href: '/insurance'
}, {
  id: 5,
  name: 'Contact',
  href: '/contact'
}];

const NavBar = () => {
  return (
    <div>
      <ul className=''>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.href} className="text-white text-sm lg:text-lg font-medium mx-3 lg:mx-6 hover:text-[#22BBF9]">
              {link.name}
            </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

const Header = () => {
  return (
    <header className='bg-[#2a4791] w-[90%] h-13 md:h-15 lg:h-18.75 fixed top-5 lg:top-7 rounded-full border-2 border-[#22BBF9] flex items-center justify-between px-4 lg:px-8'>
      <img src={logo.src} alt="Logo" className=""/>
      <nav className='h-screen w-70'>
        <NavBar/>
      </nav>
    </header>
  )
}

export default Header
