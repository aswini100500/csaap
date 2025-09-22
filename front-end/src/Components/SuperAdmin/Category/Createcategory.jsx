import { useState } from "react";
import { Clock, Plus } from "lucide-react";

function CategoryCreate({ onView }) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 mb-6 ">
        <Clock size={16} />
        <span className="text-sm">Admin Console /</span>
        <a
          href="#"
          className="text-purple-700 font-semibold hover:underline text-sm"
        >
          Category
        </a>
      </div>

      {/* Top Right View Button */}
      <div className="flex justify-end mb-4 rounded-2xl">
        <button
          onClick={onView}
          className="bg-purple-800 text-white py-2 px-4 rounded shadow hover:bg-purple-900 transition"
        >
          + View
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-gray-50 rounded-md shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Category Create
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Category Name */}
          <div className="flex flex-col">
            <label
              htmlFor="categoryName"
              className="mb-1 text-gray-700 font-medium"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Category Name"
              className="bg-purple-100 border border-purple-300 rounded px-3 py-2 text-sm placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Page Url */}
          <div className="flex flex-col">
            <label htmlFor="pageUrl" className="mb-1 text-gray-700 font-medium">
              Page Url
            </label>
            <input
              type="text"
              id="pageUrl"
              placeholder="Page Url"
              className="bg-purple-100 border border-purple-300 rounded px-3 py-2 text-sm placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Icon File */}
          <div className="flex flex-col">
            <label
              htmlFor="iconFile"
              className="mb-1 text-gray-700 font-medium"
            >
              Icon
            </label>
            <input
              type="file"
              id="iconFile"
              className="bg-purple-100 border border-purple-300 rounded px-3 py-1 text-sm placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent cursor-pointer"
            />
          </div>

          {/* Order */}
          <div className="flex flex-col">
            <label htmlFor="order" className="mb-1 text-gray-700 font-medium">
              Order
            </label>
            <input
              type="number"
              id="order"
              placeholder="Order"
              className="bg-purple-100 border border-purple-300 rounded px-3 py-2 text-sm placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          {/* Save Button */}
          <div className="md:col-span-4">
            <button
              type="submit"
              className="mt-4 bg-purple-900 text-white px-6 py-2 rounded shadow hover:bg-purple-700 transition font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CategoryList({ onAddNew }) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 mb-6 ">
        <Clock size={16} />
        <span className="text-sm">Admin Console /</span>
        <a
          href="#"
          className="text-purple-700 font-semibold hover:underline text-sm"
        >
          Category
        </a>
      </div>

      {/* Top Action Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-purple-800 text-white py-2 px-4 rounded shadow hover:bg-purple-900 transition"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Menu</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-purple-100">
                <th className="px-4 py-3 font-semibold text-gray-700 border-r border-gray-300 text-left">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 border-r border-gray-300 text-left">
                  Icon
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 border-r border-gray-300 text-left">
                  Parent
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 border-r border-gray-300 text-left">
                  Order
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder empty row */}
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No categories found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const [view, setView] = useState("create"); 

  return (
    <div className="rounded-2xl bg-white p-6">
      {view === "create" ? (
        <CategoryCreate onView={() => setView("list")} />
      ) : (
        <CategoryList onAddNew={() => setView("create")} />
      )}
    </div>
  );
}
