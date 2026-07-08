import MobileLayout from "../layouts/MobileLayout";
import logo from "../assets/logo.png";

function SplashPage() {
  return (
    <MobileLayout>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#071B35] overflow-hidden">

        {/* Background Glow */}
        <div className="absolute bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

        {/* Logo */}
        <img
          src={logo}
          alt="Shippex"
          className="w-28 drop-shadow-xl"
        />

        {/* Title */}
        <h1 className="mt-6 text-5xl font-extrabold tracking-wide text-white">
          Shippex
        </h1>

        <p className="mt-2 text-cyan-300 text-center px-10">
          Supplies Delivered Directly To Your Ship
        </p>

        {/* Loader */}
        <div className="mt-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        </div>

      </div>
    </MobileLayout>
  );
}

export default SplashPage;