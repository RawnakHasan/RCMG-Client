import { useUsernameStore } from "@/hooks/store/useUsernameStore";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect } from "react";

const usernameForm = z.object({
  username: z
    .string()
    .min(3, "Username need to be atleast 3 Characters")
    .max(8, "Username cannot be more than 8 Characters"),
});

type UsernameFormType = z.infer<typeof usernameForm>;

const UsernameForm = () => {
  const { username, setUsername } = useUsernameStore();
  const form = useForm<UsernameFormType>({
    resolver: zodResolver(usernameForm),
  });

  const onSubmit = (data: UsernameFormType) => {
    setUsername(data.username);
  };

  useEffect(() => {
    if (!username) {
      form.reset({ username: "" });
    }
  }, [username, form]);

  return (
    <>
      {!username && (
        <Card className="w-md">
          <CardContent>
            <FieldGroup>
              <form onSubmit={form.handleSubmit(onSubmit)} id="username">
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    {...form.register("username")}
                    placeholder="Enter your Username"
                  />
                  <Button type="submit" form="username">
                    Submit
                  </Button>
                </Field>
              </form>
            </FieldGroup>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default UsernameForm;
