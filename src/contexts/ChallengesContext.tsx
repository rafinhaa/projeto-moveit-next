import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenges: () => void;
    resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps{
    children: ReactNode;
}
export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level,setLevel] = useState(1);
    const [currentExperience,setCurrentExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState(0);
    const [activeChallenge,setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    function levelUp(){
      setLevel(level+1);
    }

function startNewChallenges(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenge(challenge);
}

function resetChallenge(){
    setActiveChallenge(null);
}

    return(
        <ChallengesContext.Provider value={{
            level, 
            currentExperience, 
            challengesCompleted,
            experienceToNextLevel,
            levelUp,
            startNewChallenges,
            activeChallenge,
            resetChallenge
            }}>
                {children}
        </ChallengesContext.Provider>
    );
}