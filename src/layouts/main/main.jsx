import BottomNav from "../bottomnav/bottomnav";

const MainLayout = (props) => {
  return (
    <div className="h-screen bg-white">
      <div className="h-full grid">
        <div className="flex justify-center w-full max-w-md h-full justify-self-center bg-white border-x-[1px] border-gray-100">
          <main class="container mx-auto">{props.children}</main>
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
