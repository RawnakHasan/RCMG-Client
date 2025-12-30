import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

function DiceBearAvatar({
  username,
  size = 64,
}: {
  username: string;
  size: number;
}) {
  const avatar = createAvatar(avataaars, {
    seed: username,
    size,
  });

  return (
    <img
      className="border rounded-full dark:bg-zinc-800 bg-zinc-300"
      src={avatar.toDataUri()}
      alt={username}
      width={size}
      height={size}
    />
  );
}

export default DiceBearAvatar;
