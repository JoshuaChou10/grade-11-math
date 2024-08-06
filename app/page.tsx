import Link from 'next/link';


export default function Home() {
  return (
    <>
      <h1>Welcome to the Study App</h1>
      <p>Select a subject to start reviewing:</p>
      <ul>
        <li><Link href="/exp">Math: Exponent Laws</Link></li>
        {/* Add more links here for other subjects */}
      </ul>
    </>
  );
}
