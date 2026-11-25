import { MotionConfig } from 'framer-motion';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <HashRouter>
          <LoadingScreen />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
