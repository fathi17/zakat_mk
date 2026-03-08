import React from 'react';
import { FaArrowLeft, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

export default function ConfirmationView({ prevStep, formData, resetForm }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSendWA = () => {
    // Format the message
    const totalDisplay = formData.metodePembayaran === 'Beras'
      ? `${formData.jumlahJiwa * 2.5} Kg`
      : formatCurrency(formData.total);

    const message = `Assalamu'alaikum
Data Zakat Masuk

Nama: ${formData.nama}
Nomor HP: ${formData.nomorHP}
Alamat: ${formData.alamat}

Jenis Zakat: ${formData.jenisZakat}
${formData.jenisZakat === 'Zakat Fitrah' ? `Jumlah Jiwa: ${formData.jumlahJiwa}\nMetode Pembayaran: ${formData.metodePembayaran}` : ''}
Total: ${totalDisplay}
`;

    // Encode to URL
    const encodedMessage = encodeURIComponent(message);

    // Default panitia number (replace with actual number in prod)
    const waNumber = '6285241110990';
    window.location.href = `https://wa.me/${waNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="view-container">
      <button className="back-btn" onClick={prevStep}>
        <FaArrowLeft /> Kembali
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <FaCheckCircle size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          Konfirmasi Data
        </h2>
        <p className="instruction-text" style={{ marginBottom: 0 }}>
          Pastikan data yang Anda masukkan sudah benar sebelum dikirim.
        </p>
      </div>

      <div className="card" style={{ flexDirection: 'column', alignItems: 'stretch', marginBottom: '2rem' }}>
        <div className="summary-item">
          <div className="summary-label">Nama</div>
          <div className="summary-value">{formData.nama}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Nomor HP</div>
          <div className="summary-value">{formData.nomorHP}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Alamat</div>
          <div className="summary-value">{formData.alamat}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Jenis Zakat</div>
          <div className="summary-value">{formData.jenisZakat}</div>
        </div>

        {formData.jenisZakat === 'Zakat Fitrah' && (
          <div className="summary-item">
            <div className="summary-label">Jumlah Jiwa & Metode</div>
            <div className="summary-value">
              {formData.jumlahJiwa} Jiwa ({formData.metodePembayaran})
            </div>
          </div>
        )}

        <div className="summary-item">
          <div className="summary-label">Total yang Harus Dibayar</div>
          <div className="summary-value" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>
            {formData.metodePembayaran === 'Beras'
              ? `${formData.jumlahJiwa * 2.5} Kg`
              : formatCurrency(formData.total)}
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSendWA} style={{ backgroundColor: '#25D366', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)', marginBottom: '1rem' }}>
        <FaWhatsapp size={24} /> Kirim Data ke Panitia
      </button>

      <button className="btn btn-secondary" onClick={resetForm}>
        Batal & Mulai Baru
      </button>
    </div>
  );
}
