import {  SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'
 
const Navbar = () => {
  return (
    <div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <SignedOut>
        <SignInButton><button>Sign in</button></SignInButton></SignedOut>
        <SignedIn><SignOutButton><button>Sined out</button></SignOutButton></SignedIn>

      </ul>
    </div>
  )
}

export default Navbar
