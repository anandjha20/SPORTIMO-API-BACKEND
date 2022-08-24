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

        {/* GameEngagementQuestions */}
        <Route path="/geq/create" element={ <GameEngagementQuestions/> } />
        <Route path="/geq" element={ <GameEngagementList/> } />
        <Route path="/geq/detail" element={ <ViewDetailGameEnagenent/> } />

        {/* sponsorship */}
        <Route path="/sponsorship/add" element={ <AddSponsorship /> } />
        <Route path="/sponsorship" element={ <SponsorshipList /> } />
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
        <Route path="tips" element={ <CreateTipsTricks /> } />



       
      </Routes>
    </>
  );
}

export default App
