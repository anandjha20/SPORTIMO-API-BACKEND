import { Routes, Route } from "react-router-dom"
import Home from './Home';
import Login from './Login';
import UserManagement from "./UserManagement/UserManagement";
import UserDetail from "./UserManagement/UserDetail";
import CreatePoll from "./PollManagement/CreatePoll";
import PollList from "./PollManagement/PollList";
import PollDetailComponent from "./PollManagement/PollDetailComponent";
import GameEngagementQuestions from "./GameEngagementQuestions/GameEngagementQuestions";
import GameEngagementList from "./GameEngagementQuestions/GameEngagementList"; 
import ViewDetailGameEnagenent from "./GameEngagementQuestions/ViewDetailGameEnagenent";
import ChangePassword from "./ProfileManagement/ChangePassword";
import AddSponsorship from "./SponsorshipManagement/AddSponsorship";
import SponsorshipList from "./SponsorshipManagement/SponsorshipList";
import SponsorshipDetails from "./SponsorshipManagement/SponsorshipDetails";
import AddFaqCategory from "./FaqCategoryManagement/AddFaqCategory";
import Faqlist from "./FaqManagement/Faqlist";
import CreateFaq from "./FaqManagement/CreateFaq";
import UpdateFq from "./FaqManagement/UpdateFq";
import Complaintlist from "./ComplaintManagement/Complaintlist";
import CreateTipsTricks from "./TipsTricksManagement/CreateTipsTricks";
import AddComplaintCategory from "./ComplaintManagement/AddCategory/AddComplaintCategory";
import ReplyComplaintChat from "./ComplaintManagement/ChatManagement/ReplyComplaintChat";
import ContentList from "./ContentManagement/ContentList";
// import AddContent from "./ContentManagement/AddContent";
import UpdateContent from "./ContentManagement/UpdateContent";
import CreateDefaultMessage from "./DefaultMessageManagement/CreateDefaultMessage";
import UpdatePoll from "./PollManagement/UpdatePoll";
import SportsPreference from "./PreferenceMaster/SportsPreference";
import LeaguesPreference from "./PreferenceMaster/LeaguesPreference";
import TeamsPreference from "./PreferenceMaster/TeamsPreference";
import PlayersPreference from "./PreferenceMaster/PlayersPreference";
import IntroSliderImg from "./SponsorshipManagement/IntroSliderImg";
import IntroSliderDetails from "./SponsorshipManagement/IntroSliderDetails";
import AllListNotification from "./NotificationManagement/AllListNotification";

function App() {
  return (
    <> 
     <Routes>

      {/* Dashboard/Login */}
        <Route path="/" element={ <Login/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/home" element={ <Home/> } />


      {/* Profile Management */}
      <Route path="/changepassword" element={ <ChangePassword/> } />     


      {/* UserManagement */}
        <Route path="/user" element={ <UserManagement/> } />
        <Route path="/user/detail/:_id" element={ <UserDetail/> } />

      {/* PollManagement */}
        <Route path="poll/create" element={ <CreatePoll/> } />
        <Route path="/poll" element={ <PollList/> } />
        <Route path="/poll/detail/:id" element={ <PollDetailComponent/> } />
        <Route path="/poll/update/:id" element={ <UpdatePoll/> } />

        {/* GameEngagementQuestions */}
        <Route path="/geq/create" element={ <GameEngagementQuestions/> } />
        <Route path="/geq" element={ <GameEngagementList/> } />
        <Route path="/geq/detail" element={ <ViewDetailGameEnagenent/> } />

        {/* sponsorship */}
        <Route path="/sponsorship/add" element={ <AddSponsorship /> } />
        <Route path="/sponsorship" element={ <SponsorshipList /> } />
        <Route path="/intro-slider" element={ <IntroSliderImg /> } />
        <Route path="/intro-slider/detail/:_id" element={ <IntroSliderDetails /> } />
        <Route path="/sponsorship/detail/:id" element={ <SponsorshipDetails /> } />

        {/* Faq */}
        <Route path="/add-category" element={ <AddFaqCategory /> } />
    
        <Route path="/faq" element={ <Faqlist /> } />
        <Route path="/faq/add" element={ <CreateFaq /> } />
        <Route path="/faq/update/:_id" element={ <UpdateFq /> } />
       
        {/* Complaint Management */}
        <Route path="/complaint" element={ <Complaintlist /> } />
        <Route path="/complaint-category" element={ <AddComplaintCategory /> } />
        <Route path="/complaint-reply/:_id" component element={ <ReplyComplaintChat setDataDet /> } />

        {/*CreateTipsTricks */} 
        <Route path="/tips" element={ <CreateTipsTricks /> } />

        {/*Notification Management*/} 
        <Route path="/notificaiton" element={ <AllListNotification /> } />

        {/*ContentManagement */} 
        <Route path="/content" element={ <ContentList /> } />
        {/* <Route path="/content/add" element={ <AddContent /> } /> */}
        <Route path="/content/view/:type" element={ <UpdateContent /> } />

        {/*CreateDefaultMessage */} 
        <Route path="/default-message" element={ <CreateDefaultMessage /> } />


        {/*PreferenceMaster */} 
        <Route path="/preference/sports" element={ <SportsPreference /> } />
        <Route path="/preference/teams" element={ <TeamsPreference /> } />
        <Route path="/preference/leagues" element={ <LeaguesPreference /> } />
        <Route path="/preference/players" element={ <PlayersPreference /> } />
       
      </Routes>
    </>
  );
}

export default App
