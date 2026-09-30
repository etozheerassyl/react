import React from "react";
import { X, CheckCircle2, AlertTriangle, Terminal, Key, Cpu, HelpCircle } from "lucide-react";

export function DefenseGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog defense-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <Cpu size={22} className="modal-title-icon cyan-text" />
            <div>
              <h2 className="modal-title">ORAL DEFENSE PREPARATION GUIDE</h2>
              <p className="modal-subtitle">
                Complete answers for Reconciliation, Keys, and State Lifecycle
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="defense-modal-body">
          {/* Section 1: Reconciliation */}
          <div className="defense-card">
            <div className="defense-card-header">
              <span className="defense-num">01</span>
              <h4>What is Reconciliation & Virtual DOM?</h4>
            </div>
            <p>
              Reconciliation is the process by which React compares the newly returned Virtual DOM tree
              with the previous Virtual DOM tree (the "diffing" algorithm) to determine which minimal parts
              of the real DOM need to be updated.
            </p>
            <div className="defense-pill-note">
              React optimizes diffing in O(n) time using two assumptions: elements with different types produce
              different trees, and list children can be tracked stably across renders using the <code>key</code> prop.
            </div>
          </div>

          {/* Section 2: Component Identity & Keys */}
          <div className="defense-card">
            <div className="defense-card-header">
              <span className="defense-num">02</span>
              <h4>Component Identity & The Role of Keys</h4>
            </div>
            <p>
              Keys tell React <strong>which component instance is which</strong> between renders.
              Without a key (or with an index key), React matches children purely by their position in the array.
              With a unique, stable key like <code>key={"{item.id}"}</code>, React knows that an item moved
              to another position is the <em>exact same component instance</em>, so React reorders the DOM node
              and <strong>preserves its internal state</strong> (such as <code>tacticalNotes</code> or <code>overclockBoost</code>).
            </p>
          </div>

          {/* Section 3: State Preservation Demo */}
          <div className="defense-card">
            <div className="defense-card-header">
              <span className="defense-num">03</span>
              <h4>How to demonstrate State Preservation to the Teacher:</h4>
            </div>
            <ol className="defense-steps">
              <li>
                Type notes into the first card (e.g. <em>"Target spotted in Sector 7"</em> on <strong>GHOST</strong>).
              </li>
              <li>
                Click <strong>"Reverse List"</strong> or sort by <strong>"Rank"</strong> or filter by <strong>"Infiltrator"</strong>.
              </li>
              <li>
                Notice that the card moves to its new position, but your notes and overclock level <strong>stay perfectly attached to GHOST</strong>!
              </li>
              <li>
                <strong>Contrast:</strong> Switch the Key Mode at the top to <code>Index (Buggy)</code> and reverse. Notice the notes stay at position #1 instead of travelling with GHOST!
              </li>
            </ol>
          </div>

          {/* Section 4: Intentional State Reset Using Keys */}
          <div className="defense-card">
            <div className="defense-card-header">
              <span className="defense-num">04</span>
              <h4>Demonstrating Intentional State Reset using Keys</h4>
            </div>
            <p>
              In React, if you want to completely discard a component's local state and start fresh,
              you change its <code>key</code>! When React sees a new key on the same component type,
              it does NOT reuse the instance. Instead, it completely <strong>unmounts</strong> the previous
              component instance (destroying its local <code>useState</code>) and mounts a brand-new instance!
            </p>
            <div className="code-example-box">
              <code>
                {`// In App: key={\`\${item.id}-\${item.keyVersion}\`}\n// Clicking "Key Reset" increments item.keyVersion in parent.\n// React sees new key -> unmounts old instance -> fresh state!`}
              </code>
            </div>
          </div>

          {/* Section 5: Component Re-rendering Investigation */}
          <div className="defense-card">
            <div className="defense-card-header">
              <span className="defense-num">05</span>
              <h4>Component Re-rendering Investigation via Console</h4>
            </div>
            <p>
              Open DevTools (press <code>F12</code> or <code>Ctrl+Shift+I</code>), and look at the Console.
              Notice how:
            </p>
            <ul>
              <li>
                Typing in a card's local input triggers <strong>ONLY</strong> that child's re-render
                (<code>[CHILD RENDER] OperativeCard</code>) without causing the Parent or siblings to re-render.
              </li>
              <li>
                Changing parent filters or sorting triggers <code>[PARENT RENDER]</code> followed by
                reconciliation of the children list.
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="cyber-btn btn-primary" onClick={onClose}>
            Got it, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
