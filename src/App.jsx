import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

function App() {
  const Login = lazy(() => import("./pages/Login"));
  const Kanban = lazy(() => import("./pages/Kanban"));
  const About = lazy(() => import("./pages/About"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route path="/kanban" element={<Kanban />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
