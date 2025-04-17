import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Forbidden Ramen</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create your perfect bowl of ramen with our custom configurator
          </p>
          <Link href="/ramen" className="inline-block">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium text-lg hover:bg-blue-700 transition-colors">
              Start Building Your Ramen
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
