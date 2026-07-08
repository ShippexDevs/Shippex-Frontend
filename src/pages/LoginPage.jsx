import MobileLayout from "../layouts/MobileLayout";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  return (
    <MobileLayout>

      <div className="min-h-screen bg-slate-50">

        <div className="px-5 py-8">

          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-[#0A2342]">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-600">
              Login to continue ordering ship supplies.
            </p>

          </div>

          <LoginForm />

        </div>

      </div>

    </MobileLayout>
  );
}

export default LoginPage;