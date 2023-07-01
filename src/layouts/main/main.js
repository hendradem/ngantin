import BottomNav from "../bottomnav/bottomnav";
import Navbar from "../navbar/navbar";

const MainLayout = (props) => {
  return (
    <div>
      <Navbar title={props.navTitle} />
      <main class="container mx-auto">{props.children}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
