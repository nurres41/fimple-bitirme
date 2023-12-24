import React from 'react';
import { useApplicationData } from '../../context/ApplicationDataContext';

const ResultApplication = () => {
  const { applicationData } = useApplicationData();

  return (
    <div className="w-screen h-screen bg-gray-200 p-4">
      <div className="max-w-2xl mx-auto">
        {applicationData ? (
          <div className="gap-5 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Başvuru Bilgileri</h2>
            <div className="border p-4 mb-4 rounded-md">
              <p>
                <span className="font-semibold">İsim:</span> {applicationData?.name}
              </p>
              <p>
                <span className="font-semibold">Soyisim:</span> {applicationData?.lastname}
              </p>
              <p>
                <span className="font-semibold">Yaş:</span> {applicationData?.age}
              </p>
              <p>
                <span className="font-semibold">TC Kimlik No:</span> {applicationData?.idNo}
              </p>
              <p>
                <span className="font-semibold">Başvuru İçeriği:</span> {applicationData?.request}
              </p>
              <p>
                <span className="font-semibold">Adres:</span> {applicationData?.address}
              </p>
              <p>
                <span className="font-semibold">Başvuru ID:</span> {applicationData?._id}
              </p>
              <p>
                <span className="font-semibold">Not:</span> {applicationData?.note === '' ? 'Herhangi bir not girilmemistir.' : applicationData?.note }
              </p>
              <p className={`${applicationData?.status === true ? 'text-green-700' : 'text-red-700'}`}>
                <span className={`font-semibold `}>Durum:</span> {applicationData?.status === false ? 'Durum incelenmektedir.' : 'Durumunuz cozulmustur, tesekkurler!' }
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold">Böyle bir başvuru bulunmamaktadır.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultApplication;
