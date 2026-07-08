import MobileLayout from "../layouts/MobileLayout";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {

  const { user } = useAuth();

  if (!user) {

    return null;

  }

  return (

    <MobileLayout>

      <div className="min-h-screen bg-slate-50 px-5 py-8">

        <div className="rounded-3xl bg-white p-6 shadow-md">

          <h1 className="mb-6 text-3xl font-bold">

            My Profile

          </h1>

          <div className="space-y-5">

            <ProfileField
              label="Full Name"
              value={user.name}
            />

            <ProfileField
              label="Username"
              value={user.username}
            />

            <ProfileField
              label="Email"
              value={user.email}
            />

            <ProfileField
              label="WhatsApp"
              value={user.whatsappContactNo}
            />

            <ProfileField
              label="Designation"
              value={user.designation}
            />

            <ProfileField
              label="Ship Name"
              value={user.shipName}
            />

            <ProfileField
              label="IMO Number"
              value={user.shipIMONumber}
            />

            <ProfileField
              label="Verified"
              value={
                user.verified
                  ? "✅ Verified"
                  : "❌ Not Verified"
              }
            />

          </div>

        </div>

      </div>

    </MobileLayout>

  );

}

function ProfileField({ label, value }) {

  return (

    <div>

      <p className="text-sm text-slate-500">

        {label}

      </p>

      <p className="mt-1 font-semibold">

        {value ?? "-"}

      </p>

    </div>

  );

}

export default ProfilePage;