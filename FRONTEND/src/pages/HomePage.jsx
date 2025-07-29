import UrlForm from "../components/UrlForm"

const HomePage = () => {
  let a = 0
  return (
    <div className="bg-amber-50 flex items-center justify-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center">URL SHORTNER</h1>

        <UrlForm />
      </div>
    </div>
)}

export default HomePage