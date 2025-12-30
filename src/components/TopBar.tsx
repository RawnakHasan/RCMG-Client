import { ThemeToggle } from "@/themes/ThemeToggle";
import SettingsDialog from "./SettingsDialog";
import { Link } from "@tanstack/react-router";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { useRoomIdStore } from "@/hooks/store/useRoomIdStore";

const TopBar = () => {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl border-r-2 pr-4">
          Welcome,{" "}
          {!username ? (
            "User"
          ) : (
            <span className="text-blue-500 font-semibold">{username}</span>
          )}
        </h1>
        {roomId && (
          <p className="text-xl border-r-2 pr-4 text-yellow-500">{roomId}</p>
        )}
        <Link activeProps={{ className: "text-emerald-500 font-bold" }} to="/">
          Home
        </Link>
        <Link
          activeProps={{ className: "text-emerald-500 font-bold" }}
          to="/about"
        >
          About
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {!roomId && <SettingsDialog />}
      </div>
    </nav>
  );
};
export default TopBar;
