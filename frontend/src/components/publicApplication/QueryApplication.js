import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useApplicationData } from "../../context/ApplicationDataContext";

const validationSchema = Yup.object({
  applicationNumber: Yup.string().required(
    "Lutfen basvuru numaranizi dogru bir sekilde giriniz!"
  ),
});

const initialValues = {
  applicationNumber: "",
};

const QueryApplication = () => {
  
  const { setApplication, clearApplication } = useApplicationData();

  const navigate = useNavigate();

  const applicationQuery = async (values) => {
    try {
      clearApplication();

      const res = await axios.post(
        "http://localhost:3001/basvuru-sorgula",
        values
      );
      console.log(res.data.application)  
      if (res.data.application) {
        setApplication(res.data.application);
        const applicationNumber = res.data.application._id;
        navigate(`/basvuru-sorgula/${applicationNumber}`);
      } else {
        navigate(`/basvuru-sorgula/${values.applicationNumber}`);
      }

    } catch (err) {
      console.error("Sorgu hatasi: ", err);
    }
  };

  return (
    <div className="mx-auto pt-10 bg-gray-200 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-6">Başvuru Sorgulama</h1>
      <div className="bg-gray-400 max-w-[600px] p-10 mx-auto mt-10 rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={applicationQuery}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="applicationNumber"
                className="block text-sm font-semibold mb-2"
              >
                Başvuru Numaraniz:
              </label>
              <Field
                type="text"
                id="applicationNumber"
                name="applicationNumber"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="applicationNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Başvuruyu Sorgula
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default QueryApplication;
