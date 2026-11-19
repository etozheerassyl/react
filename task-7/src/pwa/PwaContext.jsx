import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { queryClient } from "../services/queryClient";
import { assetKeys } from "../services/queryKeys";

const PwaContext = createContext(null);

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

export function PwaProvider({ children }) {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState(null);

  const [swState, setSwState] = useState(() =>
    typeof navigator !== "undefined" && "serviceWorker" in navigator
      ? "registering"
      : "unsupported"
  );
  const [swStatus, setSwStatus] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDismissed, setUpdateDismissed] = useState(false);
  const [isSimulatedUpdate, setIsSimulatedUpdate] = useState(false);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);

  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode());

  const registrationRef = useRef(null);
  const wasOfflineRef = useRef(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );
  const hadControllerRef = useRef(
    typeof navigator !== "undefined" &&
      "serviceWorker" in navigator &&
      Boolean(navigator.serviceWorker.controller)
  );
  const userRequestedUpdateRef = useRef(false);
  const reloadingRef = useRef(false);

  const refreshSwStatus = useCallback(async () => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return null;
    }

    const target =
      navigator.serviceWorker.controller || registrationRef.current?.active;
    if (!target) return null;

    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const timeout = setTimeout(() => resolve(null), 1500);

      channel.port1.onmessage = (event) => {
        clearTimeout(timeout);
        if (event.data?.type === "SW_STATUS") {
          setSwStatus(event.data);
          resolve(event.data);
        } else {
          resolve(null);
        }
      };

      try {
        target.postMessage({ type: "GET_STATUS" }, [channel.port2]);
      } catch {
        clearTimeout(timeout);
        resolve(null);
      }
    });
  }, []);

  const checkConnection = useCallback(async () => {
    setIsCheckingConnection(true);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      wasOfflineRef.current = true;
      setIsOnline(false);
      setLastCheckedAt(Date.now());
      setIsCheckingConnection(false);
      return false;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    try {
      const probeUrl = new URL(
        `version.json?__probe=${Date.now()}`,
        document.baseURI
      ).href;
      const response = await fetch(probeUrl, {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timer);

      const online = response.ok;
      const recovered = wasOfflineRef.current && online;
      wasOfflineRef.current = !online;
      setIsOnline(online);
      setLastCheckedAt(Date.now());
      setIsCheckingConnection(false);

      if (recovered) {
        await queryClient.invalidateQueries({ queryKey: assetKeys.all });
        registrationRef.current?.update?.().catch(() => {});
      }

      return online;
    } catch {
      clearTimeout(timer);
      wasOfflineRef.current = true;
      setIsOnline(false);
      setLastCheckedAt(Date.now());
      setIsCheckingConnection(false);
      return false;
    }
  }, []);

  // Online / Offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      checkConnection();
    };

    const handleOffline = () => {
      wasOfflineRef.current = true;
      setIsOnline(false);
      setLastCheckedAt(Date.now());
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial live probe so connectivity status reflects actual reachability
    checkConnection();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [checkConnection]);

  // Install prompt & standalone detection
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setDeferredInstallPrompt(null);
      setIsInstalled(true);
    };

    const mediaQuery = window.matchMedia?.("(display-mode: standalone)");
    const handleDisplayChange = (e) => {
      if (e.matches) setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    mediaQuery?.addEventListener?.("change", handleDisplayChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      mediaQuery?.removeEventListener?.("change", handleDisplayChange);
    };
  }, []);

  // Service Worker registration & lifecycle tracking
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      setSwState("unsupported");
      return;
    }

    let unmounted = false;

    const triggerReload = () => {
      if (reloadingRef.current) return;
      reloadingRef.current = true;
      window.location.reload();
    };

    const handleControllerChange = () => {
      if (hadControllerRef.current || userRequestedUpdateRef.current) {
        triggerReload();
      } else {
        hadControllerRef.current = true;
        setSwState("active");
        refreshSwStatus();
      }
    };

    const handleSwMessage = (event) => {
      if (event.data?.type === "SW_ACTIVATED") {
        setSwState("active");
        refreshSwStatus();
      } else if (event.data?.type === "SW_STATUS") {
        setSwStatus(event.data);
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );
    navigator.serviceWorker.addEventListener("message", handleSwMessage);

    const registerSw = async () => {
      try {
        const swUrl = new URL("sw.js", document.baseURI).href;
        const registration = await navigator.serviceWorker.register(swUrl, {
          scope: "./",
        });

        if (unmounted) return;
        registrationRef.current = registration;

        if (registration.waiting) {
          setSwState("waiting");
          setUpdateAvailable(true);
          setUpdateDismissed(false);
        } else if (registration.installing) {
          setSwState("installing");
        } else if (registration.active) {
          setSwState("active");
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          setSwState("installing");
          installingWorker.addEventListener("statechange", () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                setSwState("waiting");
                setUpdateAvailable(true);
                setUpdateDismissed(false);
                setIsSimulatedUpdate(false);
              } else {
                setSwState("active");
                refreshSwStatus();
              }
            } else if (installingWorker.state === "activated") {
              setSwState("active");
              refreshSwStatus();
            }
          });
        });

        await refreshSwStatus();
      } catch (err) {
        if (!unmounted) {
          console.warn("Service Worker registration note:", err);
          setSwState("error");
        }
      }
    };

    registerSw();

    return () => {
      unmounted = true;
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
      navigator.serviceWorker.removeEventListener("message", handleSwMessage);
    };
  }, [refreshSwStatus]);

  const checkForUpdate = useCallback(async () => {
    const reg = registrationRef.current;
    if (!reg) return false;
    try {
      await reg.update();
      await refreshSwStatus();
      if (reg.waiting) {
        setUpdateAvailable(true);
        setUpdateDismissed(false);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [refreshSwStatus]);

  const applyUpdate = useCallback(async () => {
    setIsApplyingUpdate(true);
    userRequestedUpdateRef.current = true;
    const reg = registrationRef.current;

    if (reg?.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
      // Fallback reload if controllerchange doesn't fire within 1.5s
      setTimeout(() => {
        if (!reloadingRef.current) {
          reloadingRef.current = true;
          window.location.reload();
        }
      }, 1500);
      return;
    }

    if (isSimulatedUpdate) {
      setUpdateAvailable(false);
      setIsSimulatedUpdate(false);
      try {
        await reg?.update?.();
      } catch {
        // ignore
      }
      window.location.reload();
      return;
    }

    setIsApplyingUpdate(false);
  }, [isSimulatedUpdate]);

  const dismissUpdate = useCallback(() => {
    setUpdateDismissed(true);
  }, []);

  const simulateUpdateBanner = useCallback(() => {
    setIsSimulatedUpdate(true);
    setUpdateAvailable(true);
    setUpdateDismissed(false);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredInstallPrompt) return { outcome: "unavailable" };
    try {
      await deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      if (choiceResult?.outcome === "accepted") {
        setDeferredInstallPrompt(null);
      }
      return choiceResult;
    } catch {
      return { outcome: "error" };
    }
  }, [deferredInstallPrompt]);

  return (
    <PwaContext.Provider
      value={{
        isOnline,
        isCheckingConnection,
        lastCheckedAt,
        checkConnection,
        swState,
        swStatus,
        swVersion: swStatus?.version || null,
        swCaches: swStatus?.caches || [],
        updateAvailable: updateAvailable && !updateDismissed,
        hasWaitingWorker: Boolean(registrationRef.current?.waiting) || isSimulatedUpdate,
        isApplyingUpdate,
        applyUpdate,
        dismissUpdate,
        checkForUpdate,
        simulateUpdateBanner,
        refreshSwStatus,
        canInstall: Boolean(deferredInstallPrompt),
        isInstalled,
        promptInstall,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const ctx = useContext(PwaContext);
  if (!ctx) {
    throw new Error("usePwa must be used within a PwaProvider");
  }
  return ctx;
}
