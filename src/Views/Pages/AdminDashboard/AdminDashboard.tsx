import { useTranslation } from "react-i18next";
import AdminDashboardLayout from "../AdminDashboard/AdminDashBoardLayout";
const AdminDashboard = () => {
  const { t } = useTranslation();
  return (
    <AdminDashboardLayout>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              {t("Welcome to Admin")}{" "}
              <strong className="font-extrabold text-red-700 sm:block">
                {t("DashBoard")}
              </strong>
            </h1>
          </div>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
