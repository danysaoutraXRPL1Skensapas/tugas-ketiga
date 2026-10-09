import { NextResponse } from 'next/server';
import ProjectObj from "@/data/project.json"

export async function GET() {
  return NextResponse.json(ProjectObj);
}