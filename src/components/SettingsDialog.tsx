import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import DiceBearAvatar from "./DiceBearAvatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Settings } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);

  const { username, resetUsername } = useUsernameStore();

  const handleReset = () => {
    resetUsername();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          {username && (
            <Card>
              <CardContent className="flex flex-col items-center gap-4">
                <DiceBearAvatar username={username} size={64} />
                <h1 className="text-2xl">Welcome, {username}</h1>
                <Button onClick={handleReset} variant="destructive">
                  Reset Username
                </Button>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SettingsDialog;
