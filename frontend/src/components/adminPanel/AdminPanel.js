import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const { setAuthSituation, clearAuth, auth } = useAuth();

  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {

    const user = 'kodluyoruz';
    const pass = 'bootcamp109';

    if(values.username === user && values.password === pass){
        setErr(false);
        setAuthSituation(); 
        navigate('/admin/basvuru-listesi');
    }else{
        clearAuth();
        setErr(true)
    }
  };

  useEffect(()=>{
    if(auth){
        navigate('/admin/basvuru-listesi ')
    }
},[auth,navigate]);

  return (
    <div className="max-w-md mx-auto w-screen h-screen pt-10 md:px-5 px-10">
      <h2 className="text-2xl font-bold mb-6">Login Form</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold mb-2">
              Username:
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          {
            err && (
                <p className='text-red-600 mt-4 font-semibold underline text-center'>Hatali Giris</p>
            ) 
          }
        </Form>
      </Formik>
    </div>
  );
};

export default AdminPanel;
