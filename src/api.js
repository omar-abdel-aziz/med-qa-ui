import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function uploadFile(file) {
  console.log("[api] uploadFile called with file:", file);
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("[api] uploadFile response:", res.data);
  return res.data.session_id;
}

export async function processSession(sessionId) {
  console.log("[api] processSession called with sessionId:", sessionId);
  const res = await api.post(`/process/${sessionId}`);
  console.log("[api] processSession response:", res.data);
  return res.data;
}

export async function querySession(sessionId, question) {
  console.log(
    "[api] querySession called with sessionId:",
    sessionId,
    "question:",
    question
  );
  const res = await api.post(`/query/${sessionId}`, { question });
  console.log("[api] querySession response:", res.data);
  return res.data.answer;
}

export async function checkStatus(sessionId) {
  console.log("[api] checkStatus called with sessionId:", sessionId);
  const res = await api.get(`/status/${sessionId}`);
  console.log("[api] checkStatus response:", res.data);
  return res.data.processed;
}

export async function cleanupSession(sessionId) {
  console.log("[api] cleanupSession called with sessionId:", sessionId);
  const res = await api.delete(`/cleanup/${sessionId}`);
  console.log("[api] cleanupSession response:", res.data);
  return res.data;
}
