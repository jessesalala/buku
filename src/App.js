import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workbook from "./pages/Workbook";
import Todo from "./features/dashboard/TodoList";
import Calculator from "./pages/Calculator";
import Settings from "./pages/Settings";
import Books from "./features/books/Books";
import Investment from "./features/investments/Investment";
import Family from "./features/family/Family";
import Learning from "./features/learning/Learning";
import BooksChildren from "./features/books/BooksChildren";
import BooksAdults from "./features/books/BooksAdults";
import InvestmentStrategies from "./features/investments/InvestmentStrategies";
import FamilyMembers from "./features/family/FamilyMembers";
import FamilyExpenses from "./features/family/FamilyExpenses";
import BusinessCourses from "./features/learning/BusinessCourses";
import TechCourses from "./features/learning/TechCourses";
import LanguageCourses from "./features/learning/LanguageCourses";
import UserProfile from "./features/user/UserProfile";
import UserRegistration from "./features/user/UserRegistration";
import YouthLearning from "./features/learning/YouthLearning";
import RetireesFamily from "./features/family/RetireesFamily";
import ContentDelivery from "./content/ContentDelivery";
import TopNavigation from './components/TopNavigation';
import DaysAlive from './features/user/DaysAlive';
import TimeReport from './features/reports/TimeReport';
import DailyInvestment from './features/investments/DailyInvestment';
import Registration from './components/Registration';
import AdultDashboard from './pages/dashboard/AdultDashboard';
import YouthDashboard from './pages/dashboard/YouthDashboard';
import ChildDashboard from './pages/dashboard/ChildDashboard';
import RetireeDashboard from './pages/dashboard/RetireeDashboard';
import DiscussionForum from './pages/DiscussionForum';
import CoachDashboard from './pages/dashboard/CoachDashboard';
import { TranslationProvider } from './context/LanguageContext.js';
import PdfViewer from './PdfViewer';
// Book Components (imported only once)
import ChapterList from "./features/books/BooksAdults/ChapterList";
import BookReader from "./features/books/BookReader";
import BookmarkManager from "./features/books/BooksAdults/BookmarkManager";
import IllustratedChapters from "./features/books/ChildrenBooks/IllustratedChapters";
import InteractiveReader from "./features/books/ChildrenBooks/InteractiveReader";
import ParentDashboard from "./features/books/ChildrenBooks/ParentDashboard";
import TimeAssessment from './features/user/TimeAssessment';

import "./index.css";
import './components/TopNavigation.css';

function App() {
  const [auth, setAuth] = useState(() => {
    // Check localStorage for existing user data
    const savedUser = localStorage.getItem('userData');
    return {
      isLoggedIn: !!savedUser,
      userData: savedUser ? JSON.parse(savedUser) : null
    };
  });

  const handleLogin = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setAuth({
      isLoggedIn: true,
      userData: userData
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setAuth({
      isLoggedIn: false,
      userData: null
    });
  };

  // Function to get dashboard path based on user group
  const getDashboardPath = (group) => {
    const paths = {
      'TOTO': '/dashboard/watoto',
      'YOUTH': '/dashboard/vijana',
      'ADULT': '/dashboard/wazima',
      'RETIREE': '/dashboard/wazee'
    };
    return paths[group] || '/';
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {auth.isLoggedIn ? (
          <>
            <TopNavigation onLogout={handleLogout} />
            <div style={{ display: "flex" }}>
              <Navbar userGroup={auth.userData?.group} />
              <main className="main-content">
                <Routes>
                  {/* Dashboard Routes */}
                  <Route path="/books/children" element={<BooksChildren />} />
        <Route path="/books/children/view/:pdfName" element={<PdfViewer />} />
                                    <Route path="/" element={<Home />} />
                                    <Route path="/books" element={<Books />} />
                                    <Route path="/investment" element={<Investment />} />
                                    <Route path="/family" element={<Family />} />
                                    <Route path="/learning" element={<Learning />} />
                                    <Route path="/workbook" element={<Workbook />} />
                                    <Route path="/todo" element={<Todo />} />
                                    <Route path="/calculator" element={<Calculator />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/investment/strategies" element={<InvestmentStrategies />} />
                                    <Route path="/family/members" element={<FamilyMembers />} />
                                    <Route path="/family/expenses" element={<FamilyExpenses />} />
                                    <Route path="/family/retirees" element={<RetireesFamily />} />
                                    <Route path="/learning/business" element={<BusinessCourses />} />
                                    <Route path="/learning/technology" element={<TechCourses />} />
                                    <Route path="/learning/language" element={<LanguageCourses />} />
                                    <Route path="/learning/youth" element={<YouthLearning />} />
                                    <Route path="/profile" element={<UserProfile />} />
                                    <Route path="/register" element={<UserRegistration />} />
                                    <Route path="/content" element={<ContentDelivery />} />
                                    <Route path="/days-alive" element={<DaysAlive />} />
                                    <Route path="/time-assessment" element={<TimeAssessment />} />
                                    <Route path="/ripoti-ya-muda" element={<TimeReport />} />
                                    <Route path="/uwekezaji-wa-siku" element={<DailyInvestment />} />
                                    <Route path="/sajili" element={<Registration />} />
                                    <Route path="/dashboard/wazima" element={<AdultDashboard />} />
                                    <Route path="/dashboard/vijana" element={<YouthDashboard />} />
                                    <Route path="/dashboard/watoto" element={<ChildDashboard />} />
                                    <Route path="/dashboard/wazee" element={<RetireeDashboard />} />
                                    <Route path="/discussion-forum" element={<DiscussionForum />} />                                     {/* Nested Adult Books Routes */}
                                    <Route path="/books/adults" element={<BooksAdults />}>
                                        <Route index element={<ChapterList />} />
                                        <Route path="read/:chapterId" element={<BookReader />} />
                                        <Route path="bookmarks" element={<BookmarkManager />} />
                                    </Route>
                                    
                                   <Route path="/coach-dashboard" element={<CoachDashboard />} />

                                    {/* Nested Children Books Routes */}
                                    <Route path="/books/children" element={<BooksChildren />}>
                                        <Route index element={<IllustratedChapters />} />
                                        <Route path="nguvu-ya-buku" element={<PdfViewer />} />
                                        <Route path="parent-dashboard" element={<ParentDashboard />} />
                              
                                    </Route>
                                  {/* Redirect to appropriate dashboard if no match */}
                  <Route path="*" element={
                    <Navigate to={getDashboardPath(auth.userData?.group)} replace />
                  } />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
  <Route path="/sajili" element={
    <Registration 
      onSuccess={(userData) => {
        handleLogin(userData);
      }} 
    />
  } />
  <Route path="*" element={<Registration onLogin={handleLogin} />} />
</Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;