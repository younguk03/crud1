import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
   try {
      const { id } = await params
      const { newTitle: title, newDescription: description } = await request.json();
      if (!title || !description) {
         return NextResponse.json({
            message: 'Title and description are required'
         }, { status: 400 })
      }
      await connectMongoDB()
      const updateTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true })
      if (!updateTopic) {
         return NextResponse.json({ messaage: 'Topic not fond' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Topic updated!', Topic: updateTopic }, { status: 200 });
   } catch (error) {
      console.error('Error in PUT /api/topics/[id]', error);
      return NextResponse.json(
         { message: 'Interal Server error' },
         { status: 500 }
      )
   }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
   try {
      const { id } = await params
      await connectMongoDB()
      const topic = await Topic.findOne({ _id: id })
      if (!topic) {
         return NextResponse.json({ message: 'Topic is not found!' }, { status: 404 })
      }
      return NextResponse.json({ topic }, { status: 200 })
   } catch (error) {
      console.error('Error in GET /api/topics/[id]', error)
      return NextResponse.json({
         message: 'Internal Server error'
      }, { status: 500 });
   }
}