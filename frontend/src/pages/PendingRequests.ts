import { useState, useEffect } from "react";
import { getPendingRequests, updateRequestStatus } from "../api";
import { AccessRequest } from "../types";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const PendingRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getPendingRequests();
        setRequests(data);
      } catch (err) {
        setError("Failed to load requests");
      }
    };
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id: number, status: "Approved" | "Rejected") => {
    try {
      const updatedRequest = await updateRequestStatus(id, status);
      setRequests((prev) => prev.filter((req) => req.id !== updatedRequest.id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update request");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["Manager"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>
        {error && <p className="text-red-500">{error}</p>}
        {requests.length === 0 && <p>No pending requests</p>}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border p-4 rounded">
              <p><strong>User:</strong> {request.user.username}</p>
              <p><strong>Software:</strong> {request.software.name}</p>
              <p><strong>Access Type:</strong> {request.accessType}</p>
              <p><strong>Reason:</strong> {request.reason}</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleStatusUpdate(request.id, "Approved")}
                  className="bg-green-600 text-white p-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(request.id, "Rejected")}
                  className="bg-red-600 text-white p-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};