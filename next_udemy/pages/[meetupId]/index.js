import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetDetail = ({ meetupData }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="등록" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </React.Fragment>
  );
};

// getStaticPaths

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://udemy_next:pUhiQFZerC4MYSxQ@cluster0.brk19.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // fallback
    // false,  모든 지원되는 미트 업 id 밸류를 포함하려고 하는 것  -> 해당 params에 없는 라우터는 404를 띄움
    // true : 동적으로 넥스트가 페이지를 만듬
    // 라우터의 switch 와 비슷한 기능
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://udemy_next:pUhiQFZerC4MYSxQ@cluster0.brk19.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(meetupId, "meetupId");
  console.log(selectedMeetup, "select");

  client.close();

  // 터미널에서만 확인가능,
  // 빌드 타임에서 동작하기 때문에 개발자 도구에서는 못봄

  // fetch

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        _id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetDetail;
