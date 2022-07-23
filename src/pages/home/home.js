import MainLayout from "../../layouts/main/main"; 
import { useDispatch, useSelector } from "react-redux";


const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <MainLayout navTitle="Home">
        <div class="p-3 pt-[60px]">
          <div
            class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            <span class="font-medium">Welcome!</span> { auth.name }
          </div>
        </div>
      </MainLayout>
    </div>
  );
}; 

export default HomePage;
