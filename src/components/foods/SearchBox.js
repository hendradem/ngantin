import { RiSearchLine } from "react-icons/ri";

export default function SearchBox() {
  return (
    <div>
      <div class="relative mb-2 mt-12">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <RiSearchLine />
        </div>
        <input
          type="text"
          class="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5 "
          placeholder="Search foods"
        />
      </div>
    </div>
  );
}
