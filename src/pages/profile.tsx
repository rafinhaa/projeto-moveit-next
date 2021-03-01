import { ExperienceBar } from "../components/ExperienceBar";
import { GetServerSideProps} from 'next';
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { useRouter } from 'next/router'

import Head from 'next/head';

import styles from "../styles/pages/Home.module.css";
import React from "react";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface userGithub {
  name: string;
  avatar_url: string;
}

interface HomeProps{
  user: userGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const {user} = props;
  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Moveit</title>
        </Head>
        <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile {...user} />
                <CompletedChallenges/>
                <Countdown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {  
  const {username}  = context.query;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();

  const {level, currentExperience, challengesCompleted} = context.req.cookies;

  
  return {
    props: {
      user,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
