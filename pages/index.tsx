import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [addDomainPrefix, setAddDomainPrefix] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [onlyDomain, setOnlyDomain] = useState(false);
  const [removeSubdomains, setRemoveSubdomains] = useState(false);

  const getMainDomain = (hostname: any) => {
    const parts = hostname.split(".");
    return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
  };

  const processUrls = () => {
    // If no input, set an error and return early
    if (!input.trim()) {
      setOutput(["No input provided."]);
      return;
    }
    let urls = input.split("\n");

    let processedUrls = urls
      .map((url) => {
        try {
          const { protocol, hostname, pathname, search, hash } = new URL(url);
          let domain = removeSubdomains ? getMainDomain(hostname) : hostname;
          let processedUrl = onlyDomain
            ? domain
            : `${protocol}//${domain}${pathname}${search}${hash}`;
          if (addDomainPrefix) {
            processedUrl = `domain:${processedUrl}`;
          }
          return processedUrl;
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    if (removeDuplicates) {
      processedUrls = [...new Set(processedUrls)];
    }

    setOutput(processedUrls);
  };

  return (
    <>
      <Head>
        <title>
          Just the URL - Simplify, Deduplicate and Modify URLs in a Snap
        </title>
      </Head>
      <div className="min-h-screen m-auto mt-12" style={{ width: 800 }}>
        <div className="p-6 bg-stone-200 rounded-2xl">
          <h1 className="text-4xl mb-8 border-b pb-6 border-black">Welcome to Just the URL</h1>
          <p className="mb-6">
            A unique tool designed to make your work with URLs easier and more
            efficient. Whether you are an SEO professional, a developer, or a
            digital marketer, this service is tailored for you.
          </p>
          <h2 className="text-xl mb-3"><strong>Here&apos;s what you can do with our URL Processor:</strong></h2>

          <ul className="mb-6">
            <li>
              <strong>Add Prefixes:</strong> Easily add &quot;domain:&quot; prefix to your list of URLs.
            </li>
            <li>
            <strong>Remove Duplicates:</strong> Clean up your list by removing duplicate URLs
              in just one click.
            </li>
            <li>
            <strong>Extract Domains:</strong> Need only the domain names from your URLs? We&apos;ve
              got you covered.
            </li>
            <li>
            <strong>Remove Subdomains:</strong> Simplify your URLs by removing any subdomains.
            </li>
          </ul>
          <p className="mb-4">
            Our service can be used for a wide range of applications such as
            website auditing, link building, web development, and digital
            marketing strategies. Save time and improve your productivity with
            our URL Processor.
          </p>
          <p>
            Start using the URL Processor today and see the difference it makes
            in your workflow!
          </p>
        </div>
        <div className="w-full mt-12 space-y-4">
          <div className="flex flex-col">
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={addDomainPrefix}
                onChange={(e) => setAddDomainPrefix(e.target.checked)}
              />
              Add &quot;domain:&quot; prefix
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={removeDuplicates}
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
              />
              Remove duplicates
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={onlyDomain}
                onChange={(e) => setOnlyDomain(e.target.checked)}
              />
              Only show domain
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={removeSubdomains}
                onChange={(e) => setRemoveSubdomains(e.target.checked)}
              />
              Remove subdomains
            </label>
          </div>
          <div className="flex space-x-10">
            <div className="w-1/2">
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows={15}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter URLs, one per line"
              />
              <button
                className="w-full mt-8 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none"
                onClick={processUrls}
              >
                Process URLs
              </button>
            </div>
            <ul className="space-y-2 w-1/2">
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows={15}
                value={output.join("\n")}
                readOnly
              />
              {/* {output.map((url, index) => (
              <li key={index} className="">
                {url}
              </li>
            ))} */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
