import QRCode from "qrcode";

async function QRCodeGenerator({ id }: { id: number }) {
  const generateQRCode = async () => {
    let qrCode: string;
    try {
      const qrCode = await QRCode.toDataURL(id.toString());
      return qrCode;
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div>
      <div>
        {/* <p>User ID: {id}</p> */}
        <img src={await generateQRCode()} alt={`QR code for ${id}`} />
      </div>
    </div>
  );
}

export default QRCodeGenerator;
