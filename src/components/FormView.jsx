import React, { useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function FormView({ nextStep, prevStep, goToStep, formData, updateFormData }) {
  
  // Auto calculate total when jumlahJiwa changes
  useEffect(() => {
    if (formData.jenisZakat === 'Zakat Fitrah' && formData.metodePembayaran === 'Uang') {
      const total = (formData.jumlahJiwa || 0) * 45000;
      updateFormData({ total });
    }
  }, [formData.jumlahJiwa, formData.jenisZakat, formData.metodePembayaran]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: name === 'jumlahJiwa' ? parseInt(value) || '' : value });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleBack = () => {
    if (formData.jenisZakat === 'Infaq' || formData.jenisZakat === 'Sedekah') {
      goToStep(1);
    } else {
      prevStep();
    }
  };

  return (
    <div className="view-container">
      <button type="button" className="back-btn" onClick={handleBack}>
        <FaArrowLeft /> Kembali
      </button>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nama">Nama Muzakki <span className="required">*</span></label>
          <input 
            type="text" 
            id="nama" 
            name="nama" 
            value={formData.nama} 
            onChange={handleChange} 
            placeholder="Masukkan nama lengkap"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="nomorHP">Nomor HP <span className="required">*</span></label>
          <input 
            type="tel" 
            id="nomorHP" 
            name="nomorHP" 
            value={formData.nomorHP} 
            onChange={handleChange} 
            placeholder="Contoh: 08123456789"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="alamat">Alamat <span className="required">*</span></label>
          <textarea 
            id="alamat" 
            name="alamat" 
            value={formData.alamat} 
            onChange={handleChange} 
            placeholder="Masukkan alamat lengkap"
            rows="3"
            required 
          />
        </div>

        {formData.jenisZakat === 'Zakat Fitrah' && (
          <>
            <div className="form-group">
              <label htmlFor="metodePembayaran">Metode Pembayaran <span className="required">*</span></label>
              <div className="radio-group">
                <label className="radio-card">
                  <input 
                    type="radio" 
                    name="metodePembayaran" 
                    value="Uang" 
                    checked={formData.metodePembayaran === 'Uang'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">Uang</div>
                </label>
                <label className="radio-card">
                  <input 
                    type="radio" 
                    name="metodePembayaran" 
                    value="Beras" 
                    checked={formData.metodePembayaran === 'Beras'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">Beras</div>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="jumlahJiwa">Jumlah Jiwa <span className="required">*</span></label>
              <input 
                type="number" 
                id="jumlahJiwa" 
                name="jumlahJiwa" 
                value={formData.jumlahJiwa} 
                onChange={handleChange} 
                min="1"
                required 
              />
            </div>
            
            {formData.metodePembayaran === 'Uang' && (
              <div className="highlight-card">
                <div className="highlight-label">Total Zakat</div>
                <div className="highlight-value">{formatCurrency(formData.total)}</div>
              </div>
            )}
            {formData.metodePembayaran === 'Beras' && (
              <div className="highlight-card" style={{ background: 'rgba(43, 174, 102, 0.1)', borderColor: 'rgba(43, 174, 102, 0.3)' }}>
                <div className="highlight-label" style={{ color: 'var(--primary)' }}>Total Beras</div>
                <div className="highlight-value" style={{ color: 'var(--primary)' }}>{(formData.jumlahJiwa || 0) * 2.5} Kg</div>
              </div>
            )}
          </>
        )}

        {formData.jenisZakat !== 'Zakat Fitrah' && (
           <div className="form-group">
           <label htmlFor="total">Nominal (Rp) <span className="required">*</span></label>
           <input 
             type="number" 
             id="total" 
             name="total" 
             value={formData.total} 
             onChange={handleChange} 
             min="1000"
             required 
           />
         </div>
        )}

        <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Lanjut Konfirmasi <FaArrowRight />
        </button>
      </form>
    </div>
  );
}
