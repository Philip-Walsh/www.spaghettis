import { Markdown } from 'components/markdown';
import Link from 'next/link';

export const metadata = {
    title: 'Edge Functions'
};

const explainer = `
This page is using a [Netlify Edge Function](https://docs.netlify.com/edge-functions/overview/) to rewrite the URL based on visitor geography.

For it to be invoked, please either run this site locally with \`netlify dev\` or deploy it to Netlify.

Edge Functions are framework-agnostic, but are also used behind the scenes to run Next.js Middleware on Netlify.
There are advantages to using Edge Functions directly, such as the ability to access & transform the response body.

[See more examples](https://edge-functions-examples.netlify.app)
`;

export default function EdgeFunctionsPage() {
    return (
        <>
            <h1 className="mb-8">Edge Functions Demo</h1>
            <Markdown content={explainer} />
            
            <div className="mt-8 p-6 bg-blue-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Amazon Q Edge Function Demos</h2>
                <p className="mb-4">
                    Check out our new edge function demos built with Amazon Q:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <Link href="/edge/device-optimize" className="text-blue-300 hover:text-blue-100 underline">
                            Device Optimization Demo
                        </Link>
                        <span className="ml-2 text-sm bg-blue-600 px-2 py-1 rounded">Built by Amazon Q</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
