import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="bg-[#121212] text-white py-1.5 flex items-center justify-between border-b border-gray-800 w-full h-16 flex-shrink-0 fixed top-0 right-0 z-50">
      <h1 className="text-xl font-semibold ml-6">LeetTrack</h1>
      <div className="flex items-center gap-4 mr-6">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
