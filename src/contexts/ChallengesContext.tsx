import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';


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
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
export function ChallengesProvider({children,...rest}: ChallengesProviderProps){
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge,setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);
    const [isLelvelUpModalOpen,setIsLelvelUpModalOpen] = useState(false);

    useEffect(() =>{
        Notification.requestPermission();
    }, [])

    useEffect(() =>{    
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level,currentExperience, challengesCompleted])

    function levelUp(){
      setLevel(level+1);
      setIsLelvelUpModalOpen(true);
    }
    function closeLevelUpModal(){
        setIsLelvelUpModalOpen(false)
    }

function startNewChallenges(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted' && screen.width > 1024) {
        new Notification('Novo desafio 🎉', {
          body: `Valendo ${challenge.amount}xp!`
        });
      }  
    setActiveChallenge(challenge);
}

function resetChallenge(){
    setActiveChallenge(null);
}

function completedChallenge(){
    if(!activeChallenge){
        return;
    }
    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel){
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted+1);
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
            resetChallenge,
            completedChallenge,
            closeLevelUpModal
            }}>
                {children}
                
                { isLelvelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}