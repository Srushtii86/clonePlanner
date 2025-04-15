import Home from "./Home";
import InitialSurvey from "./InitialSurvey";

const HomeWrapper = ({ user, setUser, isSurveyCompleted, setIsSurveyCompleted }) => {
  return isSurveyCompleted ? (
    <Home />
  ) : (
    <InitialSurvey
      user={user}
      setUser={setUser}
      setIsSurveyCompleted={setIsSurveyCompleted}
      onComplete={() => setIsSurveyCompleted(true)}
    />
  );
};

export default HomeWrapper;
