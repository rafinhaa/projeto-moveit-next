import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Coundown.module.css';

let countDownTimerout: NodeJS.Timeout;

export function Countdown(){
    const {startNewChallenges} = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2,'0').split('');
    const [hasFinished, setHasFinished] = useState(false);

    function startCountDown(){
        setIsActive(true);
    }
    function resetCountDown(){
        setIsActive(false);
        clearTimeout(countDownTimerout);
        setTime(0.1*60);
    }
    useEffect(() =>{
       if (isActive && time > 0){
           countDownTimerout = setTimeout(() =>{
               setTime(time - 1);
           },1000);
        }else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenges();
        }
    }, [isActive,time])
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button disabled className={`${styles.countdownButton}`}>
                    Ciclo encerrado
                </button>    
            ) : (
                <>
                    {isActive ? (
                        <button type="button" onClick={resetCountDown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                            Abandonar ciclo
                        </button>   
                    ) : (
                        <button type="button" onClick={startCountDown} className={styles.countdownButton}>
                            Iniciar um ciclo
                        </button> 
                    )}
                </>
                )}
        </div>
    );
}