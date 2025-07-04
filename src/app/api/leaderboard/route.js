import { NextResponse } from 'next/server';


const leaderboardData = [
  { rank: 1, name: 'Alia Varma', avatar: 'https://avatar.vercel.sh/alia.png', project: 'QuantumLeap AI', score: 9850, github: '#' },
  { rank: 2, name: 'Ben Carter', avatar: 'https://avatar.vercel.sh/ben.png', project: 'Project Nebula', score: 9720, github: '#' },
  { rank: 3, name: 'Sophia Chen', avatar: 'https://avatar.vercel.sh/sophia.png', project: 'EchoStream', score: 9680, github: '#' },
  { rank: 4, name: 'Leo Rodriguez', avatar: 'https://avatar.vercel.sh/leo.png', project: 'DataWeave Analytics', score: 9540, github: '#' },
  { rank: 5, name: 'Mia Kim', avatar: 'https://avatar.vercel.sh/mia.png', project: 'Aether Platform', score: 9490, github: '#' },
  { rank: 6, name: 'David Singh', avatar: 'https://avatar.vercel.sh/david.png', project: 'BioSynth Modeler', score: 9310, github: '#' },
  { rank: 7, name: 'Chloe Nguyen', avatar: 'https://avatar.vercel.sh/chloe.png', project: 'SecurePass Protocol', score: 9250, github: '#' },
  { rank: 8, name: 'Ethan Wright', avatar: 'https://avatar.vercel.sh/ethan.png', project: 'Momentum OS', score: 9180, github: '#' },
];

export async function GET(request) {
  await new Promise(resolve => setTimeout(resolve, 400));

  return NextResponse.json(leaderboardData);
}