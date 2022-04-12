import React from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const Home = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="...next udemy" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
};

// 넥스트가 이 함수의 이름을 발견하면 프리렌더링 과정 동안 이 함수를 실행 함
// 직접 부르진 않음
// return 된 jsx 스냅샷을 html 컨텐츠로 사용

// 넥스트가 비동기로 프로미스가 반환 될 때 기다렸다가 component 를 통해서 사전렌더링 함

export async function getStaticProps() {
  // 보통은 서버에서만 작동 함 ex) date fetch , db connect
  // 클라이언트에서 실행 되지 않음
  // 클라이언트에서 노출 되지 않음
  // 코드 빌드 과정에서만 동작하기 때문
  // CDN 에 저장
  // 빠르다 캐시하고 다시 사용하기 때문

  const client = await MongoClient.connect(
    "mongodb+srv://udemy_next:pUhiQFZerC4MYSxQ@cluster0.brk19.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // 페이지를 서버에서 다시 만듬
    // 이전에 만든 페에지를 대체함
    // 시간 초
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   // getStaticProps 와 차이
//   // ServerSideProps 는 빌드 과정에서는 실행되지 않는다.
//   // 어떤 코드라도 서버에서 실행

//   // 서버에 요청이 들어 올 때마다 실행 됨
//   // fetch, api

//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: Dummy,
//     },
//   };
// }

export default Home;
