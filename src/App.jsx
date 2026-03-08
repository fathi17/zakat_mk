import { useState } from 'react';
import './App.css';
import HomeView from './components/HomeView';
import ZakatTypeView from './components/ZakatTypeView';
import FormView from './components/FormView';
import ConfirmationView from './components/ConfirmationView';
import { FaMosque } from 'react-icons/fa';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jenisZakat: '',
    nama: '',
    nomorHP: '',
    alamat: '',
    jumlahJiwa: 1,
    metodePembayaran: 'Uang',
    total: 45000
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const goToStep = (step) => setCurrentStep(step);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      jenisZakat: '',
      nama: '',
      nomorHP: '',
      alamat: '',
      jumlahJiwa: 1,
      metodePembayaran: 'Uang',
      total: 45000
    });
  };

  return (
    <>
      <div className="app-header">
        <div className="header-pattern"></div>
        <FaMosque className="header-icon" />
        <h1>Pendataan ZIS Masjid Khadijah</h1>
        <p className="subtitle">Ramadhan 1447 H</p>
      </div>

      <div className="page-container">
        {currentStep === 1 && (
          <HomeView nextStep={nextStep} goToStep={goToStep} updateFormData={updateFormData} />
        )}
        {currentStep === 2 && (
          <ZakatTypeView nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />
        )}
        {currentStep === 3 && (
          <FormView nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 4 && (
          <ConfirmationView prevStep={prevStep} formData={formData} resetForm={resetForm} />
        )}

        <footer className="app-footer">
          <p>Panitia Zakat Masjid Khadijah &mdash; Ramadhan 1447 H</p>
        </footer>
      </div>
    </>
  );
}

export default App;
