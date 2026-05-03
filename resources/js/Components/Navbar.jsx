import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                    <span className="font-extrabold text-xl text-orange-600 tracking-tight">
                        BlitarHub<span className="text-gray-900">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        href={route('dashboard')} 
                        className={`text-sm font-bold transition-colors ${route().current('dashboard') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        href={route('talents.index')} 
                        className={`text-sm font-bold transition-colors ${route().current('talents.index') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                        Talent Hub
                    </Link>
                    <Link 
                        href={route('mentorships.index')} 
                        className={`text-sm font-bold transition-colors ${route().current('mentorships.index') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                        Mentorships
                    </Link>
                    <Link 
                        href={route('scholarships.index')} 
                        className={`text-sm font-bold transition-colors ${route().current('scholarships.index') ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                        Scholarships
                    </Link>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <div className="hidden sm:flex sm:items-center">
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="flex items-center gap-2 group focus:outline-none">
                                                <div className="text-right hidden lg:block">
                                                    <p className="text-sm font-bold text-gray-900 leading-none group-hover:text-orange-600 transition">{user.name}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">Verified Account</p>
                                                </div>
                                                <div className="relative">
                                                    <img 
                                                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}`} 
                                                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:border-orange-200 transition object-cover"
                                                    />
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <div className="px-4 py-2 border-b border-gray-50 lg:hidden">
                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                            </div>
                                            <Dropdown.Link href={route('profile.edit')}>My Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                <span className="text-red-600">Log Out</span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-orange-600 transition focus:outline-none"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link 
                            href={route('login')} 
                            className="bg-gray-900 text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-orange-600 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-50 animate-in slide-in-from-top duration-200`}>
                <div className="space-y-1 pb-3 pt-2 px-4">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('talents.index')} active={route().current('talents.index')}>Talent Hub</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('mentorships.index')} active={route().current('mentorships.index')}>Mentorships</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('scholarships.index')} active={route().current('scholarships.index')}>Scholarships</ResponsiveNavLink>
                </div>

                {user && (
                    <div className="border-t border-gray-100 pb-1 pt-4 px-4">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-base font-bold text-gray-900">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
