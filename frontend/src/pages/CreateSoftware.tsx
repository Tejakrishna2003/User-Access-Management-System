import { useState } from "react";
import { createSoftware } from "../api";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const CreateSoftware = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSoftware({ name, description, accessLevels });
      setSuccess("Software created successfully");
      setName("");
      setDescription("");
      setAccessLevels([]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create software");
    }
  };

  const handleAccessLevelChange = (level: string) => {
    setAccessLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Software</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Access Levels</label>
            <div className="space-x-4">
              {["Read", "Write", "Admin"].map((level) => (
                <label key={level}>
                  <input
                    type="checkbox"
                    checked={accessLevels.includes(level)}
                    onChange={() => handleAccessLevelChange(level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Create</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};