import RoomScene from "../scenes/RoomScene";
import PomodoroTimer from "../components/timer/PomodoroTimer";
export default function Focus() {
  return (
    <section className="focus-page">
      <div className="timer-space">
        <PomodoroTimer />
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