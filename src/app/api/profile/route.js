import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const email = session.user.email;


  console.log({data})
  if ("name" in data) {
    //uptade user name

    await User.updateOne({email}, {name:data.name})
    console.log({data})

}

  return Response.json(true);
}
