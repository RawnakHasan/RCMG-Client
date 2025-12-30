import GameCreation from "@/components/GameCreation";
import UsernameForm from "@/components/UsernameForm";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useUsernameStore();
  return (
    <div className="h-full flex items-center justify-center">
      <UsernameForm />
      {username && <GameCreation />}
    </div>
  );
}
