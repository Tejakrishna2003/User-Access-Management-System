import { useState, useEffect } from "react";
import { getSoftwareList, submitAccessRequest } from "../api";
import { Software } from "../types";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [softwareId, setSoftwareId] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const software = await getSoftwareList();
        setSoftwareList(software);
        if (software.length > 0) setSoftwareId(software[0].id.toString());
      } catch (err) {
        setError("Failed to load software list");
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitAccessRequest({ softwareId: parseInt(softwareId), accessType, reason });
      setSuccess("Request submitted successfully");
      setSoftwareId(softwareList[0]?.id.toString() || "");
      setAccessType("");
      setReason("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["Employee"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Request Access</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Software</label>
            <select
              value={softwareId}
              onChange={(e) => setSoftwareId(e.target.value)}
              className="border p-2 w-full"
              required
            >
              {softwareList.map((software) => (
                <option key={software.id} value={software.id}>{software.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Access Type</label>
            <select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Access Type</option>
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit Request</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};