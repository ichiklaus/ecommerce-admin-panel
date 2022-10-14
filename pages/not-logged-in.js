import React from 'react';
import Link from 'next/link';

export default function NotLoggedIn() {
  return(
    <div>
      <h1>Not Logged in</h1>
      <p>Please <Link href='/'><a>login</a></Link> to access this site</p>
    </div>
  )
}