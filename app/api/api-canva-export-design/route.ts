// app/api/api-canva/route.ts
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const { export_id } = await req.json();
  const token = 'eyJraWQiOiIyMzY4ZjRhYi00N2ZiLTQwN2MtYjM5Ni00NzgxODcwMjZkN2UiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJYVTJTSHNLcWxGMHA3cllKVnlnTlJnIiwiY2xpZW50X2lkIjoiT0MtQVpBVXhJWUlJTmtCIiwiYXVkIjoiaHR0cHM6Ly93d3cuY2FudmEuY29tIiwiaWF0IjoxNzQ5Mjk1MDM4LCJuYmYiOjE3NDkyOTUwMzgsImV4cCI6MTc0OTMwOTQzOCwicm9sZXMiOiJaSVVhQ1Bja1JpcWxMeGVJX3JNMDlfWW5WczRac082d1hRTXFLbTZIdEZWTWpzeFlYNjNqQjVKR3V6RjJmT1lJQnMteThRIiwic3ViIjoib1VXMUZnMmhacTdnYW42SUU4ZkxONCIsImJyYW5kIjoib0JXMUZiVjE0aU9NU3NoVGxyWkQ0dyIsInNjb3BlcyI6WyJhc3NldDpyZWFkIiwiYXNzZXQ6d3JpdGUiLCJicmFuZHRlbXBsYXRlOmNvbnRlbnQ6cmVhZCIsImJyYW5kdGVtcGxhdGU6bWV0YTpyZWFkIiwiY29tbWVudDpyZWFkIiwiY29tbWVudDp3cml0ZSIsImRlc2lnbjpjb250ZW50OnJlYWQiLCJkZXNpZ246Y29udGVudDp3cml0ZSIsImRlc2lnbjptZXRhOnJlYWQiLCJkZXNpZ246cGVybWlzc2lvbjpyZWFkIiwiZGVzaWduOnBlcm1pc3Npb246d3JpdGUiLCJmb2xkZXI6cGVybWlzc2lvbjpyZWFkIiwiZm9sZGVyOnBlcm1pc3Npb246d3JpdGUiLCJmb2xkZXI6cmVhZCIsImZvbGRlcjp3cml0ZSIsInByb2ZpbGU6cmVhZCJdLCJsb2NhbGUiOiJMMzZZOWNvTkxTVEV5QmxMLUNRUjFPYmhhQXNlYmtfMWV6VW0yX3FYXzJrblNpX0dTSERxZHlEU25GUm1uNi1sbENfbE1nIiwiYnVuZGxlcyI6WyJBRkZJIiwiQ0VEVSJdLCJhY3RfYXMiOiJ1IiwiY29kZV9pZCI6Ikh4eEFYNkJoQVpucWpTc0hjTnlpcWcifQ.RvugtXXemTYnl2PFKTgxktYFMdyB4SNWdqciBEUJn5tvRLAwYPATNT6LgkKFBYjo3sFey_F1MxJZLcAuOPjBMwPN5cXbd1NUTDmmBO4UQ_S7lqQmZLO6oauUbA77xuZa31E9JdfunIVOgnaoyYAILA4XPgPhZmcnSJJIS_sUV2AKEeEIsb-_VIwUEsVuAGq6qwssIzIAg4U4iPaRHuLTcO33rC8PSyM_lYBB1jPf5XK8wtoVHNN8Bg1Oz_LX3pJtCd6xXLoN8-5pLfg833orHQAmtBleJ4u9PmV6aIzKr0MOzLwzHGGEpGd6o4pFgx5N77xoc2Q6Zt5QjMVp7yrumw'
  if (!export_id || !token) {
    return NextResponse.json({ error: "Missing export_id or token" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.canva.com/rest/v1/exports/${export_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
