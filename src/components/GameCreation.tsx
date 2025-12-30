import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { useNavigate } from "@tanstack/react-router";

const roomIdForm = z.object({
  roomId: z
    .string()
    .min(6, "Room Id is only 6 Characters Long")
    .max(6, "Room Id is only 6 Characters Long"),
});

type RoomIdForm = z.infer<typeof roomIdForm>;

const GameCreation = () => {
  const navigate = useNavigate();
  const { username } = useUsernameStore();

  const form = useForm<RoomIdForm>({
    resolver: zodResolver(roomIdForm),
  });

  const onSubmit = (data: RoomIdForm) => {
    toast.success(data.roomId);
    const roomId = data.roomId;
    socket.emit("joinGame", { username, roomId });
    form.reset();
  };

  useEffect(() => {
    socket.connect();
  }, []);

  const handleCreateGame = () => {
    socket.emit("createGame", { username });
  };

  socket.on("gameCreated", ({ roomId }) => {
    navigate({ to: `/game/${roomId}` });
  });

  socket.on("gameJoined", ({ roomId }) => {
    navigate({ to: `/game/${roomId}` });
  });

  return (
    <div className="flex items-center justify-between gap-16">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Create Room</CardTitle>
          <CardDescription>
            Creates a random Room where you are the host
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleCreateGame}>Create Game</Button>
        </CardContent>
      </Card>
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Join Room</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form onSubmit={form.handleSubmit(onSubmit)} id="roomId">
              <Field>
                <Input
                  {...form.register("roomId")}
                  placeholder="Enter room Id"
                />
                {form.formState.errors && (
                  <FieldError errors={[form.formState.errors.roomId]} />
                )}
              </Field>
            </form>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="roomId">
            Join Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default GameCreation;
