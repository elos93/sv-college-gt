"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Settings = {
  username: string;
  email: string;
  theme: "light" | "dark" | "system";
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTheme, setSelectedTheme] =
    useState<Settings["theme"]>("system");

  // 🔹 טעינה ראשונית מ־localStorage
  useEffect(() => {
    const raw = localStorage.getItem("settings");
    if (!raw) return;

    const saved: Settings = JSON.parse(raw);
    setUsername(saved.username || "");
    setEmail(saved.email || "");
    setSelectedTheme(saved.theme || "system");
    setTheme(saved.theme);
  }, [setTheme]);

  const handleSave = () => {
    const settings: Settings = {
      username,
      email,
      theme: selectedTheme,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
    setTheme(selectedTheme);

    alert("Settings saved");
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-2">
        <Label>Username</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label>Theme</Label>
        <Select
          value={selectedTheme}
          onValueChange={(v) => setSelectedTheme(v as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
