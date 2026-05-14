import { auth } from "@/lib/auth"
import NetworkingBoard from "./networking-board"

export default async function NetworkingPage() {
  const session = await auth()
  const userName = session?.user?.name || "Usuario Anónimo"
  const isTeacher = session?.user?.role === "TEACHER" || session?.user?.role === "ADMIN"

  return <NetworkingBoard initialUserName={userName} isTeacher={isTeacher} />
}
