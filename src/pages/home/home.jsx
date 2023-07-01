import MainLayout from "../../layouts/main/main";
import { useDispatch, useSelector } from "react-redux";
import ImageCarousel from "../../components/home/ImageCarousel";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="w-full h-screen">
      <MainLayout navTitle="Home">
        <div className="mx-3">
          <ImageCarousel />
          <div className="w-full mt-3 flex justify-between items-center">
            <h1 className="text-gray-500 text-lg font-medium">Wishlist anda</h1>
            <a className="text-blue-500 font-normal" href="" alt="">
              See all
            </a>
          </div>
          <div>
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              Wishlistmu kosong
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HomePage;
