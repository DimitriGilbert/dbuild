import { getAgentCorpusIndex } from "@/lib/agent-corpus"

export const dynamic = "force-static"

export function GET(): Response {
  return Response.json(getAgentCorpusIndex())
}
