import { useState } from "react";
import {
  CloseIcon,
  TerminalIcon,
  ZapIcon,
  ShieldIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  RefreshIcon,
  ActivityIcon,
} from "./Icons";

export function DefenseLabModal({
  isOpen,
  onClose,
  apiLogs,
  apiConfig,
  onUpdateApiConfig,
  onResetDatabase,
  onTriggerRaceConditionDemo,
  isTestingRaceCondition,
  raceTestLogs,
}) {
  const [activeTab, setActiveTab] = useState("race-conditions");

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog defense-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <TerminalIcon className="modal-icon defense-glow-icon" />
            <div>
              <h3 className="modal-title">Defense & Concepts Inspector</h3>
              <p className="modal-subtitle">
                Interactive architecture viewer for useEffect, cleanup, race conditions, and closures
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="defense-tabs-nav">
          <button
            type="button"
            className={`defense-tab-btn ${activeTab === "race-conditions" ? "active" : ""}`}
            onClick={() => setActiveTab("race-conditions")}
          >
            🛡️ Race Conditions Demo
          </button>
          <button
            type="button"
            className={`defense-tab-btn ${activeTab === "stale-closures" ? "active" : ""}`}
            onClick={() => setActiveTab("stale-closures")}
          >
            🔒 Stale Closures
          </button>
          <button
            type="button"
            className={`defense-tab-btn ${activeTab === "useeffect-cleanup" ? "active" : ""}`}
            onClick={() => setActiveTab("useeffect-cleanup")}
          >
            ⚡ useEffect & Cleanup
          </button>
          <button
            type="button"
            className={`defense-tab-btn ${activeTab === "live-logs" ? "active" : ""}`}
            onClick={() => setActiveTab("live-logs")}
          >
            📡 Live API Logs ({apiLogs.length})
          </button>
          <button
            type="button"
            className={`defense-tab-btn ${activeTab === "api-settings" ? "active" : ""}`}
            onClick={() => setActiveTab("api-settings")}
          >
            ⚙️ API Latency Config
          </button>
        </div>

        <div className="defense-tab-content">
          {/* TAB 1: RACE CONDITIONS */}
          {activeTab === "race-conditions" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>What is a Race Condition in React?</h4>
                <p>
                  A race condition occurs when multiple asynchronous requests are initiated in sequence,
                  but resolve out of order. For example, if a user clicks <strong>Item A</strong> (slow network, 2500ms delay)
                  and then immediately clicks <strong>Item B</strong> (fast network, 600ms delay):
                </p>
                <ul>
                  <li><strong>Without cleanup:</strong> Item B loads and displays at 600ms. Then at 2500ms, Item A’s outdated response arrives and overwrites Item B! The UI displays wrong data.</li>
                  <li><strong>With useEffect cleanup:</strong> When switching from A to B, React runs the effect cleanup function, setting an <code>isCancelled = true</code> flag. When A resolves, the callback checks <code>if (!isCancelled)</code> and safely discards A’s stale payload!</li>
                </ul>
              </div>

              <div className="code-comparison-box">
                <div className="code-pane danger-pane">
                  <span className="code-header">❌ Vulnerable Code (No Cleanup)</span>
                  <pre>
{`useEffect(() => {
  setIsLoading(true);
  getItem(selectedId).then(data => {
    // BUG: If user switched to another item,
    // this overwrites the newer item!
    setSelectedItem(data);
    setIsLoading(false);
  });
}, [selectedId]);`}
                  </pre>
                </div>
                <div className="code-pane success-pane">
                  <span className="code-header">✅ Our Solution (Cleanup Flag)</span>
                  <pre>
{`useEffect(() => {
  let isCancelled = false;
  setIsLoading(true);
  
  getItem(selectedId).then(data => {
    if (!isCancelled) { // Discards stale result!
      setSelectedItem(data);
      setIsLoading(false);
    }
  });

  return () => {
    isCancelled = true; // Cleanup marks run cancelled!
  };
}, [selectedId]);`}
                  </pre>
                </div>
              </div>

              <div className="live-test-card">
                <div className="live-test-header">
                  <div>
                    <h5>Live Race Condition Simulator</h5>
                    <p>Fires a slow request for Asset #1 (2200ms), followed 300ms later by a fast request for Asset #2 (600ms).</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isTestingRaceCondition}
                    onClick={onTriggerRaceConditionDemo}
                  >
                    {isTestingRaceCondition ? "Simulating Race Condition..." : "Trigger Live Simulation"}
                  </button>
                </div>

                {raceTestLogs && raceTestLogs.length > 0 && (
                  <div className="race-test-timeline">
                    {raceTestLogs.map((log, idx) => (
                      <div key={idx} className={`timeline-entry ${log.type}`}>
                        <span className="timeline-time">{log.time}</span>
                        <span className="timeline-badge">{log.tag}</span>
                        <span className="timeline-text">{log.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STALE CLOSURES */}
          {activeTab === "stale-closures" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>What is a Stale Closure in Async Actions?</h4>
                <p>
                  JavaScript functions form closures over variables in their surrounding scope.
                  When an asynchronous operation takes 1–3 seconds to resolve, variables like <code>selectedItem</code>
                  or <code>items</code> may have changed by the time the promise callback executes!
                </p>
                <div className="problem-solution-grid">
                  <div className="grid-card">
                    <h5>The Risk: Conflicting Actions & State Drift</h5>
                    <p>
                      If a user clicks "Mark Complete" on Item #1, and immediately navigates to Item #2:
                      updating <code>selectedItem</code> directly would overwrite Item #2's view with Item #1!
                      Also, calling <code>setItems(newItems)</code> using closure over <code>items</code> can erase concurrent updates.
                    </p>
                  </div>
                  <div className="grid-card">
                    <h5>Our Defense Mechanisms:</h5>
                    <ol>
                      <li><strong>Target ID Capture:</strong> The target ID is explicitly captured at action initiation: <code>const targetId = item.id;</code></li>
                      <li><strong>Conflict Prevention:</strong> Action buttons are disabled while <code>updatingItemId === targetId</code>.</li>
                      <li><strong>Functional State Updaters:</strong> We use <code>setItems(prevItems =&gt; ...)</code> which always receives the freshest array, immune to stale closures.</li>
                      <li><strong>Target ID Matching:</strong> We only update <code>selectedItem</code> if <code>currentSelected.id === targetId</code>!</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="code-pane success-pane single-pane">
                <span className="code-header">✅ Our Stale-Closure Guard Implementation</span>
                <pre>
{`function handleUpdateStatus(targetId, newStatus) {
  // 1. Prevent concurrent conflicting actions
  if (updatingItemId !== null) return;
  setUpdatingItemId(targetId);

  updateItem(targetId, { status: newStatus })
    .then(updated => {
      // 2. Functional updater avoids stale closure over 'items'
      setItems(prevItems =>
        prevItems.map(item => item.id === targetId ? { ...item, ...updated } : item)
      );

      // 3. Guard against overwriting a different selected item!
      setSelectedItem(current => 
        current && current.id === targetId ? { ...current, ...updated } : current
      );
    })
    .finally(() => {
      setUpdatingItemId(null);
    });
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: USEEFFECT & CLEANUP */}
          {activeTab === "useeffect-cleanup" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>useEffect Lifecycle, Dependencies & Cleanup</h4>
                <p>
                  <code>useEffect</code> lets components synchronize with external systems (like our simulated async API).
                </p>
              </div>

              <div className="concepts-cards-grid">
                <div className="concept-card">
                  <h5>1. When Does useEffect Run?</h5>
                  <p>
                    Unlike standard function execution, <code>useEffect</code> runs <em>after</em> the component renders and commits to the screen.
                    This prevents data fetching from blocking UI painting.
                  </p>
                </div>

                <div className="concept-card">
                  <h5>2. Dependency Array Rules</h5>
                  <p>
                    React compares dependencies between renders using <code>Object.is</code>.
                    If any dependency changes (e.g. <code>searchQuery</code>, <code>page</code>, <code>refreshTrigger</code>), the previous effect is cleaned up and the new effect executes.
                  </p>
                </div>

                <div className="concept-card">
                  <h5>3. Cleanup Function Execution</h5>
                  <p>
                    The function returned from <code>useEffect</code> executes:
                    <br />• <strong>Before</strong> the effect re-runs with new dependencies.
                    <br />• <strong>When</strong> the component unmounts from the DOM.
                  </p>
                </div>

                <div className="concept-card">
                  <h5>4. Why Not Use async Directly on useEffect?</h5>
                  <p>
                    React requires the effect function to return either <code>undefined</code> or a <strong>cleanup function</strong>.
                    Making the effect callback <code>async</code> returns a <code>Promise</code>, which breaks React's cleanup contract!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE API LOGS */}
          {activeTab === "live-logs" && (
            <div className="defense-section">
              <div className="logs-header-bar">
                <h5>Real-Time Simulated API Network Traffic</h5>
                <span className="logs-count">{apiLogs.length} events logged</span>
              </div>
              <div className="logs-table-container">
                {apiLogs.length === 0 ? (
                  <div className="empty-logs">No API requests recorded yet. Perform actions to see live traffic.</div>
                ) : (
                  <table className="logs-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Endpoint / Op</th>
                        <th>Simulated Delay</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiLogs.map((log) => (
                        <tr key={log.id + "-" + log.type} className={`log-row log-${log.type}`}>
                          <td className="log-time">{log.timestamp}</td>
                          <td className="log-type">{log.type.replace("request_", "").toUpperCase()}</td>
                          <td className="log-op"><code>{log.operation}</code></td>
                          <td className="log-delay">{log.delay}ms</td>
                          <td className="log-status">
                            {log.type === "request_success" && <span className="status-badge success">200 OK</span>}
                            {log.type === "request_failed" && <span className="status-badge error">500 ERROR ({log.error})</span>}
                            {log.type === "request_start" && <span className="status-badge pending">IN FLIGHT...</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: API LATENCY CONFIG */}
          {activeTab === "api-settings" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>Simulated API Network Conditions</h4>
                <p>
                  You can adjust network latency and error probability dynamically to test how the app behaves under slow connections and random server failures.
                </p>
              </div>

              <div className="config-grid">
                <div className="config-card">
                  <label className="config-label">
                    <span>Minimum Latency:</span>
                    <strong>{apiConfig.minDelay} ms</strong>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="100"
                    className="config-slider"
                    value={apiConfig.minDelay}
                    onChange={(e) =>
                      onUpdateApiConfig({ minDelay: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="config-card">
                  <label className="config-label">
                    <span>Maximum Latency:</span>
                    <strong>{apiConfig.maxDelay} ms</strong>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    className="config-slider"
                    value={apiConfig.maxDelay}
                    onChange={(e) =>
                      onUpdateApiConfig({ maxDelay: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="config-card">
                  <label className="config-label">
                    <span>Simulated Server Error Probability:</span>
                    <strong>{Math.round(apiConfig.errorChance * 100)}%</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    className="config-slider"
                    value={apiConfig.errorChance}
                    onChange={(e) =>
                      onUpdateApiConfig({ errorChance: Number(e.target.value) })
                    }
                  />
                  <div className="slider-hints">
                    <span>0% (No Errors)</span>
                    <span>20% (Challenging)</span>
                    <span>50% (High Chaos)</span>
                  </div>
                </div>
              </div>

              <div className="reset-db-box">
                <div>
                  <h5>Restore Original Sample Database</h5>
                  <p>Resets localStorage back to the initial 8 high-tech operational assets.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onResetDatabase}
                >
                  <RefreshIcon className="btn-icon" />
                  <span>Reset Database to Default</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
