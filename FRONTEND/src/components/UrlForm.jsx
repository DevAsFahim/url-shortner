import { useState } from "react";
import axios from "axios";
import { Copy } from "lucide-react";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com/");
  const [shortUrl, setShortUrl] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    const { data } = await axios.post("http://localhost:5000/api/create", {
      url,
    });

    setShortUrl(data);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopyStatus("Copied!");
      setTimeout(() => {
        setCopyStatus("Copy");
      }, 2000);
    } catch (err) {
      setCopyStatus("Failed to copy!");
      console.error("Failed to copy text!", err);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col items-center mt-5"
      >
        <label
          htmlFor="urlInput"
          className="text-sm font-semibold self-start mb-2"
        >
          Enter URL:
        </label>
        <input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="urlInput"
          type="text"
          placeholder="https://example.com"
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button className="bg-blue-500 py-2 text-white w-full rounded-lg mt-4 cursor-pointer hover:bg-blue-700">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="w-full mt-5">
          <p className="text-sm font-semibold self-start mb-2">Shortened URL</p>
          <div className="relative border border-gray-300 p-2 rounded-lg w-full flex justify-between items-center">
            {shortUrl}

            <button className="absolute right-2">
              <button
                onClick={handleCopy}
                className="peer cursor-pointer bg-amber-100 hover:bg-blue-500 hover:text-white p-1 rounded"
              >
                <Copy size={20} strokeWidth={1} />
              </button>
              <div className="peer-hover:block hidden absolute text-white bottom-[calc(100%+10px)] bg-black px-4 py-1 rounded-md -translate-x-1/3">
                {copyStatus}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
