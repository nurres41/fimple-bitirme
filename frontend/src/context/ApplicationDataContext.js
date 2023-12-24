import React,{ createContext, useContext, useState} from "react";

const ApplicationDataContext = createContext();

export const useApplicationData = () => {
    return useContext(ApplicationDataContext);
}

export const ApplicationDataProvider = ({ children }) => {
    const [applicationData, setApplicationData] = useState(null);
    const [applications, setApplications] = useState(null)

    const setApplication = (data) => {
        setApplicationData(data)
    };

    const clearApplication = () => {
        setApplicationData(null)
    };

    const getApplications = (data) => {
        setApplications(data)
    }

    const value = {
        applications,
        applicationData,
        getApplications,
        setApplication,
        clearApplication
    };

    return (
        <ApplicationDataContext.Provider value={value}>
            {children}
        </ApplicationDataContext.Provider>
    )
} 