"use client";

import { gameStateAdapter } from "@/lib/gameStateAdapter";
import type { GameState } from "@/types";
import type { ModelResult } from "@/types/api";
import { useEffect, useState } from "react";

const BACKEND_ENDPOINT = "http://127.0.0.1:5000";

export function SimulationPhase({
  gameState,
  handleSimulationSuccess,
}: {
  gameState: GameState;
  handleSimulationSuccess: (data: ModelResult) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Waiting to start...");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const startStreaming = async () => {
      setIsStreaming(true);
      setStatus("Connecting...");
      setProgress(0);

      try {
        const response = await fetch(`${BACKEND_ENDPOINT}/api/predict/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameStateAdapter(gameState)),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No reader available");
        }

        const decoder = new TextDecoder();
        let buffer = "";

        // Using recursive function instead of while(true)
        const processChunk = async () => {
          const { done, value } = await reader.read();

          if (done) {
            setIsStreaming(false);
            return;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.substring(6));
                setProgress(data.progress);

                // Use message field instead of status
                if (data.message) {
                  setStatus(data.message);
                }

                // Handle errors
                if (data.type === "error") {
                  console.error("Stream error:", data.error);
                  setStatus(`Error: ${data.error}`);
                  setIsStreaming(false);
                  return;
                }

                // Handle completion
                if (data.type === "complete") {
                  setIsStreaming(false);
                  handleSimulationSuccess({
                    prediction: data.prediction,
                    feature_importance: data.feature_importance,
                  });
                  return;
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }

          await processChunk();
        };

        await processChunk();
      } catch (error) {
        console.error("Stream error:", error);
        setStatus(`Connection error: ${(error as Error).message}`);
        setIsStreaming(false);
      }
    };

    // Start streaming when component mounts or if we need to restart
    if (!isStreaming) {
      startStreaming();
    }

    // Cleanup function
    return () => {
      setIsStreaming(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold mb-6">Running Earthquake Simulation</h2>
      <p className="mb-10">
        Using machine learning models trained on Nepal earthquake data to
        predict the outcome of your decisions...
      </p>
      <div className="mb-6 flex flex-col items-center">
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-blue-300 font-mono">{status}</p>
        <p className="text-2xl font-bold text-blue-400 mt-2">{progress}%</p>
      </div>

      <div className="w-24 h-24 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto" />
    </div>
  );
}
