import Link from "next/link";
import QRCodeGenerator from "./QRCodeGenerator";

export default function FreeDrinkComponent({
  id,
  full_name,
  qrUrl,
  bonuses,
}: {
  id: number;
  full_name: string;
  qrUrl: string;
  bonuses: number;
}) {
  const rublesNeeded = 250 - bonuses;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        width: "80%",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "20px" }}>
        <QRCodeGenerator {...{id}}/>
      </div>
      <div>
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          Good morning, {full_name}!
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              marginRight: "10px",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "16%",
                  height: "10px",
                  backgroundColor: i < bonuses / 50 ? "green" : "#ddd",
                  borderRadius: "5px",
                }}
              ></div>
            ))}
          </div>
          <div style={{ fontSize: "18px" }}>🎁</div>
        </div>
        <div style={{ fontSize: "16px" }}>
          {rublesNeeded === 0 ? 
              "You can get your free drink!" :  
              `You need to purchase more than ${rublesNeeded} rubles to get your free drink`}
        </div>
      </div>
      <Link href="/editProfile">
        <button className="button">Edit Profile</button>
      </Link>
    </div>
  );
}
