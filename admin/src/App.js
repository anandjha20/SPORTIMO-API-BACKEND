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
import UpdateSponsorship from "./SponsorshipManagement/UpdateSponsorship";
import AddFaqCategory from "./FaqCategoryManagement/AddFaqCategory";
import Faqlist from "./FaqManagement/Faqlist";
import CreateFaq from "./FaqManagement/CreateFaq";
import UpdateFq from "./FaqManagement/UpdateFq";
import Complaintlist from "./ComplaintManagement/Complaintlist";
import CreateTipsTricks from "./TipsTricksManagement/CreateTipsTricks";
import AddComplaintCategory from "./ComplaintManagement/AddCategory/AddComplaintCategory";
import ReplyComplaintChat from "./ComplaintManagement/ChatManagement/ReplyComplaintChat";
import ContentList from "./ContentManagement/ContentList";
import AddContent from "./ContentManagement/AddContent";
import UpdateContent from "./ContentManagement/UpdateContent";
import CreateDefaultMessage from "./DefaultMessageManagement/CreateDefaultMessage";
import UpdatePoll from "./PollManagement/UpdatePoll";
import SportsPreference from "./PreferenceMaster/SportsPreference";
import LeaguesPreference from "./PreferenceMaster/LeaguesPreference";
import TeamsPreference from "./PreferenceMaster/TeamsPreference";
import PlayersPreference from "./PreferenceMaster/PlayersPreference";
import IntroSliderImg from "./SponsorshipManagement/IntroSliderImg";
import IntroSliderTable from "./SponsorshipManagement/IntroSliderTable";
import IntroSliderDetails from "./SponsorshipManagement/IntroSliderDetails";
import AllListNotification from "./NotificationManagement/AllListNotification";
import AddNotification from "./NotificationManagement/AddNotification";
import ReportReason from "./ReportReasonMangement/ReportReason";
import GroupList from "./GroupChatManagement/GroupList";
import GroupChatManagement from "./GroupChatManagement/GroupChatManagement";
import UserReportList from "./ReportReasonMangement/UserReportList";
import UserChatBlockedList from "./ChatManagement/UserChatBlockedList";
import ViewCartCategory from "./PredictionManagement/ViewCartCategory";
import CreatePredictionCard from "./PredictionManagement/CreatePredictionCard";
import TablePredictionCardList from "./PredictionManagement/TablePredictionCardList";
import UpdatePredictionCard from "./PredictionManagement/UpdatePredictionCard";
import TableMatchCard from "./MatchCardManagement/TableMatchCard";
import AddMatchCard from "./MatchCardManagement/AddMatchCard";
import AddminSetting from "./AdminSetting/AddminSetting";
import UpdateMatch from "./MatchCardManagement/UpdateMatch";
import Leaderboard from "./LeaderBoard/Leaderboard";
import UpdateGameEnagenent from "./GameEngagementQuestions/UpdateGameEnagenent";
import ViewUserPointsTransaction from "./LeaderBoard/ViewUserPointsTransaction";
import CreateAvatar from "./AvatarManagement/CreateAvatar";
import UserPredistions from "./PredictionManagement/userPredictionList";
import UserPredictionListDetail from "./PredictionManagement/UserPredictionListDetail";
import GEQAnalyticsMangement from "./AnalyticsMangement/GEQAnalyticsMangement";
import SupportAnalyticsMangement from "./AnalyticsMangement/SupportAnalyticsMangement";
import ProfileAnalyticsMangement from "./AnalyticsMangement/ProfileAnalyticsMangement";
import UserAnalyticsMangement from "./AnalyticsMangement/UserAnalyticsMangement";

