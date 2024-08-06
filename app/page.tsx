import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl text-black font-bold mb-4">Welcome to Math Quiz</h1>
      <p className="text-lg text-black mb-6">Select a subject to start reviewing:</p>
      <ul className="space-y-4">
        <li>
          <Link href="/exp" className="text-blue-500 hover:text-blue-700 underline">
          Exponent Laws
          </Link>
        </li>
        {/* Add more links here for other subjects */}
      </ul>
    </div>
  );
}
