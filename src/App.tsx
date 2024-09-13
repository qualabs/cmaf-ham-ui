import { useState } from "react";
import "./App.css";
import HamDisplay from "./components/HamDisplay/HamDisplay";

import { SelectedTrackProvider } from "./context/TrackSelectedContext";
import { PresentationProvider } from "./context/PresentationContext";
import Header from "./components/Header/Header";
import { AnimatePresence } from "framer-motion";
import Modal from "./components/Modal/Modal";
import Info from "./components/Info/Info";
import HLSPlayer from "./components/HlsPlayer/HLSPlayer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

export default function App() {
  const [manifest, setManifest] = useState<string | null>(null);

  const [fileName, setFileName] = useState<string>();
  const [protocol, setProtocol] = useState<string | null>("dash");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                manifest={manifest}
                isFullScreen={!!manifest}
                setManifest={setManifest}
                setProtocol={setProtocol}
                setFileName={setFileName}
              />
              {manifest !== null && protocol !== null && (
                <PresentationProvider>
                  <SelectedTrackProvider>
                    <HamDisplay
                      manifest={manifest}
                      protocol={protocol}
                      fileName={
                        fileName ??
                        `ham-converter-${protocol}-${Date.now()}.zip`
                      }
                    ></HamDisplay>
                  </SelectedTrackProvider>
                </PresentationProvider>
              )}
              <AnimatePresence>
                <Outlet />
              </AnimatePresence>
            </>
          }
        >
          <Route
            path="/info"
            element={
              <Modal>
                <Info />
              </Modal>
            }
          />
          <Route
            path="/player"
            element={
              <Modal>
                <HLSPlayer></HLSPlayer>
              </Modal>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
