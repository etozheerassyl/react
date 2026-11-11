import { useState } from "react";
import {
  CloseIcon,
  TerminalIcon,
  RefreshIcon,
} from "./Icons";

export function DefenseLabModal({
  isOpen,
  onClose,
  apiLogs,
  apiConfig,
  cacheEntries = [],
  cachePolicy = { staleTimeMs: 30000, gcTimeMs: 300000 },
  onUpdateApiConfig,
  onResetDatabase,
  onInvalidateCache,
  onTriggerRaceConditionDemo,
  isTestingRaceCondition,
  raceTestLogs,
}) {
  const [activeTab, setActiveTab] = useState("cache-inspector");
  const [internalTesting, setInternalTesting] = useState(false);
  const [internalLogs, setInternalLogs] = useState([]);

  if (!isOpen) return null;

  const isTesting = isTestingRaceCondition ?? internalTesting;
  const logsToDisplay = raceTestLogs ?? internalLogs;

  const handleTriggerRace = () => {
    if (onTriggerRaceConditionDemo) {
      onTriggerRaceConditionDemo();
      return;
    }

    setInternalTesting(true);
    setInternalLogs([]);

    const addLog = (tag, text, type = "normal") => {
      setInternalLogs((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), tag, text, type },
      ]);
    };

    addLog("DISPATCH #1", "Request 1 dispatched for Asset #1 with AbortSignal (forced 2200ms slow delay)", "normal");

    setTimeout(() => {
      addLog("USER INTERACTION", "User rapidly switches to Asset #2. TanStack Query aborts Request #1 signal and scopes state by queryKey!", "highlight");
      addLog("DISPATCH #2", "Request 2 dispatched for Asset #2 (fast 600ms delay)", "normal");

      setTimeout(() => {
        addLog("RESPONSE #2", "Request 2 arrives at +900ms. Cached under ['assets','detail','2'] and rendered!", "success");
      }, 600);

      setTimeout(() => {
        addLog("RESPONSE #1", "Request 1 aborted/discarded — outdated response cannot overwrite newer Asset #2 state.", "success");
        setInternalTesting(false);
      }, 1900);
    }, 300);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog defense-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <TerminalIcon className="modal-icon defense-glow-icon" />
            <div>
              <h3 className="modal-title">Cache, Network &amp; Defense Inspector</h3>
              <p className="modal-subtitle">
                Inspect live TanStack Query cache entries, invalidation, AbortSignal race defense, and simulated network latency
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
            className={`defense-tab-btn ${activeTab === "cache-inspector" ? "active" : ""}`}
            onClick={() => setActiveTab("cache-inspector")}
          >
            ⚡ Query Cache ({cacheEntries.length})
          </button>
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
          {/* TAB 0: TANSTACK QUERY CACHE INSPECTOR */}
          {activeTab === "cache-inspector" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>TanStack Query Caching &amp; Invalidation Strategy</h4>
                <p>
                  All asset lists, detail views, and dashboard statistics are cached via custom hooks in <code>src/hooks/useAssets.js</code> using hierarchical query keys (<code>["assets", ...]</code>).
                </p>
                <ul>
                  <li><strong>Fresh Window (<code>staleTime</code>):</strong> {cachePolicy.staleTimeMs / 1000}s — revisiting cached filters or assets renders immediately without redundant network requests.</li>
                  <li><strong>Cache Expiration (<code>gcTime</code>):</strong> {cachePolicy.gcTimeMs / 60000}m — inactive cache entries expire and are garbage-collected after 5 minutes.</li>
                  <li><strong>Revalidation &amp; Invalidation:</strong> Stale entries revalidate on mount/window focus; <code>createItem</code>, <code>updateItem</code>, <code>deleteItem</code>, and <code>resetDatabase</code> invalidate affected cache keys automatically.</li>
                </ul>
              </div>

              <div className="logs-header-bar">
                <h5>Active Query Cache Entries ({cacheEntries.length})</h5>
                {onInvalidateCache && (
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={onInvalidateCache}
                  >
                    <RefreshIcon />
                    <span>Invalidate All Caches</span>
                  </button>
                )}
              </div>

              <div className="logs-table-container">
                {cacheEntries.length === 0 ? (
                  <div className="empty-logs">No cached queries recorded yet. Navigate to Home, Registry, or Dashboard.</div>
                ) : (
                  <table className="logs-table">
                    <thead>
                      <tr>
                        <th>Query Key</th>
                        <th>State</th>
                        <th>Freshness</th>
                        <th>Observers</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cacheEntries.map((entry) => (
                        <tr key={entry.queryHash}>
                          <td className="log-op">
                            <code>{JSON.stringify(entry.queryKey)}</code>
                          </td>
                          <td>
                            <span className={`status-badge ${entry.status === "success" ? "success" : entry.status === "error" ? "error" : "pending"}`}>
                              {entry.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${entry.isStale ? "pending" : "success"}`}>
                              {entry.isStale ? "STALE" : "FRESH"}
                            </span>
                          </td>
                          <td>{entry.observersCount}</td>
                          <td className="log-time">
                            {entry.dataUpdatedAt ? new Date(entry.dataUpdatedAt).toLocaleTimeString() : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 1: RACE CONDITIONS */}
          {activeTab === "race-conditions" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>Preventing Outdated Requests from Overwriting Newer Results</h4>
                <p>
                  When a user switches filters, pages, or detail routes rapidly (e.g. <strong>Asset #1</strong> takes 2200ms while <strong>Asset #2</strong> takes 600ms):
                </p>
                <ul>
                  <li><strong>AbortSignal Cancellation:</strong> TanStack Query passes an <code>AbortSignal</code> into <code>queryFn</code> and aborts superseded in-flight requests inside <code>services/service.js</code>.</li>
                  <li><strong>Query Key Isolation:</strong> Every query key (e.g. <code>["assets", "detail", "2"]</code>) stores its data in an isolated cache slot, so late responses for older keys can never overwrite newer UI state.</li>
                </ul>
              </div>

              <div className="code-comparison-box">
                <div className="code-pane danger-pane">
                  <span className="code-header">❌ Vulnerable Code (No Cancellation)</span>
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
                  <span className="code-header">✅ Our Solution (Query Key + AbortSignal)</span>
                  <pre>
{`useQuery({
  queryKey: assetKeys.detail(id),
  queryFn: ({ signal }) => getItemById(id, { signal }),
  enabled: Boolean(id),
});`}
                  </pre>
                </div>
              </div>

              <div className="live-test-card">
                <div className="live-test-header">
                  <div>
                    <h5>Live Race Condition Simulator</h5>
                    <p>Demonstrates slow request abort/isolation when switching rapidly between Asset #1 and Asset #2.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isTesting}
                    onClick={handleTriggerRace}
                  >
                    {isTesting ? "Simulating Race Condition..." : "Trigger Live Simulation"}
                  </button>
                </div>

                {logsToDisplay && logsToDisplay.length > 0 && (
                  <div className="race-test-timeline">
                    {logsToDisplay.map((log, idx) => (
                      <div key={idx} className={`timeline-entry ${log.type}`}>
                        <span className="timeline-time">{log.time}</span>
                        <span className="timeline-badge">{log.tag}</span>
                        <span className="timeline-text">{log.text || log.message}</span>
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
                <h4>Stale Closure &amp; Mutation Cache Consistency</h4>
                <p>
                  UI components never mutate local state arrays manually using stale closures or direct <code>localStorage</code> reads.
                  Instead, mutations capture explicit target IDs and update/invalidate the central TanStack Query cache.
                </p>
              </div>

              <div className="code-pane success-pane single-pane">
                <span className="code-header">✅ Our Mutation &amp; Cache Invalidation Implementation</span>
                <pre>
{`export function useUpdateAssetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, changes }) => updateItem(id, changes),
    onSuccess: async (updatedItem, variables) => {
      queryClient.setQueryData(assetKeys.detail(variables.id), updatedItem);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: assetKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: assetKeys.dashboards() }),
      ]);
    },
  });
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE API LOGS */}
          {activeTab === "live-logs" && (
            <div className="defense-section">
              <div className="logs-header-bar">
                <h5>Real-Time Simulated API Network Traffic</h5>
                <span className="logs-count">{apiLogs.length} events logged</span>
              </div>
              <div className="logs-table-container">
                {apiLogs.length === 0 ? (
                  <div className="empty-logs">No API requests recorded yet. Cache hits avoid hitting the network layer.</div>
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
                            {log.type === "request_aborted" && <span className="status-badge error">ABORTED</span>}
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

          {/* TAB 4: API LATENCY CONFIG */}
          {activeTab === "api-settings" && (
            <div className="defense-section">
              <div className="defense-callout">
                <h4>Simulated API Network Conditions</h4>
                <p>
                  Adjust network latency and error probability to test loading skeletons, error retries, AbortSignal cancellation, and instant cache hits.
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
                  <p>Restores the initial 12 operational assets and invalidates all TanStack Query caches.</p>
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

