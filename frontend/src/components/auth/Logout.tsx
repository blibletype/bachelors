import { Button } from "@nextui-org/react";

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  console.log("Logged out");
  window.location.href = "/login";
}

export const Logout: React.FC = () => {
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};