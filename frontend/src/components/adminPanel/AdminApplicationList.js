import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useApplicationData } from "../../context/ApplicationDataContext";

const AdminApplicationList = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { getApplications, applications } = useApplicationData();

  useEffect(() => {
    if (!auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const adminApplicationList = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/admin/basvuru-listesi"
        );
        getApplications(res?.data?.allAppData);
      } catch (error) {
        console.error(error);
      }
    };
    adminApplicationList();
  }, [getApplications]);

  const unsolvedData = applications?.filter((item) => !item?.status);
  const solvedData = applications?.filter((item) => item.status);

  return (
    <div className="container mx-auto ml-[240px] min-h-screen">
      <h2 className="text-center pt-10 mb-10 font-bold text-3xl text-orange-600">
        Cozulmemis Basvurular
      </h2>
      <table className="min-w-[100vw - 240px] border border-gray-300 mx-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Ad</th>
            <th className="border border-gray-300 px-4 py-2">Soyad</th>
            <th className="border border-gray-300 px-4 py-2">Yaş</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Detay</th>
          </tr>
        </thead>
        <tbody>
          {unsolvedData?.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.lastname}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.status === false && "Cozulmemis"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/admin/basvuru/${item._id}`}
                  className="underline text-blue-700 font-semibold font-sans"
                >
                  Basvuruyu Goruntule
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!solvedData && (
        <>
          <h2 className="text-center pt-10 mb-10 font-bold text-3xl text-orange-600">
            Cozulmus Basvurular
          </h2>
          <table className="min-w-[100vw - 240px] border border-gray-300 mx-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Ad</th>
                <th className="border border-gray-300 px-4 py-2">Soyad</th>
                <th className="border border-gray-300 px-4 py-2">Yaş</th>
                <th className="border border-gray-300 px-4 py-2">Durum</th>
                <th className="border border-gray-300 px-4 py-2">Detay</th>
              </tr>
            </thead>
            <tbody>
              {solvedData?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.status === false && "Cozulmemis"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/admin/basvuru-listesi/${item._id}`}
                      className="underline text-blue-700 font-semibold font-sans"
                    >
                      Basvuruyu Goruntule
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminApplicationList;
