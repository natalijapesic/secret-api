import QRCode from "react-qr-code";

const GenerateQRCode = ({ jmbg }: { jmbg: string | null }) => {
  if (!jmbg) return <></>;
  return (
    <div style={{ background: "white", padding: "16px" }}>
      <QRCode size={50} viewBox={`0 0 256 256`} value={jmbg} />
    </div>
  );
};

export default GenerateQRCode;
