import { MongoClient } from "mongodb";

// only Post req

export default async function addMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://udemy_next:pUhiQFZerC4MYSxQ@cluster0.brk19.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    // db 연결 // 없다면 생성 할 것
    const db = client.db();

    // 몽고db 컬렉션을 작동시키는 NoSQL
    // 컬렉션은 SQL 데이터베이스에 있는 table

    // 컬렉션을 보관, 이름은 아무거나 지정 가능
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "MeetUp inserted!" });
  }
}
