// CreateApplication.js

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Lütfen isminizi doğru bir şekilde giriniz!'),
  lastname: Yup.string().required('Lütfen soy isminizi doğru bir şekilde giriniz!'),
  age: Yup.number().required().positive().integer('Lütfen yaşınızı giriniz!'),
  idNo: Yup.number().required().positive().integer().min(11, 'Lütfen TC kimlik numaranızı giriniz!'),
  request: Yup.string().required('Lütfen yardımcı olmamızı istediğiniz konuyu açıklayınız!'),
  address: Yup.string().required('Adresinizi giriniz!'),
});

const initialValues = {
  name: '',
  lastname: '',
  age: '',
  idNo: '',
  request: '',
  address: '',
};

const CreateApplication = () => {
  const eventSubmit = (values) => {
    console.log('Data Kontrol: ', values);
  };

  return (
    <div className="mx-auto pt-10 bg-gray-200 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-6">Başvuru Yapma Merkezi</h1>
      <div className="bg-gray-400 max-w-[600px] p-10 mx-auto mt-10 rounded-xl">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={eventSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                İsminiz:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="lastname" className="block text-sm font-semibold mb-2">
                Soy İsminiz:
              </label>
              <Field
                type="text"
                id="lastname"
                name="lastname"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-semibold mb-2">
                Yaşınız:
              </label>
              <Field
                type="text"
                id="age"
                name="age"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="idNo" className="block text-sm font-semibold mb-2">
                TC Kimlik No:
              </label>
              <Field
                type="text"
                id="idNo"
                name="idNo"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="idNo" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="request" className="block text-sm font-semibold mb-2">
                Başvuru İçeriği:
              </label>
              <Field
                type="text"
                id="request"
                name="request"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="request" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold mb-2">
                Adresiniz:
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-xs italic" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Başvuruyu Gönder
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateApplication;
