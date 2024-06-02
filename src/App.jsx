import { SignIn } from './pages/SignIn';
import './index.css';

import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Logout } from './pages/Logout';
import { Admin } from './layout/Admin';
import { Layout } from './pages/Layout';
import { Sidebar } from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ConstructionPage } from './pages/ConstructionPage';
import { DevicePage } from './pages/DevicePage';
import { PromotionPage } from './pages/PromotionPage';
import { AssignStaff } from './pages/AssignStaff';
import { ProfileLayout } from './layout/ProfileLayout';
import { ProfileDetail } from './pages/ProfileDetail';
import { ChangePassword } from './pages/ChangePassword';
import { NewContract } from './pages/NewContract';
import { DepositPage } from './pages/DepositPage';
import { DoingConstruction } from './pages/DoingConstruction';
import { DoneConstruction } from './pages/DoneConstruction';
import { RequetsPage } from './pages/RequestPage';

import { SurveyPage } from './pages/SurveyPage';
import { SurveyDetail } from './pages/SurveyDetail';
import { PackagePage } from './pages/PackagePage';

import { Invoices } from './pages/Invoice';
import { Acceptance } from './pages/Acceptance';
import { Chat } from './pages/Chat';
import { Manufacture } from './pages/Manufacture';
import { UpdateDevice } from './pages/UpdateDevice';
import { UpdatePackage } from './pages/UpdatePackage';
import { CreateContract } from './pages/CreateContract';
import { CreateSurvey } from './pages/CreateSurvey';
import { SurveyReportList } from './pages/SurveyReportList';
import { DetailContract } from './pages/DetailContract';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useContext, useEffect } from 'react';
import { DetailDoingContract } from './pages/DetailDoingContract';
import { PayloadContext } from './context/payload';
import { DetailDoneConstruction } from './pages/DetailDoneConstruction';
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA7whJONp5a-D-Taxc5Hq3LqxO0RG0aDB0",
    authDomain: "smarthome-856d3.firebaseapp.com",
    projectId: "smarthome-856d3",
    storageBucket: "smarthome-856d3.appspot.com",
    messagingSenderId: "138230736587",
    appId: "1:138230736587:web:a78b467fb9d3d04aa25d4e",
    measurementId: "G-STRZ5HY3LB",
  };
  const app = initializeApp(firebaseConfig);
  const { setPayload } = useContext(PayloadContext);
  const message = getMessaging(app);
  const generateToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(message, {
        vapidKey:
          'BA4Hn56kealDQLV6IAuEzWlcajftjpYTdoayCJ8La35ahZCKUu3WaqBGmU1cRqvTYrcGiV5gZNlfbF81ZSqWimQ',
      });
    }
  };
  useEffect(() => {
    generateToken();
    onMessage(message, (payload) => {
      setPayload(payload);
    })
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/reset-password' element={<ForgotPassword />} />
        <Route path='/log-out' element={<Logout />} />
        <Route element={<Admin />}>
          <Route element={<ConstructionPage />}>
            <Route path='/construction' element={<NewContract />} />
            <Route path='/construction/deposit' element={<DepositPage />} />
            <Route path='/construction/doing' element={<DoingConstruction />} />
            <Route
              path='/construction/survey-report-list'
              element={<SurveyReportList />}
            />
            <Route
              path='/construction/project-done'
              element={<DoneConstruction />}
            />
          </Route>
          <Route path='/construction/:id' element={<DetailContract />} />
          <Route path='/construction-detail/:id' element={<DetailDoingContract/>}/>
          <Route path='/construction-detail-done/:id' element={<DetailDoneConstruction/>}/>
          <Route path='/survey/create-contract-detail/:id' element={<CreateSurvey />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/request' element={<RequetsPage />} />
          <Route path='/device-page' element={<DevicePage />} />
          <Route
            path='/device-page/update-device/:id'
            element={<UpdateDevice />}
          />
          <Route path='/promotion' element={<PromotionPage />} />
          <Route path='/assign-staff' element={<AssignStaff />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/survey/create-contract' element={<CreateContract />} />
          <Route path='/survey/survey-detail' element={<SurveyDetail />} />
          <Route path='/package-page' element={<PackagePage />} />
          <Route
            path='/package-page/update-package/:id'
            element={<UpdatePackage />}
          />
          <Route path='/invoices/:id' element={<Invoices />} />
          <Route path='/acceptance' element={<Acceptance />} />
          <Route path='/manufacture' element={<Manufacture />} />
          <Route element={<ProfileLayout />}>
            <Route path='/profile' element={<ProfileDetail />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
