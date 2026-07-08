import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageHeader({
  title,
  subtitle,
  showBack = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">

      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="
            mb-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-sm
            active:scale-95
          "
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default PageHeader;