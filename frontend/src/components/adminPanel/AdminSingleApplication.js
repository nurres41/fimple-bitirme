import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdminSingleApplication = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { singleApplication } = useParams();
  const [singleAppData, setSingleAppData] = useState(null);

  const initialValues = {
    status: false,
    note: "",
  };

  const validationSchema = Yup.object().shape({
    status: Yup.boolean(),
    note: Yup.string().max(200, "Not 200 karakterden uzun olamaz"),
  });

  const handleSubmit = async (values) => {
    try {
       const res = await axios.put(`http://localhost:3001/admin/basvuru/${singleApplication}`, values);
        navigate('/basvuru-sorgula');
        console.log(res.data)
    } catch (error) {
        console.error('Single Application Error: ', error);
    } 
  };

  useEffect(() => {
    if (!auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const singleAppData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/admin/basvuru/${singleApplication}`
        );
        setSingleAppData(res.data);
      } catch (error) {
        console.log("Single Application Error: ", error);
      }
    };
    singleAppData();
  }, [singleApplication]);


  return (
    <div className="max-w-md mx-auto pt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Başvuru Durumu Güncelle</h2>
      <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-md py-4">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {singleAppData?.name} {singleAppData?.lastname}
          </h2>
          <p className="text-gray-600">Yaş: {singleAppData?.age}</p>
          <p className="text-gray-600">TC: {singleAppData?.idNo}</p>
          <p className="text-gray-600">Basvuru No: {singleAppData?._id}</p>
          <p className="text-gray-600">Adres: {singleAppData?.address}</p>
          <p className="text-gray-600">Başvuru: {singleAppData?.request}</p>
          <p
            className={`text-sm font-semibold ${
              singleAppData?.status ? "text-green-600" : "text-red-600"
            }`}
          >
            Durum: {singleAppData?.status ? "Çözülmüş" : "Çözülmemiş"}
          </p>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="my-4">
            <label
              htmlFor="status"
              className="block text-sm font-semibold mb-2"
            >
              Durum:
            </label>
            <Field type="checkbox" id="status" name="status" className="mr-2" />
            <label htmlFor="status" className="text-sm">
              Cozuldu
            </label>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-semibold mb-2">
              Not:
            </label>
            <Field
              type="text"
              id="note"
              name="note"
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="note"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Güncelle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminSingleApplication;
