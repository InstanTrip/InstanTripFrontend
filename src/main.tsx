import { StrictMode } from 'react'
import { Provider } from "@/components/ui/provider"
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

import './index.css'

import Main from './pages/Main';
import CreateTrip from './pages/CreateTrip';
import Mypage from './pages/Mypage';
import AboutTrip from './pages/AboutTrip';
import NotFoundPage from './pages/NotFoundPage';
import Invite from './pages/Invite';


// React Query 클라이언트 생성
const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <CookiesProvider>
          <Router>
            <Routes>
              {/* 메인 페이지 */}
              <Route path="/" element={<Main />} />
  
              {/* 여행 생성 */}
              <Route path="/create" element={<CreateTrip />} />
  
              {/* 마이페이지 */}
              <Route path="/mypage" element={<Mypage />} />
              
              {/* 여행 출력 */}
              <Route path="/aboutrip" element={<AboutTrip />} />

              {/* 초대 */}
              <Route path="/invite" element={<Invite />} />
  
              {/* 404 NotFoundPage */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </CookiesProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
