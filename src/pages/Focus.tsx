import RoomScene from "../scenes/RoomScene";

export default function Focus() {
  return (
    <section className="focus-page">
      <div className="timer-space">
        {/* Reserved for Phase 5 */}
      </div>

      <div className="room-space">
        <div className="room-canvas">
          <RoomScene />
        </div>

        <div className="room-caption">
          <h2>My workspace</h2>
          <p>Drag to explore your space</p>
        </div>
      </div>
    </section>
  );
}