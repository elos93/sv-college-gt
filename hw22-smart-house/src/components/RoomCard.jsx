export default function RoomCard({ name, color, onClick }) {
  return (
    <button className="room-card" style={{ "--room": color }} onClick={onClick}>
      <span className="room-letter">{name}</span>
    </button>
  );
}
