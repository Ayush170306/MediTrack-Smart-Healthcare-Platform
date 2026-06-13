import { useState } from "react";
import API from "../api/api";

function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/symptoms/submit", {
      symptoms: symptoms.split(","),
      severity: "Medium"
    });
    setResult(res.data.prediction);
  };

  return (
    <div>
      <h2>Enter Symptoms</h2>
      <form onSubmit={submit}>
        <input
          placeholder="fever, cough"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button>Submit</button>
      </form>

      {result && (
        <div>
          <h3>Prediction</h3>
          <p>{result.predictedCondition}</p>
          <p>Confidence: {result.confidenceScore}%</p>
          <p>{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default Symptoms;
