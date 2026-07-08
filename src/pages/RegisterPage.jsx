import PageHeader from "../components/common/PageHeader";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      <div className="mx-auto max-w-5xl px-5 py-6 pb-12">

        <PageHeader
          title="Create Account"
          subtitle="Register to request supplies for your ship."
        />

        <div className="mt-8">

          <RegisterForm />

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;