function App() {

  return (
    <> 

     <Routes>

      {/* Dashboard/Login */}
        <Route path="/" element={ <Login/> } />
        <Route path="/home" element={ <Home/>}/>
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
        <Route path="/geq/update/:_id" element={ <UpdateGameEnagenent/> } />
        <Route path="/geq/detail" element={ <ViewDetailGameEnagenent/> } />

        {/* sponsorship */}
        <Route path="/sponsorship/add" element={ <AddSponsorship /> } />
        <Route path="/sponsorship" element={ <SponsorshipList /> } />
        <Route path="/intro-slider/add" element={ <IntroSliderImg /> } />
        <Route path="/intro-slider" element={ <IntroSliderTable /> } />
        <Route path="/intro-slider/detail/:_id" element={ <IntroSliderDetails /> } />
        <Route path="/sponsorship/detail/:id" element={ <SponsorshipDetails /> } />
        <Route path="/sponsorship/update/:id" element={ <UpdateSponsorship /> } />

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

        {/*Group Chat Management */} 
        <Route path="/groups" element={ <GroupList /> } />
        <Route path="/groups/chat" element={ <GroupChatManagement /> } />

        {/*ReportReasonManagement */} 
        <Route path="/report" element={ <ReportReason /> } />
        <Route path="/user-report" element={ <UserReportList /> } />

        {/*Notification Management*/} 
        <Route path="/notification" element={ <AllListNotification /> } />
        <Route path="/notification/add" element={ <AddNotification /> } />

        {/*ContentManagement */} 
        <Route path="/content" element={ <ContentList /> } />
        <Route path="/content/add" element={ <AddContent /> } />
        <Route path="/content/view/:type" element={ <UpdateContent /> } />

        {/*CreateDefaultMessage */} 
        <Route path="/default-message" element={ <CreateDefaultMessage /> } />


        {/*PreferenceMaster */} 
        <Route path="/chat-blocked-user" element={ <UserChatBlockedList /> } />
        {/*PreferenceMaster */} 

        {/*Prediction Card */} 
        <Route path="/cart-category" element={ <ViewCartCategory /> } />
        <Route path="/cards" element={ <TablePredictionCardList /> } />
        <Route path="/cards/create" element={ <CreatePredictionCard /> } />
        <Route path="/cards/update/:_id" element={ <UpdatePredictionCard /> } />

        {/*Match Card Management*/} 
        <Route path="/matchcard" element={ <TableMatchCard /> } />
        <Route path="/matchcard/add" element={ <AddMatchCard /> } />
        <Route path="/matchcard/update/:_id" element={ <UpdateMatch /> } />

        {/*Admin Setting*/} 
        <Route path="/admin-setting" element={ <AddminSetting /> } />

        {/*Create Avatar*/} 
        <Route path="/avatar" element={ <CreateAvatar /> } />
       

        {/*user predicton*/} 
        <Route path="/user_predistions" element={ <UserPredistions /> } />
        <Route path="/user_predistions/details/:id" element={ <UserPredictionListDetail /> } />
        

        {/*Leader Board*/} 
        <Route path="/leaderboard" element={ <Leaderboard /> } />
        <Route path="/leaderboard/user-points/:_id" element={ <ViewUserPointsTransaction /> } />
        
        {/*PreferenceMaster */} 
        <Route path="/preference/sports" element={ <SportsPreference /> } />
        <Route path="/preference/teams" element={ <TeamsPreference /> } />
        <Route path="/preference/leagues" element={ <LeaguesPreference /> } />
        <Route path="/preference/players" element={ <PlayersPreference /> } />

        {/*AnalyticsMangement */} 
        <Route path="/analytics/user" element={ <UserAnalyticsMangement /> } />
        <Route path="/analytics/geq" element={ <GEQAnalyticsMangement /> } />
        <Route path="/analytics/support" element={ <SupportAnalyticsMangement /> } />
        <Route path="/analytics/user-profile" element={ <ProfileAnalyticsMangement /> } />
        {/* <Route path="/preference/teams" element={ <TeamsPreference /> } />
        <Route path="/preference/leagues" element={ <LeaguesPreference /> } />
        <Route path="/preference/players" element={ <PlayersPreference /> } /> */}
       
      </Routes>
    </>
  );
}

export default App
