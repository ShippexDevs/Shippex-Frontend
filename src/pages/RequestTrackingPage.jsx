import { useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function RequestTrackingPage() {
  const { requestId } = useParams();

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <div className="mx-auto max-w-5xl px-5 py-6">

        <PageHeader
          title="Request Tracking"
          subtitle={requestId}
        />

        <div
          className="
            mt-8
            rounded-3xl
            bg-white
            p-6
            shadow-md
          "
        >
          <h2 className="text-xl font-bold">
            Current Status
          </h2>

          <p className="mt-4 text-lg text-amber-600 font-semibold">
            Pending Acceptance
          </p>

          <p className="mt-4 text-slate-500">
            This page will later display the live request status
            received from the Spring Boot backend.
          </p>

        </div>

      </div>
    </div>
  );
}

export default RequestTrackingPage;