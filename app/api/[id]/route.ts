import { NextResponse, NextRequest } from 'next/server';
import ProjectObj from "@/data/project.json";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = Number(id);

  // Validate array bounds and NaN
  if (isNaN(index) || !ProjectObj[index]) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(ProjectObj[index]);
}