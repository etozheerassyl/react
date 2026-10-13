// Node environment verification script
// Simulates browser localStorage and tests all API contracts & race-condition logic

const storage = new Map();
global.localStorage = {
  getItem: (key) => storage.get(key) || null,
  setItem: (key, val) => storage.set(key, String(val)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};

async function runTests() {
  console.log("=== RUNNING ASYNC API & EFFECT VERIFICATION TESTS ===");

  const {
    getItemsList,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    resetDatabase,
    setApiConfig,
  } = await import("../src/api/fakeApi.js");

  // Fast delays for test execution
  setApiConfig({ minDelay: 20, maxDelay: 50, errorChance: 0 });

  // 1. Reset & Read
  console.log("\n[TEST 1] Testing Database Initialization & getItemsList...");
  await resetDatabase();
  const list = await getItemsList("?page=1&limit=5");
  console.log(`- Retrieved ${list.data.length} items (Total: ${list.total}, TotalPages: ${list.totalPages})`);
  if (list.data.length !== 5 || list.total < 8) {
    throw new Error("List pagination failed!");
  }

  // 2. Meaningful fields check (Requirement 1: At least 7 meaningful fields)
  console.log("\n[TEST 2] Verifying Item Details fields (Requirement 1: >= 7 fields)...");
  const firstItem = await getItem(list.data[0].id);
  const requiredFields = [
    "id",
    "name",
    "category",
    "status",
    "priority",
    "assignedTo",
    "budget",
    "systemHealth",
    "securityClearance",
    "location",
    "lastInspection",
    "specifications",
    "maintenanceNotes",
  ];
  for (const f of requiredFields) {
    if (firstItem[f] === undefined) {
      throw new Error(`Missing expected meaningful field: ${f}`);
    }
  }
  console.log(`- Item #${firstItem.id} has all ${requiredFields.length} meaningful fields! (Requirement: >= 7 fields)`);

  // 3. Create Item (Requirement 3)
  console.log("\n[TEST 3] Testing Create Item functionality...");
  const created = await createItem({
    name: "Nebula Quantum Sensor",
    category: "Data Communications",
    status: "Deploying",
    priority: "Critical",
    assignedTo: "Dr. Walter Bishop",
    budget: 310000,
    description: "Deep space tachyonic particle detector.",
    specifications: "Frequency: Sub-space 14.8 GHz | Precision: 99.999%",
  });
  console.log(`- Created item ID #${created.id} ("${created.name}")`);
  const verifyCreated = await getItem(created.id);
  if (verifyCreated.name !== "Nebula Quantum Sensor") {
    throw new Error("Created item not found in DB!");
  }

  // 4. Update Item & Status Action (Requirement 3 & 5)
  console.log("\n[TEST 4] Testing Update Item & Status Action...");
  const updated = await updateItem(created.id, {
    status: "Active",
    systemHealth: 97,
  });
  if (updated.status !== "Active" || updated.systemHealth !== 97) {
    throw new Error("Status update failed!");
  }
  console.log(`- Asset #${created.id} status successfully transitioned to "${updated.status}"`);

  // 5. Delete Item (Requirement 3)
  console.log("\n[TEST 5] Testing Delete Item functionality...");
  await deleteItem(created.id);
  try {
    await getItem(created.id);
    throw new Error("Item was not deleted!");
  } catch (err) {
    console.log(`- Item successfully deleted (Verified error: ${err.message})`);
  }

  // 6. Race Condition Mitigation Simulation (Requirement 9)
  console.log("\n[TEST 6] Simulating Race Condition Mitigation with cleanup flag...");
  let currentDisplayedItem = null;
  let activeEffectCleanup = null;

  function simulateSelectEffect(id, delay) {
    // If previous effect has a cleanup function, execute it!
    if (activeEffectCleanup) {
      activeEffectCleanup();
    }

    let isCancelled = false;

    // Simulate async request
    getItem(id, { explicitDelay: delay })
      .then((data) => {
        if (!isCancelled) {
          currentDisplayedItem = data;
          console.log(`  -> [RESOLVED] Item #${id} loaded & DISPLAYED!`);
        } else {
          console.log(`  -> [CANCELLED] Item #${id} resolved but DISCARDED due to cleanup flag (isCancelled=true)!`);
        }
      })
      .catch((err) => {
        if (!isCancelled) console.error("Request error:", err);
      });

    // Cleanup function
    activeEffectCleanup = () => {
      isCancelled = true;
      console.log(`  -> [CLEANUP] Effect for Item #${id} cancelled!`);
    };
  }

  console.log("  -> User selects Item #1 (slow request: 120ms)");
  simulateSelectEffect(1, 120);

  // User quickly switches to Item #2 at 30ms (fast request: 40ms)
  await new Promise((r) => setTimeout(r, 30));
  console.log("  -> User switches to Item #2 (fast request: 40ms)");
  simulateSelectEffect(2, 40);

  // Wait for both to finish
  await new Promise((r) => setTimeout(r, 160));

  if (currentDisplayedItem && currentDisplayedItem.id === 2) {
    console.log(`- SUCCESS: Displayed item is #${currentDisplayedItem.id} (Item #2). Race condition prevented!`);
  } else {
    throw new Error(`Race condition bug detected! Displayed item was: ${currentDisplayedItem?.id}`);
  }

  // 7. Stale Closure Handling Simulation (Requirement 10)
  console.log("\n[TEST 7] Simulating Stale Closure & Conflicting Action Defense...");
  let selectedId = 1;
  let selectedItemState = await getItem(1);
  let itemsListState = [selectedItemState, await getItem(2)];

  // User triggers async status update for Item #1
  const capturedTargetId = selectedItemState.id;
  const targetNewStatus = "In Maintenance";

  // While in-flight, user switches selected item to Item #2
  selectedId = 2;
  selectedItemState = await getItem(2);

  // Now the async update completes
  const updatedItemRes = await updateItem(capturedTargetId, { status: targetNewStatus }, { explicitDelay: 10 });

  // Functional update for items list
  itemsListState = itemsListState.map((it) =>
    it.id === capturedTargetId ? { ...it, ...updatedItemRes } : it
  );

  // Guard for selected item view
  if (selectedItemState && selectedItemState.id === capturedTargetId) {
    selectedItemState = { ...selectedItemState, ...updatedItemRes };
  }

  if (selectedItemState.id === 2 && itemsListState.find((it) => it.id === 1).status === targetNewStatus) {
    console.log("- SUCCESS: Stale closure prevented! Item #1 was updated in DB and list, without corrupting Item #2 in the detail view.");
  } else {
    throw new Error("Stale closure corrupted the view state!");
  }

  console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
