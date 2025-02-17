import {  SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
 
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg   font-bold">MyApp</div>
            <div className="flex space-x-4">
                <SignedIn>
                    <SignOutButton>
                        <button className="bg-red-500 text-white px-8 py-2 rounded">Sign Out</button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className="bg-blue-500 text-white px-3 py-2 rounded">Sign In</button>
                    </SignInButton>
                </SignedOut>
            </div>

            
        </div>
    </nav>
  )
}

export default Navbar
